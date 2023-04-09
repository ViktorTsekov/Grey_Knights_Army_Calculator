import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  const navigate = useNavigate()
 
  const loginUser = () => {
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
      if(data.isAuthenticated == true) {
        navigate("/")
      }
    })
    .catch(e => {
      setName("")
      setPassword("")
      setAlertMessage("Wrong username or password")
    })
  }

  return (
    <div>
      <h1>Login</h1>

      <p style={{color: "red"}}>{alertMessage}</p>

      <div>
        <label for="name">Name</label>
        <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
      </div>

      <div>
        <label for="password">Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      </div>

      <button onClick={() => loginUser()}>Login</button>
      
      <br />

      <a href="/register">Register</a>
    </div>
  )
}

export default Login
