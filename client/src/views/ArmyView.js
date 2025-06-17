import React, {useState, useEffect} from 'react'
import Button from '../components/Button'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

function ArmyView() {
  const [armyList, setArmyList] = useState([])
  const [armyName, setArmyName] = useState("")
  const [totalPoints, setTotalPoints] = useState("")

const saveAsPdf = () => {
  const input = document.getElementById('armyDiv')

  html2canvas(input, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    const imgProps = {
      width: pdfWidth,
      height: (canvasHeight * pdfWidth) / canvasWidth,
    }

    let heightLeft = imgProps.height
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgProps.width, imgProps.height)
    heightLeft -= pdfHeight

    while (heightLeft > 0) {
      position = heightLeft - imgProps.height
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgProps.width, imgProps.height)
      heightLeft -= pdfHeight
    }

    pdf.save(`${armyName}.pdf`)
  })
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
      <div style={{margin: "20px"}} id="armyDiv">
        <br />
        <h3 style={{margin: "10px"}}>{armyName}</h3>
        {
          armyList.map((el, index) => {
            return <div key={index} style={{margin: "10px"}}>
              <span>{el.displayName}</span>
            </div>
          })
        }
        <h3 style={{margin: "10px"}}>Total points: {totalPoints}</h3>
      </div>
      <Button margin="0px 0px 0px 27px" width="120px" label="Download as pdf" className="greenAffirmationButton" onClick={() => saveAsPdf()} />
    </>
  )
}

export default ArmyView
