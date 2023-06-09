// import { useState } from "react"

const Quadrado = (props:any):any=>{
  const { id, clicked, render, nextPlayer} = props

  return(
    <div id={id} key={id} onClick={(event:any)=>{clicked(event.currentTarget)}} className="quadrados">{render(nextPlayer)}</div>
  )
}

export default Quadrado