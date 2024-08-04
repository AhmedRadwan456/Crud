var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var updateItem = 0;
var productContanier = [];

if (localStorage.getItem("product") != null) {
  productContanier = JSON.parse(localStorage.getItem("product"));
  displayProduct(productContanier);
}

function setFormUpdate(i) {
  btn1.classList.replace("d-block", "d-none");
  btn2.classList.replace("d-none", "d-block");
  productName.value = productContanier[i].Name;
  productPrice.value = productContanier[i].Price;
  productCategory.value = productContanier[i].Category;
  productDesc.value = productContanier[i].Desc;
  updateItem = i;
}

function updateProduct() {
  productContanier[updateItem].Name = productName.value;
  productContanier[updateItem].Price = productPrice.value;
  productContanier[updateItem].Category = productCategory.value;
  productContanier[updateItem].Desc = productDesc.value;
  btn1.classList.replace("d-none", "d-block");
  btn2.classList.replace("d-block", "d-none"); 
  localStorage.setItem("product", JSON.stringify(productContanier));
  clearform(); 
  displayProduct(productContanier);
}

function addproduct() {
  var product = {
    Name: productName.value,
    Price: productPrice.value,
    Category: productCategory.value,
    Desc: productDesc.value,
  };

  productContanier.push(product);
  localStorage.setItem("product", JSON.stringify(productContanier));
  displayProduct(productContanier);
  clearform();
}
function clearform() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

function displayProduct(arr) {
  cartona = ``;
  for (var i = 0; i < arr.length; i++) {
    cartona += `<tr>
            <td>${arr[i].Name}</td>
            <td>${arr[i].Price}</td>
            <td>${arr[i].Category}</td>
            <td>${arr[i].Desc}</td>
            <td><button onclick="setFormUpdate(${i})" class="btn btn-outline-info">Update</button></td>
            <td> <button onclick="deleteProduct(${i})" class="noselect">
            <span class="text">Delete</span>
            <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
            </svg>
            </span>
            </button></td>  
          </tr>`;
  }
  document.getElementById("tablebody").innerHTML = cartona;
}

function deleteProduct(productIndex) {
  productContanier.splice(productIndex, 1);
  localStorage.setItem("product", JSON.stringify(productContanier));
  displayProduct(productContanier);
}

function searchProduct(term) {
  var matchesProduct = [];

  for (i = 0; i < productContanier.length; i++) {
    if (
      productContanier[i].Name.toLowerCase().includes(term.toLowerCase()) ===
      true
    ) {
      matchesProduct.push(productContanier[i]);
    }
  }
  displayProduct(matchesProduct);
}
