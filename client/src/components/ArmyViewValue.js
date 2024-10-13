import React from 'react'
import Button from '../components/Button'
import "../styles/ArmyViewValue.scss"

function ArmyViewValue(props) {
  return (
    <div className="ArmyViewValueContainer">
      <span className="ArmyViewValueName">{props.armyValue.armyName}</span>
      <Button margin="0px 10px 0px 0px" label="View" className="greenAffirmationButton" onClick={() => window.location.href = `/view-army?armyId=${props.armyValue.id}`}/>
      <Button margin="0px 10px 0px 0px" label="Edit" className="greenAffirmationButton" onClick={() => window.location.href = `/create-new-army?armyId=${props.armyValue.id}`}/>
      <Button margin="0" label="Delete" className="alertButton" onClick={() => props.deleteById(props.armyValue.id)}/>
    </div>
  )
}

export default ArmyViewValue
