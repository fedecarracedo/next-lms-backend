const express = require("express");
const app = express();

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "next-usuarios",
});

app.get("/:table/obtenerTodos", (req, res) => {
  con.query("SELECT * FROM " + req.params.table, (err, res, fields) =>
    console.log(res)
  );
});

app.get("/:table/obtenerSegunId/:id", (req, res) => {
  con.query(
    `SELECT * FROM ${req.params.table} WHERE ${req.params.table}_id = ${req.params.id}`,
    (err, response, fields) => {
      res.status(200).header("Access-Control-Allow-Origin", "*").send(response);
    }
  );
});

app.get("/usuario_curso/obtenerCursosUsuario/:usuario_id", (req, res) => {
  try {
    con.query(
      "SELECT * FROM usuario_curso JOIN curso ON curso_id = usuario_curso_curso WHERE usuario_curso_usuario = " +
        req.params.usuario_id,
      (err, response, fields) => {
        res
          .status(200)
          .header("Access-Control-Allow-Origin", "*")
          .send(response);
      }
    );
  } catch (error) {
    res.status(501);
    throw error;
  }
});

app.get("/:table/getRecordUsing/:field/:fieldValue", (req, res) => {
  try {
    con.query(
      `SELECT * FROM ${req.params.table} WHERE ${req.params.field} = '${req.params.fieldValue}'`,
      (err, response, fields) => {
        res
          .status(200)
          .header("Access-Control-Allow-Origin", "*")
          .send(response);
      }
    );
  } catch (error) {
    res.status(201);
    throw error;
  }
});

app.get("/unidad/obtenerUnidadesCurso/:idCurso", (req, res) => {
  try {
    con.query(
      `SELECT * FROM unidad WHERE unidad_curso = ${req.params.idCurso}`,
      (err, response, fields) => {
        res
          .status(200)
          .header("Access-Control-Allow-Origin", "*")
          .send(response);
      }
    );
  } catch (error) {
    res.status(501);
    throw error;
  }
});

app.get("/leccion/obtenerLeccionesUnidad/:idUnidad", (req, res) => {
  try {
    con.query(
      `SELECT * FROM leccion WHERE leccion_unidad = ${req.params.idUnidad}`,
      (err, response, fields) => {
        res
          .status(200)
          .header("Access-Control-Allow-Origin", "*")
          .send(response);
      }
    );
  } catch (error) {
    res.status(501);
    throw error;
  }
});

app.post("/leccion/crearLeccion", (req, res) => {
  con.query(
    `INSERT INTO leccion (leccion_unidad,leccion_nombre,leccion_contenido) VALUES ('1','Negociacion y oratoria','${JSON.stringify(
      JSONData.elementos
    )}')`,
    (err, response, fields) => {
      res.status(200).header("Access-Control-Allow-Origin", "*").send(response);
    }
  );
  console.log("Solicitud enviada");
});

app.listen("8080", () => {
  console.log("Servidor escuchando en el puerto 8080.");
});
