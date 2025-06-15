import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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
            const cuenta = document.getElementById("numeroDeCuenta");
            const nombreint = document.getElementById("nombre");

            cuenta.textContent = numeroCuenta;
            nombreint.textContent = nombre;
    
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

window.consignar = function() {
  const cantidadConsignacion = document.getElementById("cantidadConsignar");
  const valorCantidadConsignacion = cantidadConsignacion.value;

  if (!valorCantidadConsignacion.trim()) {
    obligatorio.classList.replace('invisible', 'visible')
    return false;
  }else {
    obligatorio.classList.replace('visible', 'invisible');

    // 1. Obtener una instancia de la base de datos
    const app = window.firebaseApp;
    const database = getDatabase(app);
    const userId = localStorage.getItem('userId');

    const dbRef = ref(database);

    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      let nuevoId = 1;

      if (snapshot.exists()) {
        const datosUsuarios = snapshot.val();
        const ids = Object.keys(datosUsuarios).map(id => parseInt(id));
        const maxId = Math.max(...ids);
      }
      const referenciaTransaccion = ref(database, `users/${userId}/transferencias`, nuevoId);

      set(referenciaTransaccion, {
        valor: valorCantidadConsignacion,
        fecha: new Date().toLocaleDateString(),
        referencia: Math.floor(Math.random() * (999999 - 100000 + 1)) + min,
        tipo_transaccion: "Consignacion",
        descripciom: "Consignacion por canal electronico",
      })

      .then(() => {
        console.log("Consignacion exitosa.")
        //Hacer que se le sume plata el usuraio 
      })
    })
  }
}