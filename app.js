const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

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
      if (err) console.log(err);
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
          .header("Access-Control-Allow-Origin", "*")
          .status(200)
          .send(response);
        if (err) {
          console.log(err);
          res.status(501).send("Error al crear el usuario.");
        }
      }
    );
  } catch (error) {
    res.status(501);
    throw error;
  }
});

app.get("/usuario_aula/obtenerAulasUsuario/:usuario_id", (req, res) => {
  try {
    con.query(
      "SELECT * FROM usuario_aula JOIN aula ON aula_id = usuario_aula_aula WHERE usuario_aula_usuario = " +
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
      `INSERT INTO leccion (leccion_unidad, leccion_nombre, leccion_contenido, leccion_orden) VALUES ('${body.leccion_unidad}', '${body.leccion_nombre}', '${body.leccion_contenido}', '${body.leccion_orden}')`,
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

app.post("/curso/crearCurso", (req, res) => {
  try {
    const body = JSON.parse(req.body);
    con.query(
      `INSERT INTO curso (curso_nombre, curso_descripcion) VALUES ('${body.curso_nombre}', '${body.curso_descripcion}')`,
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

app.post("/leccion/modificarLeccion", (req, res) => {
  try {
    const body = JSON.parse(req.body);
    con.query(
      `UPDATE leccion SET leccion_contenido = '${body.leccion_contenido}' WHERE leccion_id = '${body.leccion_id}'`,
      (err, response, fields) => {
        res.header("Access-Control-Allow-Origin", "*").status(200);
        if (err) res.status(501).send("Error al modificar la leccion.");
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/usuario/obtenerUsuarios", (req, res) => {
  try {
    con.query(
      `SELECT usuario_nombre, usuario_apellido, usuario_email, usuario_tipo FROM usuario `,
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

app.get("/curso/obtenerUsuarios/:cursoId", (req, res) => {
  try {
    con.query(
      `SELECT * FROM usuario_curso JOIN usuario ON usuario_id = usuario_curso_usuario WHERE usuario_curso_curso = ${req.params.cursoId}`,
      (err, response, fields) => {
        res
          .status(200)
          .header("Access-Control-Allow-Origin", "*")
          .send(response);
        if (err) console.log(err);
      }
    );
  } catch (error) {
    res.status(201);
    throw error;
  }
});

app.post("/leccion/completarLeccion", (req, res) => {
  try {
    const body = JSON.parse(req.body);
    con.query(
      `INSERT INTO usuario_leccion (usuario_id, leccion_id) VALUES ('${body.usuario_id}', '${body.leccion_id}')`,
      (err, response, fields) => {
        res
          .header("Access-Control-Allow-Origin", "*")
          .status(200)
          .send(response);
        if (err) console.log(err);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/:table/deleteElementById/:elementId", (req, res) => {
  try {
    con.query(
      `DELETE FROM ${req.params.table} WHERE ${req.params.table}_id = ${req.params.elementId}`,
      (err, response, fields) => {
        res
          .header("Access-Control-Allow-Origin", "*")
          .header("Access-Control-Allow-Credentials", "false")
          .status(200)
          .send("Deleted.");
        if (err) console.log(err);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get(
  "/usuario_curso/desmatricularUsuario/:idUsuario/:idCurso",
  (req, res) => {
    try {
      con.query(
        `DELETE FROM usuario_curso WHERE usuario_curso_usuario = ${req.params.idUsuario} AND usuario_curso_curso = ${req.params.idCurso}`,
        (err, response, fields) => {
          res
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Credentials", "false")
            .status(200)
            .send("Deleted.");
          if (err) console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

/*
{
  curso_id,
  nombre_organizacion,
  fecha_expiracion,
  aula_id
}

*/

app.post("/aula/generateInviteInfo", async (req, res) => {
  try {
    const body = JSON.parse(req.body);
    const hashedSecret = await bcrypt.hash(process.env.TOKEN_SECRET, 5);
    body["token"] = await bcrypt.hash(req.body + hashedSecret, 10);
    const base64 = btoa(JSON.stringify(body));
    res.status(200).send(base64);
  } catch (error) {
    console.log(error);
  }
});

app.post("/aula/crearAula", async (req, res) => {
  try {
    const body = JSON.parse(req.body);
    con.query(
      `INSERT INTO aula (aula_nombre, aula_descripcion, aula_curso, aula_inicio) VALUES ('${body.aula_nombre}', '${body.aula_descripcion}', '${body.aula_curso}', '${body.aula_inicio}')`,
      (err, response, fields) => {
        if (err) {
          res
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Credentials", "false")
            .status(501)
            .send("Error: " + err);
          console.log(err);
        } else {
          res
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Credentials", "false")
            .status(200)
            .send("Created.");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.post("/aula/crearAula", async (req, res) => {
  try {
    const jsonBodyString = atob(req.body);
    const bodyObj = JSON.parse(jsonBodyString);
    const providedToken = bodyObj["token"];
    delete bodyObj["token"];
    const hashedSecret = await bcrypt.hash(process.env.TOKEN_SECRET, 5);
    const tokenIsCorrect = await bcrypt.compare(
      jsonBodyString + hashedSecret,
      providedToken
    );
    if (
      tokenIsCorrect &&
      new Date(bodyObj.fecha_expiracion).getTime() >= new Date().getTime()
    )
      res.status(200).send("Token is valid.");
    else res.status(401).send("Token is not valid.");
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => console.log("Servidor funcionando en el puerto 8080"));
