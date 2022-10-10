import React from 'react'
import "./style.scss"

function Heading({ text, bg }) {
  return (
    <div className="Heading">
      <div className="Borders"><span></span></div>
      <h3 style={bg ? { background: '#f7f4fd' } : {}} className={`HeadingText ${bg ? bg : ''} ${text.length > 15 ? "HeadingTextLarge" : "HeadingTextSmall"}`}>{text}</h3>
    </div>
  )
}

export default Heading