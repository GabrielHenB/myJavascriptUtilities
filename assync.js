// SINCRONIZACAO: promises, await

const display = document.querySelector('.display-6');

function render(display, text){
  display.innerHTML += text;
}

render(display,"SINCRONIZACAO: ");

//===========================

//===========================
function aleat(min,max){
  return Math.floor(Math.random() * (max-min) + min);
}

function timed(msg,t){
  console.log("Func acionada com t = " + t);
  setTimeout(()=>{
    console.log(msg);
    render(display,msg);
  }, t);
}

function timedPromised(msg,t){
  return new Promise((resolve, reject)=>{
    if(typeof msg !== "string"){
      reject("Erro de Tipo Inválido <br>");
      return false;
    } 
    setTimeout(()=>{
      resolve(msg); //O que sera passado
  }, t);
  });
}

timedPromised("Primeiro <br>", aleat(1000,3200)).then(
  re => {
    render(display,re);
    //Posso chamar outro dentro desse desde que concatene outro then
    return timedPromised("Segundo em ordem <br>", aleat(1000,3200));
  }
).then(re => {
  //Segundo
  render(display,re);
  return timedPromised(400, 1000);
}).then(re=>{render(display,re)}).catch(erro => {
  render(display,erro);
});

const promessas = ["METODO ALL: <br>",
                   timedPromised("Roda todas as promises <br>", 6000),
                  timedPromised("que estiverem num array <br>", 200),
                  "Mesmo se nao forem<br>"];
Promise.all(promessas).then(re => render(display,re)).catch(er => render(display,er));

const promessasApenas = [timedPromised("Ultimo depois deles", 10000),
                         timedPromised("Primeiro race()", 200),
                         timedPromised("Segundo depois do primeiro", 300)];
//Faz ele retornar os q acabarem primeiro
Promise.race(promessasApenas).then(re => render(display,re)).catch(er => render(display,er));

//============= async e await sendo que timedPromised retorna new Promise()
async function promessasAssincronas(){
  try{
    const um = await timedPromised("Await 1", 11200);
    console.log("Foi um");
    render(display,um);
    const dois = await timedPromised("Await 2", 12000);
    console.log("Final e agora um outro: ");
    render(display,dois);
    const outro = await timedPromised("Await Final", 12040);
    console.log(outro);
    render(display,outro);
    const errado = await timedPromised({erro: "erro"}, 12040);
    console.log(errado);
  }catch(e){
    console.log("Deu ruim: " + e);
    render(display,e);
  }
}
promessasAssincronas();
