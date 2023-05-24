const inp_busqueda = document.querySelector("#inp_busqueda");
const opciones_busqueda = document.querySelector("#opciones_busqueda");

inp_busqueda.addEventListener("input", () => {
    const options = {
        method: "GET",
        url: "https://crunchy-service.onrender.com/api/v1/platillos/search",
        params: { q: inp_busqueda.value },
    };

    axios
        .request(options)
        .then(function (response) {
            opciones_busqueda.innerHTML = "";

            const platillos = response.data.body;
            platillos.map((platillo) => {
                const item = document.createRange()
                    .createContextualFragment(`<div class="item_comida">
                    <a href="/detalles/${platillo.id}">
                        <img class="img_comida_item" id="img_comida_carta" src="${platillo.photoUrl}"></img>
                    </a>
                    <div class="fondo_item_comida">
                        <span id="txt_nombre_item">${platillo.name}</span>
                    </div>
                </div>`);
                opciones_busqueda.append(item);
            });
        })
        .catch(function (error) {
            console.error(error);
        });
});
