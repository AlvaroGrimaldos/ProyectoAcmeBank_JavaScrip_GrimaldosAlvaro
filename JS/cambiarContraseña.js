import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

async function encriptarContraseña(texto) {
  const encoder = new TextEncoder();
  const data = encoder.encode(texto);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

window.cambiarContraseña = async function() {
    const contraseña = document.getElementById("inputContraseña");
    const valorContraseña = contraseña.value;
    const obligatorio = document.getElementById("obligatorio");
    const valorNumeroDocumento = localStorage.getItem('numeroDocumento');
    const exito = document.getElementById("exito");

    if(!valorContraseña.trim()) {
        obligatorio.classList.replace('invisible', 'visible')
        return false;
    }

    obligatorio.classList.replace('visible', 'invisible');

    const app = window.firebaseApp;
    const database = getDatabase(app);
    const dbRef = ref(database);

    try {
        const snapshot = await get(child(dbRef, "users"));
        let userId = null;

        if(snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
                const datos = childSnapshot.val();
                if(datos.numero_documento === valorNumeroDocumento) {
                    userId = childSnapshot.key;
                }
            });
            if (userId) {
                const userRef = ref(database, `users/${userId}`);
                encriptarContraseña(valorContraseña).then(hash => {
                    set(userRef, {
                    ...snapshot.val()[userId],
                    contraseña: hash
                    });
                })
                
                exito.classList.replace('invisible', 'visible');
                setTimeout(() => {
                    window.location.href = "index.html";
                },2000);

                localStorage.removeItem('numeroDocumento')
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