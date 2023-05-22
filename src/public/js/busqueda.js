const inp_busqueda = document.querySelector("#inp_busqueda");

console.log("AAA");

inp_busqueda.addEventListener("input", () => {
    const options = {
        method: "GET",
        url: "https://crunchy-service.onrender.com/api/v1/platillos/search",
        params: { q: inp_busqueda.value },
    };

    axios
        .request(options)
        .then(function (response) {
            const platillos = response.data.body;
            platillos.map((platillo) => {
                console.log(platillo.id);
                console.log(platillo.photoUrl);
                console.log(platillo.name);
            });
        })
        .catch(function (error) {
            console.error(error);
        });
});
