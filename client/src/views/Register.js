import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import LoginContainer from '../components/LoginContainer'
import InputField from '../components/InputField'
import Button from '../components/Button'
import '../styles/Register.scss'

const statusCodes = require('../static_files/statusCodes')

function Register() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")
  const [statusMessage, setStatusMessage] = useState({message: "", className: ""})

  const navigate = useNavigate()

  useEffect(() => {
    fetch('/retrieveCurrentUser')
      .then(res => res.json())
      .then(data => {
        if(data.user !== undefined) {
          navigate("/")
        }
      })
  }, [])

  const fieldsAreValid = () => {
    return name !== "" && password !== "" && retypePassword !== ""
  }

  const registerUser = () => {
    setStatusMessage({message: "", className: ""})
    
    if(fieldsAreValid()) {
      if(password === retypePassword) {
        fetch('/register', {
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
    } 
  }

  return (
    <LoginContainer>
      <h2>Register</h2>

      <p className={statusMessage.className}>{statusMessage.message}</p>
      
      <InputField name="name" label="Name" type="text" isRequired={true} updateValue={(val) => setName(val)} />
      <InputField name="password" label="Password" type="password" isRequired={true} updateValue={(val) => setPassword(val)} />
      <InputField name="re-type password" label="Re-type password" type="password" isRequired={true} updateValue={(val) => setRetypePassword(val)} />

      <Button label="Register" onClick={() => registerUser()} />
      
      <br />

      <a href="/login">Login</a>
    </LoginContainer>
  )
}

export default Register
