/*
Funcion que oculta el contenido del texto mostrado
*/
function ocultar() {
  document.getElementById("#contenido").innerHTML = "";
}

/* 
1 .- Programa que lista los archivos en el servidor 
*/

function listar() {
  const url = "http://localhost:3000/listar";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var html = "<ul>";
      var length = data.text.length
      for (let index = 0; index < length; index++) {
          html += `<li>${data.text[index]}</li>
          <button onclick='verContenido("${data.text[index]}")'>ver</button>
          `;
      }
      
      html += `</ul>
      <div id="contenido"></div>
      `;
      document.querySelector("#lista").innerHTML = html;
    });
}

/*
2 .- Ver Contenido del Markdwon File
*/
function verContenido(file) {

  const url = 'http://localhost:3000/contenido?nombre=' + file;

  fetch(url)
  .then(
    response => response.json()
    ).then(
      data => {
        document.querySelector("#contenido").innerHTML = data.text;
      }
    )
}

function enviar() {
  const titulo = document.getElementById("title").value;
  const texto = document.getElementById("text").value;

  const url = 'http://localhost:3000/';
  const data = {
    title : titulo,
    text : texto,
  };

  const request = {
    method : 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(data),
  };

 
  fetch(url,request).
  then(
    response => response.json()
  ).then(
    data => {
      console.log(data)
    }
  );
  
};
