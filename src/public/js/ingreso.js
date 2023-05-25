const btn_iniciar = document.querySelector("#btn_iniciar");

btn_iniciar.addEventListener("click", () => {
    console.log("CLICK");
    btn_iniciar.disabled = true;
    const user = document.querySelector("#inp_usuario");
    const pass = document.querySelector("#inp_password");

    if (!user || !pass) alert("Complete fields!");
    else {
        const options = {
            method: "GET",
            url: `https://crunchy-service.onrender.com/api/v1/usuarios/u/${user.value}`,
        };

        axios
            .request(options)
            .then(function (response) {
                const data = response.data.body;
                if (pass.value != data.password) throw Error();
                document.cookie = `username=${user.value}`;
                document.location.href = "/";
            })
            .catch(function (error) {
                btn_iniciar.disabled = false;
                alert("Invalid data");
                user.value = "";
                pass.value = "";
            });
    }
});
