import { getDatabase, ref, set, get, child, update, push } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const datosGuardados = localStorage.getItem("usuario");

const usuario = JSON.parse(datosGuardados);




async function obtenerUsuarioPorDocumento(numeroBuscado) {
    const dbRef = ref(getDatabase());
  
    try {
      const snapshot = await get(child(dbRef, "users"));
  
      if (snapshot.exists()) {
        let usuarioEncontrado = null;
  
        snapshot.forEach(childSnapshot => {
          const datos = childSnapshot.val();
          if (datos.numero_documento == numeroBuscado) {
            usuarioEncontrado = datos;
            localStorage.setItem('userId', childSnapshot.key);
          }
        });

        if (usuarioEncontrado) {
            console.log("Usuario encontrado:", usuarioEncontrado);
            // Aquí puedes usar los atributos:
            const ciudad = usuarioEncontrado.ciudad;
            const correo = usuarioEncontrado.correo_electronico;
            const nombre = usuarioEncontrado.nombres;
            const apellido = usuarioEncontrado.apellidos;
            const telefono = usuarioEncontrado.telefono;
            const numeroCuenta = usuarioEncontrado.numero_cuenta;
            const numeroSaldo = usuarioEncontrado.saldo;
            const cuenta = document.getElementById("numeroCuenta");
            const nombreint = document.getElementById("nombre");
            localStorage.setItem('saldo', numeroSaldo);

            cuenta.textContent = numeroCuenta;
            nombreint.textContent = nombre + " " + apellido;
    
            // return usuarioEncontrado;
          } else {
            console.log("Usuario no encontrado.");
            return null;
          }
        } else {
          console.log("No hay usuarios en la base de datos.");
          return null;
        }
    } catch (error) {
        console.error("Error consultando usuario:", error);
        return null;
    }
}

obtenerUsuarioPorDocumento(usuario.numeroDocumento);

const contenedor = document.getElementById("container");

const tabla = document.createElement("table");
const head = document.createElement("thead");
const body = document.createElement("tbody");

const filaEncabezado = document.createElement("tr");
const columnas = ["Fecha", "Referencia", "Tipo", "Descripcion", "Valor"];
columnas.forEach(columna => {
    const th = document.createElement("th");
    th.textContent = columna;
    filaEncabezado.appendChild(th)
})

head.appendChild(filaEncabezado);
tabla.appendChild(head);
tabla.appendChild(body);

contenedor.appendChild(tabla);


window.generarExtracto = function(){
  const mes = document.getElementById("inputMes");
  const valorMes = mes.value;
  const año = document.getElementById("inputAño");
  const valorAño = año.value;

  if (!valorMes.trim() || !valorAño.trim()) {
    obligatorio.classList.replace('invisible', 'visible')
    return false;
  }else {
    obligatorio.classList.replace('visible', 'invisible');

    const app = window.firebaseApp;
    const database = getDatabase(app);
    const userId = localStorage.getItem('userId');
    const dbRef = ref(database);
    

    get(child(dbRef, `users/${userId}/transferencias`)).then((snapshot) => {

      if (snapshot.exists()) {
        const transferencias = snapshot.val();
        body.innerHTML = "";

        Object.entries(transferencias).forEach(([id, transaccion]) => {
          const [dia,mesTransferencia, añoTransferencia] = transaccion.fecha.split("/");

          if(mesTransferencia === valorMes && añoTransferencia === valorAño) {
            const fila = document.createElement("tr");

            const fecha = document.createElement("td");
            fecha.textContent = transaccion.fecha;

            const referencia = document.createElement("td");
            referencia.textContent = transaccion.referencia;

            const tipo = document.createElement("td");
            tipo.textContent = transaccion.tipo_transaccion;

            const descripcion = document.createElement("td");
            descripcion.textContent = transaccion.descripcion;

            const valor = document.createElement("td");
            valor.textContent = transaccion.valor;

            fila.appendChild(fecha);
            fila.appendChild(referencia);
            fila.appendChild(tipo);
            fila.appendChild(descripcion);
            fila.appendChild(valor);

            body.appendChild(fila);
          }else {
            console.log("No hay transferencias registradas")
            const nohay = document.getElementById("noHay")
            nohay.classList.replace('invisible', 'visible')
          }
        }).catch((error) => {
          console.error("Error al obtener transferencias:", error);
        })
      }
    })
  }
}