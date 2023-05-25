// import React from "react";

const casosDeVitoria = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

const Vencedor = (lista:any) =>{
  let c:Array<number> = []
  let x:Array<number> = []
  let v:string = ''
  lista.map((e:any, i:number): void =>{if(e && e.props.className === 'circulo') c = [...c, i]})
  lista.map((e:any, i:number): void =>{if(e && e.props.className === 'xis')  x = [...x, i]})

  casosDeVitoria.map(eM =>{
    const rc = c.reduce((a:number, e:number): any =>{
      if (e === eM[0] || e === eM[1] || e === eM[2]){
        return ++a
      }
      return a
    }, 0)
    
    const rx = x.reduce((a:number, e:number): any =>{
      if (e === eM[0] || e === eM[1] || e === eM[2]){
        return ++a
      }
      return a
    }, 0)

    if (rc === 3) {
      v = 'CIRCULO'
    }
    if (rx === 3){
      v = 'XIS'
    }
  })
  
  if(v === 'XIS' || v === 'CIRCULO') return v
}

export default Vencedor