import React, {useState} from 'react'
import LoginContainer from '../components/LoginContainer'
import InputField from '../components/InputField'
import Button from '../components/Button'
import useNotAuthenticated from '../custom_hooks/useNotAuthenticated'
import '../styles/Register.scss'
import fieldsAreValid from '../helpers/fieldsAreValid';
import { Link } from 'react-router-dom';

const statusCodes = require('../static_files/statusCodes')

function Register() {
  useNotAuthenticated()

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")
  const [statusMessage, setStatusMessage] = useState({message: "", className: ""})

  const registerUser = () => {
    if(fieldsAreValid(name, password, retypePassword)) {
      if(password === retypePassword) {
        fetch('/api/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            password: password
          })
        })
        .then(async (res) => {
          if(!res.ok) {
            const error = await res.json()

            throw error.message
          } else {
            return res.json()
          }
        })
        .then(data => {
          setStatusMessage({message: data.message, className: "positiveMessage"})
          setName("")
          setPassword("")
          setRetypePassword("")
        })
        .catch(error => setStatusMessage({message: error, className: "negativeMessage"}))
      } else {
        setStatusMessage({message: statusCodes.passwordMismatch, className: "negativeMessage"})
      }
    } else {
      setStatusMessage({message: statusCodes.emptyFields, className: "negativeMessage"})
    }

    setTimeout(() => setStatusMessage({message: "", className: "positiveMessage"}), 3500)
  }

  return (
    <LoginContainer>
      <h2>Register</h2>

      <p className={statusMessage.className}>{statusMessage.message}</p>
      
      <InputField name="name" label="Name" type="text" isRequired={true} onChange={(val) => setName(val)} value={name} />
      <InputField name="password" label="Password" type="password" isRequired={true} onChange={(val) => setPassword(val)} value={password} />
      <InputField name="re-type password" label="Re-type password" type="password" isRequired={true} onChange={(val) => setRetypePassword(val)} value={retypePassword} />

      <Button label="Register" onClick={() => registerUser()} />
      
      <br />

      <Link to="/login">Login</Link>
    </LoginContainer>
  )
}

export default Register
