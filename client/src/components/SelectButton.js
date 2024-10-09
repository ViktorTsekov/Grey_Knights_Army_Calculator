import React from "react"

function SelectButton(props) {
  return (
    <select onChange={(e) => props.onChange(e.target.value)} name={props.name} id={props.name}>
      {
        props.options.map((el) => {
          return <option value={el}>{el}</option>
        })
      }
    </select>
  )
}

export default SelectButton
