const img_match = document.querySelector("#img_match");
const txt_nombre_match = document.querySelector("#txt_nombre_match");
const txt_local_match = document.querySelector("#txt_local_match");
const txt_ingredientes_match = document.querySelector(
    "#txt_ingredientes_match"
);

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
    })
    .catch(function (error) {
        console.error(error);
    });
