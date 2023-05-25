const txt_nombre = document.querySelector("#txt_nombre");
const txt_local = document.querySelector("#txt_local");
const btn_dislike = document.querySelector("#btn_dislike");
const btn_like = document.querySelector("#btn_like");
const img_comida = document.querySelector("#img_comida");

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
console.log(username);

(async () => {
    const userData = await axios.request({
        method: "GET",
        url: `https://crunchy-service.onrender.com/api/v1/usuarios/u/${username}`,
    });

    const userId = userData.data.body.id;

    const platillosData = await axios.request({
        method: "GET",
        url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/recommendations`,
    });

    const platillos = platillosData.data.body;
    let platillo = platillos.shift();
    display_new_platillo(platillo);

    btn_like.addEventListener("click", async () => {
        btn_like.disabled = true;
        await axios.request({
            method: "POST",
            url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/platillos/vistos`,
            headers: { "Content-Type": "application/json" },
            data: { platilloId: platillo.id },
        });
        await axios.request({
            method: "POST",
            url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/platillos`,
            headers: { "Content-Type": "application/json" },
            data: { platilloId: platillo.id },
        });
        platillo = platillos.shift();
        display_new_platillo(platillo);
        btn_like.disabled = false;
    });

    btn_dislike.addEventListener("click", async () => {
        btn_dislike.disabled = true;
        await axios.request({
            method: "POST",
            url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/platillos/vistos`,
            headers: { "Content-Type": "application/json" },
            data: { platilloId: platillo.id },
        });
        platillo = platillos.shift();
        display_new_platillo(platillo);
        btn_dislike.disabled = false;
    });
})();

function display_new_platillo(platillo) {
    txt_nombre.textContent = platillo.name;
    txt_local.textContent = platillo.local.name;
    img_comida.src = platillo.photoUrl;
}
