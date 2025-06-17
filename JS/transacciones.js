import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const datosGuardados = localStorage.getItem("usuario");
const usuario = JSON.parse(datosGuardados);

async function obtenerUsuarioPorDocumento(numeroBuscado) {
  const dbRef = ref(getDatabase());

  try {
    const snapshot = await get(child(dbRef, "users"));

    if (snapshot.exists()) {
      let usuarioEncontrado = null;
      let userId = null;

      snapshot.forEach(childSnapshot => {
        const datos = childSnapshot.val();
        if (datos.numero_documento == numeroBuscado) {
          usuarioEncontrado = datos;
          userId = childSnapshot.key;
          localStorage.setItem("userId", userId);
        }
      });

      if (usuarioEncontrado) {
        console.log("Usuario encontrado:", usuarioEncontrado);
        mostrarUltimasTransacciones(userId);
      } else {
        console.log("Usuario no encontrado.");
      }
    } else {
      console.log("No hay usuarios.");
    }
  } catch (error) {
    console.error("Error al consultar usuario:", error);
  }
}

async function mostrarUltimasTransacciones(userId) {
  const db = getDatabase();
  const transferenciasRef = ref(db, `users/${userId}/transferencias`);
  const snapshot = await get(transferenciasRef);
  console.log(userId);

  if (snapshot.exists()) {
    const transferencias = snapshot.val();

    // Convertir a arreglo y ordenarlas por fecha de creación (clave timestamp o por campo fecha)
    const lista = Object.entries(transferencias)
      .map(([id, t]) => ({ id, ...t }))
      .sort((a, b) => {
        // Orden por fecha (dd/mm/yyyy)
        const [dA, mA, yA] = a.fecha.split("/").map(Number);
        const [dB, mB, yB] = b.fecha.split("/").map(Number);
        return new Date(yB, mB - 1, dB) - new Date(yA, mA - 1, dA); // Más recientes primero
      })
      .slice(0, 10); // Últimos 10

    // Crear tabla
    const contenedor = document.getElementById("container");
    const tabla = document.createElement("table");
    const head = document.createElement("thead");
    const body = document.createElement("tbody");

    const filaEncabezado = document.createElement("tr");
    const columnas = ["Fecha", "Referencia", "Tipo", "Descripcion", "Valor"];
    columnas.forEach(columna => {
      const th = document.createElement("th");
      th.textContent = columna;
      filaEncabezado.appendChild(th);
    });

    head.appendChild(filaEncabezado);
    tabla.appendChild(head);
    tabla.appendChild(body);

    lista.forEach(transaccion => {
      const fila = document.createElement("tr");

      ["fecha", "referencia", "tipo_transaccion", "descripcion", "valor"].forEach(campo => {
        const celda = document.createElement("td");
        celda.textContent = transaccion[campo] || "-";
        fila.appendChild(celda);
      });

      body.appendChild(fila);
    });

    contenedor.appendChild(tabla);
  } else {
    console.log("No hay transferencias registradas.");
  }
}

// Ejecutar todo
obtenerUsuarioPorDocumento(usuario.numeroDocumento);