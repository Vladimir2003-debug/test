const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const bp = require('body-parser')
const MarkdownIt = require('markdown-it'),
	md = new MarkdownIt();

app.use(express.static('pub'));
app.use(bp.json())
app.use(bp.urlencoded({
	extended: true
}))



app.listen(3000, () => {
	console.log("Escuchando en: http://localhost:3000")
});

app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'index.html'))
});

/*
1 .- Listar todos los archivos markdown en el servidor
*/

app.get('/listar', (request, response) => {
	fs.readdir(path.resolve(__dirname, 'files'), 'utf8',
		(err, data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
			console.log(data)
			response.json({
				text: data
			})
		})
      //
});

/*
2.- Ver el contenido de los archivos markdown
*/

app.get('/contenido',(request,response) => {
	var nombre = request.query.nombre;
		fs.readFile(path.resolve(__dirname, 'files/' + nombre), 'utf8',
		(err, data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
			
			response.json({
				text: md.render(data).replace(/\n/g, '<br>')
			})
		})
      //
});

/*
3 .- Creacion de nuevos archivos markdown y se almacenan en el servidor
*/

app.post('/', (request, response) => {
	console.log(request.body);

	fs.writeFile(path.resolve(__dirname,'files/' + request.body.title + '.txt'),request.body.text,'utf8',
		(err,data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
	})
	}
);
