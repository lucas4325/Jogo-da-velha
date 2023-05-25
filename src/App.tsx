import React from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  const [ lista, setLista ] = React.useState<Array<any>>([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]) 
  const [ jogada, setJogada ] = React.useState(true)
  const [ bloquear, setBloquear] = React.useState(false)
  const reset = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
  const casosDeVitoria = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

  const vencedor = ()=>{
    let c:Array<number> = []
    let x:Array<number> = []
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
        console.log('O CIRCULO venceu');
        setBloquear(true)
      }
      if (rx === 3){
        console.log('O XIS venceu');
        setBloquear(true)
      }
    })
  }

  

  const clicked = (e: HTMLDivElement)=> {
    const id = Number(e.getAttribute('id'))
    if (!lista[id] && !bloquear){
      lista[id] = jogada ? xis : circulo
      setJogada(!jogada)
      setLista([...lista])      
      vencedor()
    }
  }

  const resetar = ()=>{
    setLista(reset)
    setBloquear(false)
    setJogada(true)
  }
  
  const circulo = <div className='circulo'></div>

  const xis = <div className='xis'>
    <div className='barraX1 barraX'></div>
    <div className='barraX2 barraX'></div>
  </div>
  
  return (
    <div className="App">
      <div id='principal'>
        {lista.map((e, i)=>{
          return(
            <div id={`${i}`} onClick={(event)=>{clicked(event.currentTarget)}} className='quadrados'>{e}</div>
          )
        })}
      </div>
      <button onClick={resetar}>Reiniciar</button>
    </div>
  );
}

export default App;
