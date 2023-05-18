const login = document.querySelector("#login");

login.addEventListener("click", () => {
    const user = document.querySelector("#username").value;

    if (user == "") alert("Write your username!");
    else {
        document.cookie = `username=${user}`;
        document.location.href = "/";
    }
});
