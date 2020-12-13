import React from "react"

export interface props {
  mainHeadingText: string
  secondaryHeadingText: string
}

export default function Header(props: props) {
  return (
    <div className="headerContainer">
      <h1>{props.mainHeadingText}</h1>
      <h3>{props.secondaryHeadingText}</h3>
    </div>
  )
}
