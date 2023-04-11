import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import LoginContainer from '../components/LoginContainer'
import InputField from '../components/InputField'
import Button from '../components/Button'
import colors from '../static files/colors'

function Register() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")
  const [statusMessage, setStatusMessage] = useState({message: "", color: ""})

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
    setStatusMessage({message: "", color: ""})
    
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
          setStatusMessage({message: data.message, color: `${colors.greenAffirmation}`})
          setName("")
          setPassword("")
          setRetypePassword("")
        })
        .catch(error => setStatusMessage({message: error, color: `${colors.redAlert}`}))
      } else {
        setStatusMessage({message: "Passwords do not match", color: `${colors.redAlert}`})
      }
    } 
  }

  return (
    <LoginContainer>
      <h1>Register</h1>

      <p style={{color: `${statusMessage.color}`}}>{statusMessage.message}</p>
      
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
