import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

window.verificar = async function() {
    const tipoDocumento = document.getElementById("documento");
    const valorTipoDocumento = tipoDocumento.value;
    const numeroDocumento = document.getElementById("inputNumeroDocumento");
    const valorNumeroDocumento = numeroDocumento.value;
    const correo = document.getElementById("inputCorreo")
    const valorCorreo = correo.value;
    const obligatorio = document.getElementById("obligatorio");
    const invalido =document.getElementById("invalido");
    const noUser = document.getElementById("noUser");

    if(!valorTipoDocumento.trim() || !valorNumeroDocumento.trim() || !valorCorreo.trim()) {
        obligatorio.classList.replace('invisible', 'visible')
        return false;
    }

    obligatorio.classList.replace('visible', 'invisible');
    
    const app = window.firebaseApp;
    const database = getDatabase(app);
    const dbRef = ref(database);

    try {
        const snapshot = await get(child(dbRef, "users"));
        if(snapshot.exists()) {
            let acceso = false;

            snapshot.forEach(childSnapshot => {
                const datos = childSnapshot.val();
                if(datos.tipo_documento === valorTipoDocumento && datos.numero_documento === valorNumeroDocumento && datos.correo_electronico === valorCorreo) {
                    acceso = true;
                }
            });
            if (acceso) {
                localStorage.setItem('numeroDocumento', valorNumeroDocumento);
                window.location.href = "cambioContraseña.html";
            }else {
                invalido.classList.replace('invisible', 'visible')
                noUser.classList.replace('visible', 'invisible')
            }
        }else {
            noUser.classList.replace('invisible', 'visible')
            invalido.classList.replace('visible', 'invisible')
        }
    } catch(error){
        console.error(error);
    }
}