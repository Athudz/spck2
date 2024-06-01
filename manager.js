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

document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name_product = document.getElementById("name-product").value;
    const content_product = document.getElementById("content-product").value;
    const price_product = document.getElementById("price-product").value;
    const img_product = document.getElementById("img-product").value;
    const type_product = document.getElementById("type-product").value;
    const docRef = collection(db, "products");
    addDoc(docRef, {
      product_content: content_product,
      name_product: name_product,
      price_product: price_product,
      img_product: img_product,
      type_product: type_product,
      user_id: uid,
      created_at: new Date(),
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("name-product").value = "";
      document.getElementById("content-product").value = "";
      document.getElementById("price-product").value = "";
      document.getElementById("img-product").value = "";
      document.getElementById("type-product").value = "";
      renderProduct();
    });
  });

const renderProduct = async () => {
  document.getElementById("render-product").innerHTML = `
  <tr>
  <th>Ten</th>
  <th>Giá</th>
  <th>Anh</th>
  <th>Edit</th>
</tr>`;
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    console.log(doc);
    const product = doc.data();
    let product_div = document.createElement("tr");
    product_div.innerHTML = `
    <td>${product.name_product}</td>
                <td>${product.price_product}</td>
                <td><img width="200" height="200" src="${product.img_product}"></td>
                <td>
               <button  class="update-btn" product-id=${doc.id}>Edit</button>
                    <button class="delete-btn" product-id=${doc.id}>Delete</button>
                </td>
                `;
    document.getElementById("render-product").appendChild(product_div);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const productId = e.target.getAttribute("product-id");
      await deleteDoc(doc(db, "products", productId));
      renderProduct();
    });
  });

  document.querySelectorAll(".update-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      const productId = e.target.getAttribute("product-id");
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const product = docSnap.data();
        updateId = productId;
        document.getElementById("name-product-update").value =
          product.name_product;
        document.getElementById("content-product-update").value =
          product.product_content;
        document.getElementById("price-product-update").value =
          product.price_product;
        document.getElementById("img-product-update").value =
          product.img_product;
        document.getElementById("type-product-update").value =
          product.type_product;
      }
    });
  });
};

document.getElementById("update-product").addEventListener("click", async (e) => {
  e.preventDefault();
  const name_product = document.getElementById("name-product-update").value;
  const content_product = document.getElementById("content-product-update").value;
  const price_product = document.getElementById("price-product-update").value;
  const img_product = document.getElementById("img-product-update").value;
  const type_product = document.getElementById("type-product-update").value;
  const docRef = doc(db, "products", updateId);
  await updateDoc(docRef, {
    product_content: content_product,
    name_product: name_product,
    price_product: price_product,
    img_product: img_product,
    type_product: type_product,
  }).then(() => {
    console.log("Document successfully updated!");
  });
  renderProduct();
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
});

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
