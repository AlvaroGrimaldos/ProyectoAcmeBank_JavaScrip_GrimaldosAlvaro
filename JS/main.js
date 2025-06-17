import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

async function encriptarContraseña(texto) {
  const encoder = new TextEncoder();
  const data = encoder.encode(texto);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

window.iniciarSesion = async function() {
    const tipoDocumento = document.getElementById("documento").value.trim();
    const numeroDocumento = document.getElementById("inputNumeroDocumento").value.trim();
    const contraseña = document.getElementById("inputContraseña").value.trim();
    const obligatorio = document.getElementById("obligatorio");
    const invalido = document.getElementById("invalido");
    const noUser = document.getElementById("noUser");

    if (!tipoDocumento || !numeroDocumento || !contraseña) {
        obligatorio.classList.replace('invisible', 'visible');
        return;
    }

    obligatorio.classList.replace('visible', 'invisible');

    const app = window.firebaseApp;
    const database = getDatabase(app);
    const dbRef = ref(database);

    try {
        const snapshot = await get(child(dbRef, "users"));
        if (snapshot.exists()) {
            let usuarioEncontrado = null;

            // Buscar solo al usuario con ese documento y tipo
            snapshot.forEach(childSnapshot => {
                const datos = childSnapshot.val();
                if (
                    datos.tipo_documento === tipoDocumento &&
                    datos.numero_documento === numeroDocumento
                ) {
                    usuarioEncontrado = datos;
                }
            });

            if (usuarioEncontrado) {
                const hashIngresado = await encriptarContraseña(contraseña);
                if (hashIngresado === usuarioEncontrado.contraseña) {
                    // Acceso permitido
                    const usuario = {
                        numeroDocumento: numeroDocumento,
                        contraseña: hashIngresado,
                        tipoDocumento: tipoDocumento
                    };
                    localStorage.setItem("usuario", JSON.stringify(usuario));
                    window.location.href = "dashboard.html";
                } else {
                    // Contraseña incorrecta
                    invalido.classList.replace('invisible', 'visible');
                }
            } else {
                // Usuario no existe
                noUser.classList.replace('invisible', 'visible');
            }
        } else {
            // No hay usuarios
            noUser.classList.replace('invisible', 'visible');
        }
    } catch (error) {
        console.error(error);
    }
};
