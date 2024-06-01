
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
function renderProductCart() {
  const  cart_render = document.getElementById("cart-render");
  cart_render.innerHTML = "";
  
  getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const item = doc.cart();
    
        const priceTotal = item.price_product * item.quantity;
        total += priceTotal;
      let cart_item = document.createElement("div");
      cart_item.classList.add("card");
      cart_item.innerHTML += `
        <div class="card-inf">
        <input type="checkbox">
        <div class="card-img">
            <img src="${item.img_product}" alt="">
        </div>
        <div class="card-des">
            <h4>${item.name_product}</h4>
            <h3>Giá: ${item.price_product} VND</h3>
        </div>
        </div>
        <div class="product-inf">
        <div class="quantity">
        ${item.quantity}
        </div>
        <div class="price-total">${priceTotal} VND</div>
        </div>
            `;
      cart_render.appendChild(cart_item);
    });
  });
}

// const cart_render = document.getElementById("cart-render");
// var total =0;
// for (const item of cart) {
//     const priceTotal = item.product.price * item.quantity;
//     total += priceTotal;
//   let cart_item = document.createElement("div");
//   cart_item.classList.add("card");
//   cart_item.innerHTML = `
//     <div class="card-inf">
//     <input type="checkbox">
//     <div class="card-img">
//         <img src="${item.product.img}" alt="">
//     </div>
//     <div class="card-des">
//         <h4>${item.product.name}</h4>
//         <h3>Giá: $${item.product.price}</h3>
//     </div>
//     </div>
//     <div class="product-inf">
//     <div class="quantity">
//     ${item.quantity}
//     </div>
//     <div class="price-total">$${priceTotal}</div>
//     </div>
//         `;
//   cart_render.appendChild(cart_item);
// }
document.getElementById("total-price").innerHTML = `$ ${total.toPrecision(5)}`;
document.getElementById("btn-pay").addEventListener("click", () => {
  localStorage.removeItem("cart");
  cart_render.innerHTML = "";
  document.getElementById("total-price").innerHTML = "$ 0";
  alert("Thank you for your purchase!");
});