import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// Función para escribir datos de un usuario
window.crearCuenta = function() {
  const tipoDocumento = document.getElementById("inputDocumento");
  const valorTipoDocumento = tipoDocumento.value;
  const numeroDocumento = document.getElementById("inputNumeroDocumento");
  const valorNumeroDocumento = numeroDocumento.value;
  const nombres = document.getElementById("inputNombre");
  const valorNombres = nombres.value;
  const apellidos = document.getElementById("inputApellidos");
  const valorApellidos = apellidos.value;
  const tipoGenero = document.getElementById("genero");
  const valorGenero = tipoGenero.value;
  const telefono = document.getElementById("inputTelefono");
  const valorTelefono = telefono.value;
  const correo = document.getElementById("inputCorreo");
  const valorCorreo = correo.value;
  const ciudad = document.getElementById("inputCiudad");
  const valorCiudad = ciudad.value;
  const direccion = document.getElementById("inputDireccion");
  const valorDireccion = direccion.value;
  const contraseña = document.getElementById("inputContraseña");
  const valorContraseña = contraseña.value;
  const obligatorio = document.getElementById("obligatorio");

  if (!valorTipoDocumento.trim() || !valorNumeroDocumento.trim() || !valorContraseña.trim() || !valorNombres.trim() || !valorApellidos.trim() || !valorGenero.trim() || !valorTelefono.trim() || !valorCorreo.trim() || !valorCiudad.trim() || !valorDireccion.trim()) {
    obligatorio.classList.replace('invisible', 'visible')
    return false;
  }else {
    obligatorio.classList.replace('visible', 'invisible');
  // alert("Todo exitoso");
    
    // 1. Obtener una instancia de la base de datos
    const app = window.firebaseApp;
    const database = getDatabase(app);

    // 2. Crear una referencia al lugar donde quieres guardar los datos.
    //    Aquí estamos creando una referencia a la ruta 'users/ID_DEL_USUARIO'
    const dbRef = ref(database);
    get(child(dbRef, 'users')).then((snapshot) => {
      let nuevoId = 1; // Por defecto, si no hay usuarios
    
      if (snapshot.exists()) {
        const datosUsuarios = snapshot.val();
        const ids = Object.keys(datosUsuarios).map(id => parseInt(id));
        const maxId = Math.max(...ids);
        nuevoId = maxId + 1;
      }
      const referenciaUsuario = ref(database, 'users/' + nuevoId);

      // 3. Usar el método 'set' para guardar los datos en esa referencia.
      //    El método 'set' sobrescribe cualquier dato que ya exista en esa ubicación.
      set(referenciaUsuario, {
        tipo_documento: valorTipoDocumento,
        numero_documento: valorNumeroDocumento,
        nombres: valorNombres,
        apellidos: valorApellidos,
        genero: valorGenero,
        telefono: valorTelefono,
        correo_electronico: valorCorreo,
        ciudad: valorCiudad,
        direccion: valorDireccion,
        contraseña: valorContraseña,
      })

      window.location.href = "index.html"
      .then(() => {
        // ¡Datos guardados exitosamente! 🎉
        console.log("Datos de usuario guardados correctamente.");
      })
      .catch((error) => {
        // ¡Algo salió mal! 😥
        console.error("Error al guardar los datos de usuario:", error);
      });
    });
  }
  
  
}
