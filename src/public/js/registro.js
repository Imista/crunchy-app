const btn_iniciar = document.querySelector("#btn_iniciar");
const inp_nombre = document.querySelector("#inp_nombre");
const inp_apellido = document.querySelector("#inp_apellido");
const inp_correo = document.querySelector("#inp_correo");
const inp_usuario = document.querySelector("#inp_usuario");
const inp_password = document.querySelector("#inp_password");
const inp_c_password = document.querySelector("#inp_c_password");

btn_iniciar.addEventListener("click", () => {
    if (
        !inp_nombre ||
        !inp_apellido ||
        !inp_correo ||
        !inp_usuario ||
        !inp_password ||
        !inp_c_password
    )
        alert("Complete fields!");
    else if (inp_password.value != inp_c_password.value)
        alert("Passwords do not match");
    else if (inp_password.value.length < 8)
        alert("Password lenght must be greater than 7");
    else {
        const options = {
            method: "POST",
            url: "https://crunchy-service.onrender.com/api/v1/usuarios",
            headers: { "Content-Type": "application/json" },
            data: {
                name: inp_nombre.value,
                lastName: inp_apellido.value,
                email: inp_correo.value,
                phone: "0000000000",
                username: inp_usuario.value,
                password: inp_password.value,
                photoUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
            },
        };

        axios
            .request(options)
            .then(function (response) {
                document.cookie = `username=${inp_usuario.value}`;
                document.location.href = "/";
            })
            .catch(function (error) {
                console.error(error);
                alert("An error occurred. Check the fields and try again");
            });
    }
});
