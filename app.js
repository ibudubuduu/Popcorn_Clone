// Selecting elements
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");

// Toggle sign-in and sign-up modes with preventDefault
sign_up_btn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default behavior
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default behavior
    container.classList.remove("sign-up-mode");
});

sign_up_btn2.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default behavior
    container.classList.add("sign-up-mode2");
});

// sign_in_btn2.addEventListener("click", (event) => {
//     event.preventDefault(); // Prevent default behavior
//     container.classList.remove("sign-up-mode2");
// });

// Form submission with preventDefault
document.getElementById("sign-in-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form refresh
    
    // Retrieve the username and password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if both username and password are "admin"
    if (username === "admin" && password === "admin") {
        window.location.href = "main.html"; // Redirect if admin
    } else {
        alert("Incorrect username or password. Please try again."); // Error message
    }
});
