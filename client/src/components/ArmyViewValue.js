import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom';
import "../styles/ArmyViewValue.scss"

function ArmyViewValue(props) {
  const navigate = useNavigate();

  return (
    <div className="ArmyViewValueContainer">
      <span className="ArmyViewValueName"><b>Army Name: </b> {props.armyValue.armyName}</span>
      <div className="greenButtonsContainer">
        <Button margin="0px 10px 0px 0px" label="View" className="greenAffirmationButton" onClick={() => navigate(`/view-army?armyId=${props.armyValue.id}`)}/>
        <Button margin="0px 10px 0px 0px" label="Edit" className="greenAffirmationButton" onClick={() => navigate(`/create-new-army?armyId=${props.armyValue.id}`)}/>
      </div>
      <Button margin="0" label="Delete" className="alertButton" onClick={() => props.deleteById(props.armyValue.id)}/>
    </div>
  )
}

export default ArmyViewValue
