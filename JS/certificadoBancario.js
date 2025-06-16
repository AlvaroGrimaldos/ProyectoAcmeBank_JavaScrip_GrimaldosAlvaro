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
            const telefono = usuarioEncontrado.telefono;
            const numeroCuenta = usuarioEncontrado.numero_cuenta;
            const numeroSaldo = usuarioEncontrado.saldo;
            const fecha = usuarioEncontrado.fecha;
            const tipoDocumento = usuarioEncontrado.tipo_documento;
            const fechaCert = new Date().toLocaleDateString();
            const numeroDocumento = usuarioEncontrado.numero_documento;
            const ciudadCer = document.getElementById("spanCiudad");
            const fechaCer = document.getElementById("spanFecha");
            const nombreCer = document.getElementById("nombre");
            const tipoDocumentoCer = document.getElementById("tipoDocumento");
            const numeroDocumentoCer = document.getElementById("numeroDocumento");
            const numeroCuentaTabla = document.getElementById("numeroCuentaTabla");
            const fechaApertura = document.getElementById("fechaApertura");
            
            ciudadCer.textContent = ciudad;
            fechaCer.textContent = fechaCert;
            nombreCer.textContent = nombre;
            tipoDocumentoCer.textContent = tipoDocumento;
            numeroDocumentoCer.textContent = numeroDocumento;
            numeroCuentaTabla.textContent = numeroCuenta;
            fechaApertura.textContent = fecha;

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