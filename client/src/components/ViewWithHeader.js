import React from "react"
import Header from '../components/Header'
import App from '../views/App'
import Users from '../views/Users'
import useCurrentUser from "../custom_hooks/useCurrentUser"
import useAuthenticated from '../custom_hooks/useAuthenticated'
import ArmyValues from "../views/ArmyValues"
import WargearValues from "../views/WargearValues"

const ViewWithHeader = (props) => {
  useAuthenticated()

  const {user} = useCurrentUser()

  const views = {
    Home: <App user={user} />,
    Users: <Users user={user} />,
    ArmyValues: <ArmyValues user={user} />,
    WargearValues: <WargearValues user={user} />
  }

  return (
    <div>
      <Header user={user} />
      {
        views[props.viewName]
      }
    </div>
  )
}

export default ViewWithHeader
