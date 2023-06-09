import { useEffect, useState } from "react"

const FogoDoom = ()=>{
  const [ print, setPrint ] = useState<any>()
  const firePixels: any[] = []
  const fireWidth: number = 40
  const fireHeight: number = 40
  const fireColorsPalette = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]

  const start = ():any=> {
    createFireDataStructure()
    createFireSource()
    setPrint(renderFire())

    setInterval(calculateFirePropagation, 50)
  }

  const createFireDataStructure = ()=> {
    for (let i=0; i<fireHeight; i++){
      firePixels[i] = []
      for (let j=0; j<fireWidth; j++){
        firePixels[i][j] = 0
      }
    }
  }

  const calculateFirePropagation = ()=>{
    for (let i = 0; i < fireHeight; i++){
      for (let j = 0; j < fireWidth; j++){
        let decay = Math.floor(Math.random() * 3)
        
        const belowPixelIndex = firePixels[j][i]
        
        if (firePixels.length - 1 === j && belowPixelIndex >= 36) {
            
        } else{
          firePixels[j][i] = firePixels[j+1][i] - decay> 0 ? firePixels[j+1][i] - decay : 0
        }
      }
    }
    
    setPrint(renderFire())
  }

  const createFireSource = ()=>{
    for (let c=0; c <=fireWidth; c++){
      for (let i=0; i < fireWidth; i++){
        firePixels[fireHeight-1][i] = 36
      }
    }
  }

  const renderFire = ():any =>{
    const debug = false
    
      return firePixels.map((e, i)=>{
        return (
          <div key={`${i}`} id={`${i}`} style={{display: 'flex'}}>
            {
              firePixels[i].map((E:any,I:number) =>{
                if (debug) {
                  return <div key={`${I}`} id={`${I}`} className="firePixels"><div key={`i${I}`} id={`i${I}`} className="pixel-index">{i}{I}</div><div key={`e${I}`} id={`e${I}`} style={{marginTop:'25%'}}>{E}</div></div>
                } else {
                  const color = fireColorsPalette[E]
                  const colorString = `${color.r},${color.g},${color.b}`
                  return <div key={`${I}`} id={`${I}`} className="pixel" style={{backgroundColor: `rgb(${colorString})`}}></div>
                }
              })
            }
          </div>
        )
      })
    
  }

  useEffect(()=>{
    start()
  }, [])
  return (
    <div id="fireCanvas" style={{display: 'flex', flexDirection: 'column'}}>
      {
        print
      }
    </div>
  )
}

export default FogoDoom