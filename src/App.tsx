import React, {useRef, useState} from 'react';
import Xis from './components/xis';
import Circulo from './components/circulo';
import Vencedor from './components/vencedor';
import Swal, { SweetAlertOptions } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './App.css';

const MySwal = withReactContent(Swal)

function App() {
  const [ lista, setLista ] = useState<Array<Array<number>>>([[0,0,0],[0,0,0],[0,0,0]]) 
  const [ jogada, setJogada ] = useState(true)
  const [ bloquear, setBloquear] = useState(false)
  const [ placar, setPlacar ] = useState({xis:0, circulo: 0})
  const reset = [[0,0,0],[0,0,0],[0,0,0]]
  const divRef = useRef<HTMLDivElement | null>(null)
  
  const vencedor = () => {
    const ganhador = Vencedor(lista)
    if (ganhador !== '') {
      const options: SweetAlertOptions = {
        title: `O vencedo é ${ganhador}`,
        target: divRef.current ?? 'body',
        heightAuto: false
      };
      MySwal.fire(options)
      if (ganhador === 'XIS') setPlacar({...placar, xis : placar.xis + 1})
      if (ganhador === 'CIRCULO') setPlacar({...placar, circulo : placar.circulo + 1})
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
    <div className="App" ref={(ref) => divRef.current = ref}>
      <div id='placar'>
        <div id='placar1'>
          Placar
          <div>
            XIS: {placar.xis}<br />
            CIRCULO: {placar.circulo}
          </div>
        </div>
        <button onClick={()=>{setPlacar({xis:0, circulo: 0})}}>Resetar Placar</button>
      </div>
      
      <div id='alinhar'>
        <div id='principal'>
          {
            lista.map((e,i):any=>{
              return e.map((E,I)=>{
                return (
                  <div key={`${i}:${I}`} id={`${i}:${I}`} onClick={(event)=>{clicked(event.currentTarget)}} className='quadrados' >
                    {
                      E === 1 ? <Xis/> : E === 4 ? <Circulo/> : undefined
                    }
                  </div>
                )
              })
            })
          }
        </div>
        <button onClick={resetar}>Reiniciar</button>
      </div>
    </div>
  );
}

export default App;
