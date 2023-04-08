import React, {useEffect, useState} from 'react'

function Login() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div>
      <h1>Login</h1>

      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button type="submit">Login</button>
      
      <br />

      <a href="/register">Register</a>
    </div>
  )
}

export default Login
