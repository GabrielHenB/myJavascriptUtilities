const rq = entrada => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(entrada.method, entrada.url, true);
    xhr.send();

    xhr.addEventListener('load', () => {
      if(xhr.status >= 200 && xhr.status < 300){
        //ok codes
        resolve(xhr.responseText);
      } else{
        reject(xhr.statusText);
      }
    })
  })
}

window.onload = () => {
  document.addEventListener('click', e => {
    const target = e.target; //pega o alvo do click
    const tag = target.tagName.toLowerCase(); //pega a tag do click

    if(tag === 'a'){
      e.preventDefault();
      if(target.classList.contains('fetch')) fetchPage(target);
      else if(target.classList.contains('fetch-json')) fetchJson(target);
      else if(target.classList.contains('fetch-axios')) fetchAxios(target);
      else getPage(target);
    }
  })
};

async function getPage(e){
  const url = e.getAttribute('href');
  //rq() retorna uma Promise, logo:
  try{
    let content = await rq({
    method: 'GET',
    url: url
    });
    if(content) render('.afterDisplay', content);
  }catch(err){
    console.log("Erro AJAX: "+ err);
    render('.display-6', err);
  }
  
  
}

function fetchPage(e){
  const url = e.getAttribute('href');
  //usa o Fetch API
  console.log("Fetchin'");
  fetch(url).then(
    pacote => {
      if(pacote.status < 200 || pacote.status >= 300) throw new Error("Erro no Fetch API de codigo: " + pacote.status);
      return pacote.text();
    }
  ).then(desempacotado => render('.afterDisplay',desempacotado))
    .catch(err => {
      console.log("Erro Fetcher: " + err);
      render('.display-6', err);
    });
}

function fetchJson(e){
  const url = e.getAttribute('href');
  console.log("Fetchin JSON...");
  fetch(url).then(pac => {
    if(pac.status < 200 || pac.status >= 300) throw new Error("JSON Fetch Error Code " + pac.status);
    return pac.json();
  }).then(
    content => renderJSON('.afterDisplay',content)
  ).catch(err => {
      console.log("Erro Fetcher: " + err);
      render('.display-6', err);
    });
}

function fetchAxios(e){
  const url = e.getAttribute('href');
  console.log("Using AXIOS to Fetch....");
  axios(url).then(thing => renderJSON('.afterDisplay', thing))
    .catch(err => console.log("Erro Axios: " + err));
}

function render(target, content){
  const element = document.querySelector(target);
  element.innerHTML += content;
}

function renderJSON(target, json){
  const element = document.querySelector(target);
  const table = document.createElement('table');
  for(let obj of json){
    const tr = document.createElement('tr');
    let title = document.createElement('td');
    title.innerHTML = obj.title;
    tr.appendChild(title);

    let author = document.createElement('td');
    author.innerHTML = obj.author;
    tr.appendChild(author);

    let numcaps = document.createElement('td');
    numcaps.innerHTML = obj.numcaps;
    tr.appendChild(numcaps);

    let lastread = document.createElement('td');
    lastread.innerHTML = obj.lastread;
    tr.appendChild(lastread);
    table.appendChild(tr);
  }

  element.appendChild(table);
}