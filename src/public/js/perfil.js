const txt_usuario = document.querySelector(
    "#txt_usuario"
);
const txt_correo = document.querySelector(
    "#txt_correo"
);
const txt_nombre_user = document.querySelector("#txt_nombre_user");
const img_perfil = document.querySelector("#img_perfil");

function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

const username = getCookie("username");

const options = {
    method: "GET",
    // url: `http://localhost:3000/api/v1/usuarios/u/${username}`,
    url: `https://crunchy-service.onrender.com/api/v1/usuarios/u/${username}`,
};

axios
    .request(options)
    .then(function (response) {
        const data = response.data.body;
        txt_nombre_user.textContent = `${data.name} ${data.lastName}`;
        txt_usuario.textContent = data.username;
        txt_correo.textContent = data.email;
        img_perfil.src =
            data.photoUrl ||
            "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
    })
    .catch(function (error) {
        console.error(error);
    });
