const carta = document.querySelector("#carta");

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
        const platillos = response.data.body.platillos;

        platillos.map((platillo) => {
            const options = {
                method: "GET",
                url: `https://crunchy-service.onrender.com/api/v1/platillos/${platillo.id}`,
            };

            axios
                .request(options)
                .then(function (response) {
                    const platillo_data = response.data.body;
                    const item = document.createRange()
                        .createContextualFragment(`<div class="item_comida">
                <a href="/detalles/${platillo.id}">
                    <img class="img_comida_item" id="img_comida_carta" src="${platillo_data.photoUrl}"></img>
                </a>
                <div class="fondo_item_comida">
                    <span id="txt_nombre_item">${platillo_data.name}</span>
                </div>
            </div>`);
                    carta.append(item);
                })

                .catch(function (error) {
                    console.error(error);
                });
        });
    })
    .catch(function (error) {
        console.error(error);
    });
