// Smithereens
function smithereens(input){
  
  //Remover os digitos finais
  input = input.replace(/\D+/g, ''); //Remove o que nao eh numero
  //Se nao
  if(input === 'undefined') return false;
  if(input.length !== 11) return false;

  //Continua
  input = Array.from(input); // Remove os ultimos dois digitos
  let aImput = [...input];
  aImput.splice(9,2);
  
  
  // PRIMEIRA CONTA MULTIPLICA TODOS EM ORDEM 10 A 0
  // SEGUNDA CONTA SOMAR TUDO
  const primeira = aImput.map((elemento,indice,arranjo)=>{
    return elemento*(10-indice);
  }).reduce((s,e)=>s+e);

  console.log(primeira);
  
  // TERCEIRA CONTA DIGITO VERIFICADOR 1
  let digito1 = 11 - (primeira % 11);
  digito1 = (digito1 > 9) ? 0 : digito1;

  aImput.push(digito1);

  // QUARTA CONTA MULTIPLICA TODOS DE 11 A 0 E SOMA
  const segunda = aImput.map((elemento,indice,arranjo)=>{
    return elemento*(11-indice);
  }).reduce((s,e)=>s+e);

  // QUINTA CONTA DIGITO VERIFICADOR 2
  let digito2 = 11 - (segunda % 11);
  digito2 = (digito2 > 9) ? 0 : digito2;

  aImput.push(digito2);

  arrRender(input,"entrada:");
  arrRender(aImput,"saida:");

  for(let index in aImput){
    if(Number(aImput[index]) !== Number(input[index]))
      return false;
  }
  
  return true;
}


const teste = "705.484.450-52";
const teste2 = "070.987.720-03";

const result = smithereens(teste);
itsFive.innerHTML += (result) ? "<p>O CPF é válido</p>" : "<p>O CPF é inválido</p>";
const result2 = smithereens(teste2);
itsFive.innerHTML += (result2) ? "<p>O CPF é válido</p>" : "<p>O CPF é inválido</p>";
