const img_match = document.querySelector("#img_match");
const txt_nombre_match = document.querySelector("#txt_nombre_match");
const txt_local_match = document.querySelector("#txt_local_match");
const txt_ingredientes_match = document.querySelector(
    "#txt_ingredientes_match"
);
const txt_precio_match = document.querySelector("#txt_precio_match");
const btn_ordenar = document.querySelector("#btn_ordenar");

const url = window.location.href;
const platilloId = url.split("/").pop();

const options = {
    method: "GET",
    url: "https://crunchy-service.onrender.com/api/v1/platillos/" + platilloId,
};

axios
    .request(options)
    .then(function (response) {
        const platillo = response.data.body;
        img_match.src = platillo.photoUrl;
        txt_nombre_match.textContent = platillo.name;
        txt_local_match.textContent = platillo.local.name;
        txt_ingredientes_match.textContent = platillo.description;
        txt_precio_match.textContent = `$ ${platillo.price}.00`;
    })
    .catch(function (error) {
        console.error(error);
    });

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

(async () => {
    const userData = await axios.request({
        method: "GET",
        url: `https://crunchy-service.onrender.com/api/v1/usuarios/u/${username}`,
    });

    const userId = userData.data.body.id;

    btn_ordenar.addEventListener("click", async () => {
        btn_ordenar.disabled = true;
        const pedidoData = await axios.request({
            method: "GET",
            url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/pedidos/last`,
        });

        const pedidoId = pedidoData.data.body.id;

        await axios.request({
            method: "POST",
            url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/pedidos/${pedidoId}/platillos`,
            headers: { "Content-Type": "application/json" },
            data: { platilloId },
        });
        btn_ordenar.disabled = false;
    });
})();
