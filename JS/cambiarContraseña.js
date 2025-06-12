import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

window.verificar = function() {
    const tipoDocumento = document.getElementById("documento");
    const valorTipoDocumento = tipoDocumento.value;
    const numeroDocumento = document.getElementById("inputNumeroDocumento");
    const valorNumeroDocumento = numeroDocumento.value;
    const correo = document.getElementById("inputCorreo")
    const valorCorreo = correo.value;

    if(!valorTipoDocumento.trim() || !valorNumeroDocumento.trim() || !valorCorreo.trim()) {
        obligatorio.classList.replace('invisible', 'visible')
        return false;
    }

    obligatorio.classList.replace('visible', 'invisible');
    
    
}