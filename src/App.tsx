import React, { useRef, useState} from 'react';
import Xis from './components/xis';
import Circulo from './components/circulo';
import Vencedor from './components/vencedor';
import Quadrado from './components/quadrado'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './App.css';

const MySwal = withReactContent(Swal)

function App() {
  const [ lista, setLista ] = useState<Array<Array<number>>>([[0,0,0],[0,0,0],[0,0,0]]) 
  const [ jogada, setJogada ] = useState<any>(undefined)
  const [ bloquear, setBloquear] = useState(false)
  const [ placar, setPlacar ] = useState({xis:0, circulo: 0})
  const reset = [[0,0,0],[0,0,0],[0,0,0]]
  const divRef = useRef<HTMLDivElement | null>(null)
  
  const vencedor = () => {
    const ganhador = Vencedor(lista)
    if (ganhador !== '') {
      const options: SweetAlertOptions = {
        title: ganhador,
        target: divRef.current ?? 'body',
        heightAuto: false
      };
      MySwal.fire(options)
      if (ganhador === 'O vencedo é XIS') setPlacar({...placar, xis : placar.xis + 1})
      if (ganhador === 'O vencedo é CIRCULO') setPlacar({...placar, circulo : placar.circulo + 1})
      setBloquear(true)
    }
  }
  
  const clicked = (id:string)=> {
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

  const Player = (props:any):any=>{
    const {player} = props
    let imgQuadrado:any = undefined
    
    if(player === 1) imgQuadrado = <Xis/>
    if(player === 4) imgQuadrado = <Circulo/>
    return imgQuadrado
  }
  
  return (
    <div  className="App" ref={(ref) => divRef.current = ref}>
      <div id='placarP' className='flexGrow-1'>
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
      </div>
      
      <div id='alinharP' className='flexGrow-2'>
        <div id='alinhar'>
          <div id='principal'>
            {
              lista.map((e,i):any=>{
                return (
                  <div key={`${i}`} id={`${i}`} className='linha'>
                    {e.map((E,I)=>{
                      return (
                        <Quadrado key={`${i}:${I}`} id={`${i}:${I}`} clicked={(event:any)=>{clicked(event.id)}} nextPlayer={jogada} render={(player:any)=> <Player player={E}/> } />
                      )
                    })}
                  </div>
                )
              })
            }
          </div>
          <button onClick={resetar}>Reiniciar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
