const btn_iniciar = document.querySelector("#btn_iniciar");

console.log("AS");

btn_iniciar.addEventListener("click", () => {
    const user = document.querySelector("#inp_usuario").value;

    if (user == "") alert("Write your username!");
    else {
        document.cookie = `username=${user}`;
        document.location.href = "/";
    }
});
