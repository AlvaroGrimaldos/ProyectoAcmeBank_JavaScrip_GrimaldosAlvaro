import { getDatabase, ref, set } from "firebase/database";

// Función para escribir datos de un usuario
function escribirDatosUsuario(userId, nombre, email, urlImagen) {
  // 1. Obtener una instancia de la base de datos
  const db = getDatabase();

  // 2. Crear una referencia al lugar donde quieres guardar los datos.
  //    Aquí estamos creando una referencia a la ruta 'users/ID_DEL_USUARIO'
  const referenciaUsuario = ref(db, 'users/' + userId);

  // 3. Usar el método 'set' para guardar los datos en esa referencia.
  //    El método 'set' sobrescribe cualquier dato que ya exista en esa ubicación.
  set(referenciaUsuario, {
    nombreUsuario: nombre,
    correoElectronico: email,
    url_foto_perfil : urlImagen
  })
  .then(() => {
    // ¡Datos guardados exitosamente! 🎉
    console.log("Datos de usuario guardados correctamente.");
  })
  .catch((error) => {
    // ¡Algo salió mal! 😥
    console.error("Error al guardar los datos de usuario:", error);
  });
}

// --- ¡Ejemplo de cómo llamar la función! ---
// Llama a esta función cuando quieras guardar datos, por ejemplo,
// después de que un usuario se registre o actualice su perfil.
// Reemplaza '123', 'Alice', 'alice@example.com' y la URL con datos reales.
// escribirDatosUsuario('123', 'Alice', 'alice@example.com', 'https://ejemplo.com/foto.jpg');