function isValidLogin() {
    const usernameInput = document.getElementById("username-input");
    const passwordInput = document.getElementById("password-input");
    
    const username = usernameInput.value;
    const password = passwordInput.value;

    if(!username || username.length == 0 || !password || password.length == 0){
        alert("please enter your name and your password");
        return false;
    }
    return true;
}

function login () {

    if(!isValidLogin())
        return;

    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    socket.emit("login", {
        data: {
            username: username,
            password: password
        }
    });
    return;
}

function showConnectedUser(username) {
    const connectedUsersSection = document.getElementById("connected-users-section");

    const paragraph = document.createElement("p");
    paragraph.textContent = username;

    connectedUsersSection.appendChild(paragraph);
}

const socket = io("http://localhost:3000", {
    withCredentials: false,
    transports: ["websocket"]
});

socket.on("login", (data) => {
    console.log(data);
    window.location.href = "./game.html";
    showConnectedUser(data.username);
})

socket.on("connect", () => {
    console.log("connected to the server");
});

socket.on("connect_error", (err) => {
    console.log("failed to connect to server due to error : " + err);
});

const loginBTN = document.getElementById("login-button");
loginBTN.addEventListener("click", login);