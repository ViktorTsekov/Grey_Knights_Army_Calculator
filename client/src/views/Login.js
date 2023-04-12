import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import LoginContainer from '../components/LoginContainer'
import Button from '../components/Button'
import InputField from '../components/InputField'
import "../styles/Login.scss"

const statusCodes = require('../static_files/statusCodes')

function Login() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

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

  const loginUser = () => {
    if(name !== "" && password !== "") {
      fetch('/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          password: password
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.isAuthenticated === true) {
          navigate("/")
        }
      })
      .catch(e => {
        setName("")
        setPassword("")
        setAlertMessage(statusCodes.wrongUsername)
      })
    }
  }

  return (
    <LoginContainer>
      <h2>Login</h2>

      <p className='alertMessage'>{alertMessage}</p>

      <InputField name="name" label="Name" type="text" isRequired={true} updateValue={(val) => setName(val)} />
      <InputField name="password" label="Password" type="password" isRequired={true} updateValue={(val) => setPassword(val)} />

      <Button label="Login" onClick={() => loginUser()}/>
      
      <br />

      <a href="/register">Register</a>
    </LoginContainer>
  )
}

export default Login
