import {useEffect} from "react"
import { useNavigate } from "react-router-dom"

const useAuthenticated = () => {
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/retrieveCurrentUser")
      .then(res => res.json())
      .then(data => {
        if(data.user === undefined) {
          navigate("/login")
        }
      })
  }, [navigate])
}

export default useAuthenticated
