function iniciarSesion() {
    const tipoDocumento = document.getElementById("documento");
    const valorTipoDocumento = tipoDocumento.value;
    const numeroDocumento = document.getElementById("inputNumeroDocumento");
    const valorNumeroDocumento = numeroDocumento.value;
    const contraseña = document.getElementById("inputContraseña");
    const valorContraseña = contraseña.value;
    const obligatorio = document.getElementById("obligatorio")

    if(!valorTipoDocumento.trim() || !valorNumeroDocumento.trim() || !valorContraseña.trim()) {
        obligatorio.classList.replace('invisible', 'visible')
        return false;
    }

    obligatorio.classList.replace('visible', 'invisible');
    // alert("Todo exitoso");
    return true;
}