import React, {useState} from 'react';
import Xis from './components/xis';
import Circulo from './components/circulo';
import Vencedor from './components/vencedor';
import Swal from 'sweetalert2'
import './App.css';

function App() {
  const [ lista, setLista ] = useState<Array<Array<number>>>([[0,0,0],[0,0,0],[0,0,0]]) 
  const [ jogada, setJogada ] = useState(true)
  const [ bloquear, setBloquear] = useState(false)
  const reset = [[0,0,0],[0,0,0],[0,0,0]]
  
  const vencedor = ()=>{
    const ganhador = Vencedor(lista)
    
    if (ganhador !== '') {
      console.log(`O vencedo é ${ganhador}`);
      Swal.fire(`O vencedo é ${ganhador}`)
      setBloquear(true)
    }
  }

  const clicked = (e: HTMLDivElement)=> {
    const id = e.getAttribute('id')    
    const i = Number(id?.charAt(0))
    const j = Number(id?.substr(-1))
    
    if (lista[i][j] === 0 && !bloquear){
      lista[i][j] = jogada ? 1 : 4
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
        {
          lista.map((e,i):any=>{
            return e.map((E,I)=>{
              return (<div id={`${i}:${I}`} onClick={(event)=>{clicked(event.currentTarget)}} className='quadrados'>{E === 1 ? <Xis/> : E === 4 ? <Circulo/> : undefined}</div>)
            })
          })
        }
      </div>
      <button onClick={resetar}>Reiniciar</button>
    </div>
  );
}

export default App;
