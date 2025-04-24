import {useEffect} from "react"
import { useNavigate } from "react-router-dom"

const useNotAuthenticated = () => {
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/api/retrieveCurrentUser")
      .then(res => res.json())
      .then(data => {
        if(data.user !== undefined) {
          navigate("/")
        }
      })
  }, [navigate])
}

export default useNotAuthenticated
