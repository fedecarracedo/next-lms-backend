const express = require('express')
const app = express()

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "next-usuarios"
});

app.get('/:table/obtenerTodos', (req, res) => {
    con.query("SELECT * FROM " + req.params.table, (err, res, fields) => console.log(res))
})

app.get('/usuario_curso/obtenerCursosUsuario/:usuario_id', (req, res) => {
    try {
        con.query("SELECT * FROM usuario_curso JOIN curso ON curso_id = usuario_curso_curso WHERE usuario_curso_usuario = " + req.params.usuario_id, (err, response, fields) => {
            res.status(200).header('Access-Control-Allow-Origin', '*').send(response)
        })
    } catch (error) {
        res.status(501)
        throw(error)
    }
})

app.get('/leccion/obtenerLeccionesUnidad/:unidad_id', (req, res) => {
    try {
        con.query(`SELECT * FROM leccion WHERE leccion_unidad = ${req.params.unidad_id}`, (err, response, fields) => {
            console.log(JSON.parse(JSON.stringify(response))[0])
            res.status(200).header('Access-Control-Allow-Origin', '*').send(response)
        })
    } catch (error) {
        throw(error)
    }
})

const JSONData = { "elementos": [
    {
        "id": "oUq2g_tl8y",
        "type": "header",
        "data": {
           "text": "Editor.js",
           "level": 2
        }
     },
     {
        "id": "zbGZFPM-iI",
        "type": "paragraph",
        "data": {
           "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
        }
     },
     {
        "id": "qYIGsjS5rt",
        "type": "header",
        "data": {
           "text": "Key features",
           "level": 3
        }
     },
     {
        "id": "XV87kJS_H1",
        "type": "list",
        "data": {
           "style": "unordered",
           "items": [
              "It is a block-styled editor",
              "It returns clean data output in JSON",
              "Designed to be extendable and pluggable with a simple API"
           ]
        }
     },
     {
        "id": "AOulAjL8XM",
        "type": "header",
        "data": {
           "text": "What does it mean «block-styled editor»",
           "level": 2
        }
     },
     {
        "id": "cyZjplMOZ0",
        "type": "paragraph",
        "data": {
           "text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js"
        }
     }
]}

app.get('/', (req, res) => {
    con.query(`INSERT INTO leccion (leccion_unidad,leccion_nombre,leccion_contenido) VALUES ('1','Negociacion y oratoria','${JSON.stringify(JSONData.elementos)}')`, (err, response, fields) => {
        console.log(response)
        console.log(err)
        res.status(200).header('Access-Control-Allow-Origin', '*').send(response)
    })
    console.log("Solicitud enviada")
})

app.listen('8080', function () {
    console.log("Servidor escuchando en el puerto 8080.");
});
