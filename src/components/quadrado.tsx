// import { useState } from "react"

const Quadrado = (props:any):any=>{
  const { id, key, clicked, render, nextPlayer} = props

  return(
    <div id={id} key={key} onClick={(event:any)=>{clicked(event.currentTarget)}} className="quadrados">{render(nextPlayer)}</div>
  )
}

export default Quadrado