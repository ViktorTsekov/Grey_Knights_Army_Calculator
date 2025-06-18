import {useState, useEffect} from 'react'
import Button from '../components/Button'
import html2pdf from 'html2pdf.js'

function ArmyView() {
  const [armyList, setArmyList] = useState([])
  const [armyName, setArmyName] = useState("")
  const [totalPoints, setTotalPoints] = useState("")

  const saveAsPdf = () => {
    const element = document.getElementById('armyDiv')

    html2pdf()
      .set({
        margin: 10,
        filename: `${armyName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
      .from(element)
      .save()
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const armyId = queryParams.get("armyId")

    if(armyId !== undefined) {
      fetch(`/api/get-army?armyId=${armyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {
        setArmyName(data.armyName)
        setArmyList(JSON.parse(data.armyList))
        setTotalPoints(JSON.parse(data.armyList).reduce((total, cur) => total + cur.points, 0))
      })
      .catch((e) => {
        console.error(e)
      })
    }
  }, [])

  return (
    <>
      <div style={{marginLeft: "40px"}} id="armyDiv">
        <br />
        <h3 style={{margin: "20px"}}>{armyName}</h3>
        {
          armyList.map((el, index) => {
            return <div key={index} style={{margin: "20px"}}>
              <span>{el.displayName}</span>
            </div>
          })
        }
        <h3 style={{margin: "20px"}}>Total points: {totalPoints}</h3>
      </div>
      <Button margin="0px 0px 40px 60px" width="120px" label="Download as pdf" className="greenAffirmationButton" onClick={() => saveAsPdf()} />
    </>
  )
}

export default ArmyView
