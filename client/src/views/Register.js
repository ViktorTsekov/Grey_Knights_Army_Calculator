import React, {useState} from 'react'

function Register() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")
  const [statusMessage, setStatusMessage] = useState({message: "", color: ""})

  const [showNameWarning, setShowNameWarning] = useState(false)
  const [showPasswordWarning, setShowPasswordWarning] = useState(false)
  const [showRetypePasswordWarning, setShowRetypePasswordWarning] = useState(false)

  const validateFields = () => {
    name === "" ? setShowNameWarning(true) : setShowNameWarning(false)
    password === "" ? setShowPasswordWarning(true) : setShowPasswordWarning(false)
    retypePassword === "" ? setShowRetypePasswordWarning(true) : setShowRetypePasswordWarning(false)

    return name !== "" && password !== "" && retypePassword !== ""
  }

  const registerUser = () => {
    setStatusMessage({message: "", color: ""})
    
    if(validateFields()) {
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
          setStatusMessage({message: data.message, color: "green"})
          setName("")
          setPassword("")
          setRetypePassword("")
        })
        .catch(error => setStatusMessage({message: error, color: "red"}))
      } else {
        setStatusMessage({message: "Passwords do not match", color: "red"})
      }
    } 
  }

  return (
    <div>
      <h1>Register</h1>

      <p style={{color: `${statusMessage.color}`}}>{statusMessage.message}</p>
      
      {
        showNameWarning &&
          <p style={{color: "red"}}>Field is required</p>
      }
      <div>
        <label for="name">Name</label>
        <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
      </div>

      {
        showPasswordWarning &&
          <p style={{color: "red"}}>Field is required</p>
      }
      <div>
        <label for="password">Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      </div>

      {
        showRetypePasswordWarning &&
          <p style={{color: "red"}}>Field is required</p>
      }
      <div>
        <label for="re-type password">Re-type password</label>
        <input type="password" name="re-type password" onChange={(e) => setRetypePassword(e.target.value)} value={retypePassword} />
      </div>

      <button onClick={() => registerUser()}>Register</button>
      
      <br />

      <a href="/login">Login</a>
    </div>
  )
}

export default Register
