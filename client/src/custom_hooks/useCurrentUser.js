import {useEffect, useState} from 'react'

const useCurrentUser = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch("/api/retrieveCurrentUser")
      .then(res => res.json())
      .then(data => {
        if(data.user !== undefined) {
          setUser(data.user)
        }
      })
  }, [])

  return {user}
}

export default useCurrentUser
