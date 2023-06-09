import React, { useRef, useState} from 'react';
// import Xis from './components/xis';
// import Circulo from './components/circulo';
import Vencedor from './components/vencedor';
import Quadrado from './components/quadrado'
import robo from './scripts/robo'
// import Fogos from './components/fogos';
import Swal, { SweetAlertOptions } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './App.css';
import './styles/animations.css'

const MySwal = withReactContent(Swal)

function App() {
  const [ lista, setLista ] = useState<Array<Array<number>>>([[0,0,0],[0,0,0],[0,0,0]]) 
  const [ jogada, setJogada ] = useState<any>(undefined)
  const [ bloquear, setBloquear] = useState<boolean>(false)
  // const [ openFire, setOpenFire ] = useState<boolean>(false)
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
    let retornoRobo = robo(lista)
    console.log(retornoRobo);
    
  }

  const resetar = ()=>{
    setLista(reset)
    setBloquear(false)
    setJogada(true)
  }

  const Player = (props:any):any=>{
    const {player} = props
    let imgQuadrado:any = undefined
    
    if(player === 1) imgQuadrado = <img className='imgQuadrado' src="/xis.png" alt="" />
    if(player === 4) imgQuadrado = <img className='imgQuadrado' src="/circulo.png" alt="" />
    return imgQuadrado
  }
  
  return (
    <div key="App" className="App" ref={(ref) => divRef.current = ref}>
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
                        <Quadrado id={`${i}:${I}`} clicked={(event:any)=>{clicked(event.id)}} nextPlayer={jogada} render={(player:any)=> <Player player={E}/> } />
                      )
                    })}
                  </div>
                )
              })
            }
          </div>
          <button onClick={resetar}>Reiniciar</button>
          {/* {false ? <Fogos largura={1} altura={15}/> : <>alternativo</>} */}
        </div>
      </div>

      {/* <button onClick={()=>{setOpenFire(!openFire)}} style={{height: '50px', padding: '5px', marginTop: '500px',}}>fogo</button> */}
    </div>
  );
}

export default App;
