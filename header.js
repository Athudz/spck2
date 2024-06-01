import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";

import { onAuthStateChanged , getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userLogin").style.display = "flex";
    document.getElementById("username").innerHTML = user.email;
    document.getElementById("userNotlogin").style.display = "none";

  }else{
    document.getElementById("userLogin").style.display = "none";
    document.getElementById("userNotlogin").style.display = "block";
  }
});

document.getElementById("btn-logout").addEventListener("click", function () {
  signOut(auth).then(() => {
    console.log("Sign-out successful.");
    window.location.href = "signin.html";
  }).catch((error) => {
    console.log(error);
  });
});