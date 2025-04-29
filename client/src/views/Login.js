import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import LoginContainer from '../components/LoginContainer'
import Button from '../components/Button'
import InputField from '../components/InputField'
import useNotAuthenticated from '../custom_hooks/useNotAuthenticated'
import "../styles/Login.scss"
import fieldsAreValid from '../helpers/fieldsAreValid';
import { Link } from 'react-router-dom';

const statusCodes = require('../static_files/statusCodes')

function Login() {
  useNotAuthenticated()

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  const navigate = useNavigate()

  const loginUser = () => {
    if(fieldsAreValid(name, password)) {
      fetch('/api/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          password: password
        })
      })
      .then(res => {
        if(res.status === 404) {
          throw new Error(statusCodes.wrongUsername)
        } else {
          return res.json()
        }
      })
      .then(data => {
        if(data.isAuthenticated === true) {
          navigate("/")
        }
      })
      .catch((e) => {
        if (e instanceof Error) {
          setAlertMessage(e.message)
        } else {
          setAlertMessage('An unexpected error has occurred')
        }
        
        console.log(e.message)
        setName("")
        setPassword("")
      })
    } else {
      setAlertMessage(statusCodes.emptyFields)
    }

    const timeout = setTimeout(() => setAlertMessage(""), 4000)
    
    return () => clearTimeout(timeout)
  }

  return (
    <LoginContainer>
      <h2>Login</h2>

      <p className='alertMessage'>{alertMessage}</p>

      <InputField name="name" label="Name" type="text" isRequired={true} onChange={(val) => setName(val)} value={name} />
      <InputField name="password" label="Password" type="password" isRequired={true} onChange={(val) => setPassword(val)} value={password} />

      <Button label="Login" onClick={() => loginUser()}/>
      
      <br />

      <Link to="/register">Register</Link>
    </LoginContainer>
  )
}

export default Login
