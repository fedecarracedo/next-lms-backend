const express = require("express");
const app = express();

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "next-usuarios",
});

app.use(express.text());

app.get("/:table/obtenerTodos", (req, res) => {
  con.query("SELECT * FROM " + req.params.table, (err, response, fields) => {
    res.status(200).header("Access-Control-Allow-Origin", "*").send(response);
  });
});

app.get("/:table/obtenerSegunId/:id", (req, res) => {
  con.query(
    `SELECT * FROM ${req.params.table} WHERE ${req.params.table}_id = ${req.params.id}`,
    (err, response, fields) => {
      res.status(200).header("Access-Control-Allow-Origin", "*").send(response);
    }
  );
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

app.post("/usuario/registrarUsuario", (req, res) => {
  try {
    const body = JSON.parse(req.body);
    con.query(
      `INSERT INTO usuario (usuario_nombre, usuario_apellido, usuario_email, usuario_tipo, usuario_clave) VALUES ('${body.nombre}', '${body.apellido}', '${body.email}', '${body.tipo}', '${body.clave}')`,
      (err, response, fields) => {
        res
          .status(200)
          .header("Access-Control-Allow-Origin", "*")
          .send(response);
        if (err) res.status(501).send("Error al crear el usuario.");
      }
    );
  } catch (error) {
    res.status(501);
    throw error;
  }
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

app.post("/unidad/crearUnidad", (req, res) => {
  const body = JSON.parse(req.body);
  con.query(
    `INSERT INTO unidad (unidad_nombre, unidad_curso, unidad_orden) VALUES ('${body.unidad_nombre}', '${body.unidad_curso}', '${body.unidad_orden}')`,
    (err, response, fields) => {
      res.header("Access-Control-Allow-Origin", "*").status(200).send(response);
      if (err) res.status(501).send("Error al crear el usuario.");
    }
  );
});

app.post("/leccion/crearLeccion", (req, res) => {
  try {
    const body = JSON.parse(req.body);
    con.query(
      `INSERT INTO leccion (leccion_unidad, leccion_nombre, leccion_contenido) VALUES ('${body.leccion_unidad}', '${body.leccion_nombre}', '${body.leccion_contenido}')`,
      (err, response, fields) => {
        res
          .header("Access-Control-Allow-Origin", "*")
          .status(200)
          .send(response);
        if (err) res.status(501).send("Error al crear el usuario.");
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => console.log("Servidor funcionando en el puerto 8080"));
