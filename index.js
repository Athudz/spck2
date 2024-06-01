import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
var uid = null;
var updateId = null;
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    renderProduct();
  }
});

function renderProductContainer1() {
  const listProduct = document.getElementById("container1");
  listProduct.innerHTML = "";
  const q = query(
    collection(db, "products"),
    where("type_product", "==", "loai1")
  );
  getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const item = doc.data();
      let divElement = document.createElement("div");
      divElement.classList.add("card");
      divElement.innerHTML += `
      <div class="card-img">
      <img
        src="${item.img_product}" width="100%" height="100%"
        alt="">
    </div>
    <div class="card-content">
      <h3 style=" font-size: 18px; margin:6px;">${item.name_product}</h3>
      <p class="price" style=" font-size: 18px;  margin:5px;">${item.price_product} VND</p>

      <button class="atc-btn">THÊM
        VÀO GIỎ</button>
    </div>
      `;
      listProduct.appendChild(divElement);
    });
  });
}

function renderProductContainer2() {
  const listProduct = document.getElementById("container2");
  listProduct.innerHTML = "";
  const q = query(
    collection(db, "products"),
    where("type_product", "==", "loai2")
  );
  getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const item = doc.data();
      let divElement = document.createElement("div");
      divElement.classList.add("card");
      divElement.innerHTML += `
      <div class="card-img">
      <img
        src="${item.img_product}" width="100%" height="100%"
        alt="">
    </div>
    <div class="card-content">
      <h3 style=" font-size: 18px; margin:6px;">${item.name_product}</h3>
      <p class="price" style=" font-size: 18px;  margin:5px;">${item.price_product} VND</p>

      <button class="atc-btn">THÊM
        VÀO GIỎ</button>
    </div>
      `;
      listProduct.appendChild(divElement);
    });
  });
}
function renderProductContainer3() {
  const listProduct = document.getElementById("container3");
  listProduct.innerHTML = "";
  const q = query(
    collection(db, "products"),
    where("type_product", "==", "loai3")
  );
  getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const item = doc.data();
      let divElement = document.createElement("div");
      divElement.classList.add("card");
      divElement.innerHTML += `
      <div class="card-img">
      <img
        src="${item.img_product}" width="100%" height="100%"
        alt="">
    </div>
    <div class="card-content">
      <h3 style=" font-size: 18px; margin:6px;">${item.name_product}</h3>
      <p class="price" style=" font-size: 18px;  margin:5px;">$${item.price_product}</p>

      <button class="atc-btn">THÊM
        VÀO GIỎ</button>
    </div>
      `;
      listProduct.appendChild(divElement);
    });
  });
}
renderProductContainer1();
renderProductContainer2();
renderProductContainer3();