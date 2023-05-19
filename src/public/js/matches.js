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

const myCookieValue = getCookie("username");
console.log(myCookieValue);

const options = {
    method: "GET",
    url: "https://crunchy-service.onrender.com/api/v1/platillos",
};

axios
    .request(options)
    .then(function (response) {
        const platillos = response.data.body;
        display_new_platillo(platillos);

        btn_like.addEventListener("click", () => {
            display_new_platillo(platillos);
        });

        btn_dislike.addEventListener("click", () => {
            display_new_platillo(platillos);
        });
    })
    .catch(function (error) {
        console.error(error);
    });

function display_new_platillo(platillos) {
    const actual_platillo = platillos.shift();
    txt_nombre.textContent = actual_platillo.name;
    txt_local.textContent = actual_platillo.local.name;
    img_comida.src = actual_platillo.photoUrl;
}
