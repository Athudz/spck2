import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
  
import {
  getAuth,
  signInWithEmailAndPassword,
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


document.getElementById("form-login").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);

  if (email === "" || password === "") {
    alert("Please fill all the fields");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
        window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Logged in unsuccessfully, please try again.");
    });
});
