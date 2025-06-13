import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

window.iniciarSesion = async function() {
    const tipoDocumento = document.getElementById("documento");
    const valorTipoDocumento = tipoDocumento.value;
    const numeroDocumento = document.getElementById("inputNumeroDocumento");
    const valorNumeroDocumento = numeroDocumento.value;
    const contraseña = document.getElementById("inputContraseña");
    const valorContraseña = contraseña.value;
    const obligatorio = document.getElementById("obligatorio");
    const invalido = document.getElementById("invalido");
    const noUser = document.getElementById("noUser");

    if(!valorTipoDocumento.trim() || !valorNumeroDocumento.trim() || !valorContraseña.trim()) {
        obligatorio.classList.replace('invisible', 'visible')
        return false;
    }

    obligatorio.classList.replace('visible', 'invisible');
    // alert("Todo exitoso");

    const app = window.firebaseApp;
    const database = getDatabase(app);
    const dbRef = ref(database);
    
    try {
        const snapshot = await get(child(dbRef, "users"));
        if(snapshot.exists()) {
            let acceso = false;

            snapshot.forEach(childSnapshot => {
                const datos = childSnapshot.val();
                if(datos.tipo_documento === valorTipoDocumento && datos.numero_documento === valorNumeroDocumento && datos.contraseña === valorContraseña) {
                    acceso = true;
                }
            });
            if (acceso) {
                const usuario = {
                    numeroDocumento: valorNumeroDocumento,
                    contraseña: valorContraseña,
                    tipoDocumento: valorTipoDocumento
                };
                localStorage.setItem("usuario", JSON.stringify(usuario));
                window.location.href = "dashboard.html";
            }else {
                invalido.classList.replace('invisible', 'visible')
            }
        }else {
            noUser.classList.replace('invisible', 'visible')
        }
    } catch(error){
        console.error(error);
    }
}