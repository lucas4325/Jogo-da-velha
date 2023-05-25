import React, {useState} from 'react';
import Xis from './components/xis';
import Circulo from './components/circulo';
import Vencedor from './components/vencedor';
import './App.css';

function App() {
  const [ lista, setLista ] = useState<Array<any>>([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]) 
  const [ jogada, setJogada ] = useState(true)
  const [ bloquear, setBloquear] = useState(false)
  const reset = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]

  const vencedor = ()=>{
    const ganhador = Vencedor(lista)
    
    if (ganhador === 'XIS' || ganhador === 'CIRCULO') {
      console.log(`O vencedo é ${ganhador}`);
      setBloquear(true)
    }
  }
  
  const clicked = (e: HTMLDivElement)=> {
    const id = Number(e.getAttribute('id'))
    if (!lista[id] && !bloquear){
      lista[id] = jogada ? Xis() : Circulo()
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
