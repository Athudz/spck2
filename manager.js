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
  doc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
var uid = null;
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    document.getElementById("user-email").innerHTML = user.email;
    document.getElementById("create-product-place").style.display = "block";
  }
});

document.getElementById("logout").addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      window.location.href = "signin.html";
    })
    .catch((error) => {
      console.log(error);
    });
});

document.getElementById("add-product").addEventListener("click", function (e) {
  e.preventDefault();
  const name_product = document.getElementById("name-product").value;
  const content_product = document.getElementById("content-product").value;
  const price_product = document.getElementById("price-product").value;
  const img_product = document.getElementById("img-product").value;
  const docRef = collection(db, "products");
  addDoc(docRef, {
    product_content: content_product,
    name_product: name_product,
    price_product: price_product,
    img_product: img_product,
    user_id: uid,
    created_at: new Date(),
  }).then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById("name-product").value = "";
    document.getElementById("content-product").value = "";
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
                <a href="update.html?id=${doc.id}"><button>Edit</button></a>
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
};

renderProduct();
