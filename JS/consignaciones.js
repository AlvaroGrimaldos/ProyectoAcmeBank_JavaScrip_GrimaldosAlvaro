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
            const cuenta = document.getElementById("numeroDeCuenta");
            const nombreint = document.getElementById("nombre");
            localStorage.setItem('saldo', numeroSaldo);

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
  const obligatorio = document.getElementById("obligatorio")

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
        const saldoActual = datosUsuarios.saldo || 0;
        const cantidad = parseInt(valorCantidadConsignacion);
        const saldo = parseInt(saldoActual);
        const nuevoSaldo = saldo + cantidad;
        const referencia = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        const fecha = new Date().toLocaleDateString();
      
        const referenciaTransaccion = push(ref(database, `users/${userId}/transferencias`));

        set(referenciaTransaccion, {
          valor: valorCantidadConsignacion,
          fecha: fecha,
          referencia: referencia,
          tipo_transaccion: "Consignacion",
          descripcion: "Consignacion por canal electronico",
        })

        .then(() => {
          console.log("Consignacion exitosa.")
          //Hacer que se le sume plata el usuraio 
          update(ref(database, `users/${userId}`), {
            saldo: nuevoSaldo
          })
        })
        .then(() => {
          console.log(`Consignacion exitosa. Nuevo saldo: ${nuevoSaldo}`);
          const ref = document.getElementById("ref");
          const date = document.getElementById("date");
          const price = document.getElementById("price");
          const tipo = document.getElementById("tipo");
          const desc = document.getElementById("desc");
          const factura = document.getElementById("contenido")
          factura.classList.replace('facturaInvisible', 'facturaVisible')

          ref.textContent = referencia;
          date.textContent = fecha;
          price.textContent = valorCantidadConsignacion;
          tipo.textContent = "Consignacion";
          desc.textContent = "Consignacion por canal electronico"
        })
        .catch((error) => {
          console.error("Error al consignar:", error);
        });
      } else {
        console.log("Usuario no encontrado.");
      }
    })
    .catch((error) => {
      console.error("Error al obtener el usuario: ", error);
    });
  }
}