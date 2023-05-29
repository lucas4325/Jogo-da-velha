const Vencedor = (lista:any) =>{
  let soma: number = 0
  let somaD: number = 0
  let resultado = ''
  
  const percorre = (orientacao:string)=>{
    for (let i=0; i<=2; i++){
      for (let j=0; j<=2; j++){
        if (orientacao === 'horizontal'){
          soma = soma + lista[i][j]
        } else{
          soma = soma + lista[j][i]
        }
        if (soma === 3) {resultado = 'XIS'}
        if (soma === 12) {resultado = 'CIRCULO'}
      }
      soma = 0
      somaD = somaD + lista[i][i]
      
      if (somaD === 3) {resultado = 'XIS'}
      if (somaD === 12) {resultado = 'CIRCULO'}
    }
    somaD = 0
    somaD = lista[0][2] + lista[1][1] + lista[2][0]
    
    if (somaD === 3) {resultado = 'XIS'}
    if (somaD === 12) {resultado = 'CIRCULO'}
    somaD = 0
  }
  
  percorre('vertical')

  if (resultado === '') percorre('horizontal')
  return resultado
}

export default Vencedor