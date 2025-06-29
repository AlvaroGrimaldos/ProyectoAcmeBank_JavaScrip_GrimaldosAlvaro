import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";


const datosGuardados = localStorage.getItem("usuario");


const usuario = JSON.parse(datosGuardados); // convertimos a objeto


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
          }
        });

        if (usuarioEncontrado) {
            console.log("Usuario encontrado:", usuarioEncontrado);
            // Aquí puedes usar los atributos:
            const ciudad = usuarioEncontrado.ciudad;
            const correo = usuarioEncontrado.correo_electronico;
            const nombre = usuarioEncontrado.nombres;
            const telefono = usuarioEncontrado.telefono;
            const numeroCuenta = usuarioEncontrado.numero_cuenta;
            const numeroSaldo = usuarioEncontrado.saldo;
            const fecha = usuarioEncontrado.fecha;
            const saludo = document.getElementById("Saludo");
            const ciudadint = document.getElementById("ciudad");
            const correoint = document.getElementById("correo");
            const telefonoint = document.getElementById("telefono");
            const fechaCreacionint = document.getElementById("fechaCreacion");
            const numeroCuentaint = document.getElementById("numeroCuenta");
            const numeroSaldoint = document.getElementById("numeroSaldo");

            saludo.textContent = `Hola, ${nombre}`;
            ciudadint.textContent = ciudad;
            correoint.textContent = correo;
            telefonoint.textContent = telefono;
            numeroCuentaint.textContent = numeroCuenta;
            numeroSaldoint.textContent = numeroSaldo;
            fechaCreacionint.textContent = fecha;
    
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
const cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click", e => {
    localStorage.clear();
})

window.transacciones = function() {
  window.location.href = "transacciones.html";
}

window.consignar = function() {
  window.location.href = "consignaciones.html"
}

window.retirar = function() {
  window.location.href = "retirar.html"
}

window.serviciosPublicos = function() {
  window.location.href = "serviciosPublicos.html"
}

window.extractoBancario = function() {
  window.location.href = "extractoBancario.html"
}

window.certificadoBancario = function() {
  window.location.href = "certificadoBancario.html"
}