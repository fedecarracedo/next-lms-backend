async function makeReq() {
  const response = await fetch(
    "http://localhost:8080/curso/generateInviteLink",
    {
      method: "POST",
      body: JSON.stringify({
        curso_id: 2,
        organizacion: "FOSIS",
        fecha_expiracion: new Date(2024, 1, 17),
        aula: 32,
      }),
    }
  );
  const responseText = await response.text();
  const info = atob(responseText);

  console.log(info);
  const validToken = await fetch(
    "http://localhost:8080/curso/validateInviteLink",
    {
      method: "POST",
      body: info,
    }
  )
    .then((response) => response.text())
    .then((responseText) => console.log(responseText));
}

makeReq();
