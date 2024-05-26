import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "index.html";
  }
});

document
  .getElementById("form-register")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    console.log(email, password, username);

    if (email === "" || password === "" || username === "") {
      alert("Please fill all the fields");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        window.location.href = "signin.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  });
