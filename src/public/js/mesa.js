const contenedorMesa = document.querySelector("#mesa");
const btn_cancelar = document.getElementById("btn_si");
const btn_o = document.getElementById("btn_cancelar");
const btn_ordenar = document.getElementById("btn_ordenar");
const inp_direccion = document.querySelector("#inp_direccion");
const no = document.getElementById("btn_no");

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

    let pedidoData = await axios.request({
        method: "GET",
        url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/pedidos/last`,
    });

    const pedidoId = pedidoData.data.body.id;

    let platillos = [];

    btn_o.addEventListener("click", () => {
        if (!platillos.length) alert("Order is empty");
        else {
            cancelar_pedido.style.display = "flex";
            fondo.style.display = "flex";
        }
    });

    no.addEventListener("click", (event) => {
        cancelar_pedido.style.display = "none";
        fondo.style.display = "none";
    });

    btn_cancelar.addEventListener("click", async () => {
        btn_cancelar.disable = true;
        if (!platillos.length) alert("Order is empty");
        else {
            exito.style.display = "flex";
            fondo.style.display = "flex";
            await axios.request({
                method: "DELETE",
                url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/pedidos/${pedidoId}`,
            });
            setTimeout(() => {
                orden_hecha.style.display = "none";
                fondo.style.display = "none";
                window.location.href = "/";
            }, 2500);
        }
        btn_cancelar.disable = false;
    });

    btn_ordenar.addEventListener("click", async () => {
        btn_ordenar.disable = true;
        if (!platillos.length) alert("Order is empty");
        else if (!inp_direccion.value) alert("Complete fields!");
        else {
            orden_hecha.style.display = "flex";
            fondo.style.display = "flex";
            await axios.request({
                method: "PATCH",
                url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/pedidos/${pedidoId}`,
                headers: { "Content-Type": "application/json" },
                data: { state: "entregado" },
            });
            setTimeout(() => {
                orden_hecha.style.display = "none";
                fondo.style.display = "none";
                window.location.href = "/";
            }, 2500);
        }
        btn_ordenar.disable = false;
    });

    const displayPlatillos = async () => {
        contenedorMesa.innerHTML = "";
        pedidoData = await axios.request({
            method: "GET",
            url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/pedidos/last`,
        });
        platillos = pedidoData.data.body.platillos;

        platillos.forEach((platillo) => {
            // Crear los elementos del item de la mesa
            const nuevoItem = document.createElement("div");
            nuevoItem.classList.add("item_mesa");

            const itemPedido = document.createElement("div");
            itemPedido.classList.add("item_pedido");

            const platilloImagen = document.createElement("div");
            platilloImagen.classList.add("platillo_imagen");

            const imgPlatillo = document.createElement("img");
            imgPlatillo.setAttribute("id", "img_platillo");
            imgPlatillo.setAttribute("src", platillo.photoUrl);

            const platilloDatos = document.createElement("div");
            platilloDatos.classList.add("platillo_datos");

            const txtNombre = document.createElement("span");
            txtNombre.setAttribute("id", "txt_nombre");
            txtNombre.textContent = platillo.name;

            const txtPrecio = document.createElement("p");
            txtPrecio.setAttribute("id", "txt_precio");
            txtPrecio.innerHTML = `$<span>${platillo.subtotal}</span>`;

            const platilloOpciones = document.createElement("div");
            platilloOpciones.classList.add("platillo_opciones");

            const btnCerrar = document.createElement("button");
            btnCerrar.setAttribute("id", "btn_cerrar");

            const imgCerrar = document.createElement("img");
            imgCerrar.setAttribute("id", "img_cerrar");
            imgCerrar.setAttribute("src", "/assets/eliminar.svg");

            const cantidad = document.createElement("div");
            cantidad.classList.add("cantidad");

            const btnMenos = document.createElement("button");
            btnMenos.classList.add("btn_cantidad");
            btnMenos.setAttribute("id", "btn_menos");

            const imgMenos = document.createElement("img");
            imgMenos.setAttribute("id", "img_menos");
            imgMenos.setAttribute("src", "/assets/menos.svg");

            const txtTotal = document.createElement("span");
            txtTotal.setAttribute("id", "txt_total");
            txtTotal.textContent = platillo.amount;

            const btnMas = document.createElement("button");
            btnMas.classList.add("btn_cantidad");
            btnMas.setAttribute("id", "btn_mas");

            const imgMas = document.createElement("img");
            imgMas.setAttribute("id", "img_mas");
            imgMas.setAttribute("src", "/assets/mas.svg");

            // Agregar los elementos al árbol del DOM
            btnCerrar.appendChild(imgCerrar);
            btnMenos.appendChild(imgMenos);
            btnMas.appendChild(imgMas);

            cantidad.appendChild(btnMenos);
            cantidad.appendChild(txtTotal);
            cantidad.appendChild(btnMas);

            platilloOpciones.appendChild(btnCerrar);
            platilloOpciones.appendChild(cantidad);

            platilloDatos.appendChild(txtNombre);
            platilloDatos.appendChild(txtPrecio);

            platilloImagen.appendChild(imgPlatillo);

            itemPedido.appendChild(platilloImagen);
            itemPedido.appendChild(platilloDatos);
            itemPedido.appendChild(platilloOpciones);

            nuevoItem.appendChild(itemPedido);

            contenedorMesa.appendChild(nuevoItem);

            // Agregar logs a los botones cuando son presionados
            btnCerrar.addEventListener("click", async () => {
                btnCerrar.disabled = true;
                console.log("Botón Cerrar presionado");
                await axios.request({
                    method: "DELETE",
                    url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/pedidos/${pedidoId}/platillos/${platillo.id}`,
                });
                await displayPlatillos();
                btnCerrar.disabled = false;
            });

            btnMenos.addEventListener("click", async () => {
                btnMenos.disabled = true;
                console.log("Botón Menos presionado");
                if (platillo.amount > 1)
                    await axios.request({
                        method: "PATCH",
                        url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/pedidos/${pedidoId}/platillos/${platillo.id}`,
                        headers: { "Content-Type": "application/json" },
                        data: { amount: platillo.amount - 1 },
                    });
                else
                    await axios.request({
                        method: "DELETE",
                        url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/pedidos/${pedidoId}/platillos/${platillo.id}`,
                    });
                await displayPlatillos();
                btnMenos.disabled = false;
            });

            btnMas.addEventListener("click", async () => {
                btnMas.disabled = true;
                console.log("Botón Más presionado");
                await axios.request({
                    method: "PATCH",
                    url: `https://crunchy-service.onrender.com/api/v1/usuarios/${userId}/pedidos/${pedidoId}/platillos/${platillo.id}`,
                    headers: { "Content-Type": "application/json" },
                    data: { amount: platillo.amount + 1 },
                });
                await displayPlatillos();
                btnMas.disabled = false;
            });
        });
    };
    await displayPlatillos();
})();
