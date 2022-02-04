//parametrage pour le local storage
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key))
}

let totalPrice = 0;
let totalItem = 0;
//recuperation des données API
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((products) => {
    // envoi des produits dans le panier 
    for (let i = 0; i < localStorage.getObj("panier").length; i++) {
      let product = false;
      for (let j = 0; j < products.length; j++) {
        if (localStorage.getObj("panier")[i] !== undefined && products[j]._id !== undefined) {
          if (products[j]._id == localStorage.getObj("panier")[i].productId) {
            product = products[j];
          }
        }
      }
      // calcul du prix total et de la quantité totale 
      if (product !== false) {
        totalItem += parseInt(localStorage.getObj("panier")[i].quantity);
        totalPrice += parseInt(localStorage.getObj("panier")[i].quantity) * product.price;

        //renvoi la quantité total d'article
        document.getElementById("totalQuantity").innerHTML = totalItem;
        //renvoi le prix total
        document.getElementById("totalPrice").innerHTML = totalPrice;

        // Affichage des articles dans le panier 
        document.getElementById("cart__items").innerHTML +=
          '<article class="cart__item" data-id=' + localStorage.getObj("panier")[i].productId + ' data-color=' + localStorage.getObj("panier")[i].color + '>' +
          '<div class="cart__item__img">' +
          '<img src=' + product.imageUrl + ' alt="Photographie d\'un canapé">' +
          '</div>' +
          '<div class="cart__item__content">' +
          '<div class="cart__item__content__description">' +
          '<h2>' + product.name + '</h2>' +
          '<p> ' + localStorage.getObj("panier")[i].color + ' </p>' +
          '<p> ' + product.price + ' €</p>' +
          '</div>' +
          '<div class="cart__item__content__settings">' +
          '<div class="cart__item__content__settings__quantity">' +
          '<p>Qté : ' + localStorage.getObj("panier")[i].quantity + ' </p>' +
          '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="' + localStorage.getObj("panier")[i].quantity + '">' +
          '</div>' +
          '<div class="cart__item__content__settings__delete">' +
          '<p class="deleteItem">Supprimer</p>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</article>';
      }
    }

    // function pour supprimer un artcile du panier 
    function removeItem(productId, color) {
      let deleteItemPanier = localStorage.getObj("panier");
      for (let k = 0; k < deleteItemPanier.length; k++) {
        if (deleteItemPanier[k].productId == productId && deleteItemPanier[k].color == color) {
          deleteItemPanier.splice(k, 1);
          localStorage.setObj("panier", deleteItemPanier);
          window.location.reload();
        }
      }
    }
    // suppression d'un article du panier 
    let deleteItem = document.getElementsByClassName("deleteItem");
    for (let l = 0; l < deleteItem.length; l++) {
      deleteItem[l].addEventListener("click", function (test) {
        removeItem(test.target.parentNode.parentNode.parentNode.parentNode.dataset.id, test.target.parentNode.parentNode.parentNode.parentNode.dataset.color);
      });
    }

    // function pour changer la quantité d'un élément 
    function changeQuantity(productId, color, quantity) {
      if (quantity > 0) {
        let change = localStorage.getObj("panier");
        for (let k = 0; k < change.length; k++) {
          if (change[k].productId == productId && change[k].color == color) {
            change[k].quantity = quantity
            localStorage.setObj("panier", change);
            window.location.reload();
          }
        }
      }
    }
    // changement de la quantité d'un élément
    let itemQuantity = document.getElementsByClassName("itemQuantity");
    for (let l = 0; l < itemQuantity.length; l++) {
      itemQuantity[l].addEventListener("click", function (testQuantity) {
        changeQuantity(testQuantity.target.parentNode.parentNode.parentNode.parentNode.dataset.id, testQuantity.target.parentNode.parentNode.parentNode.parentNode.dataset.color, testQuantity.target.value);
      });
    }
    // validation formulaire 
    const button = document.getElementById("order")
    button.addEventListener("click", (event) => {
      event.preventDefault();

      let firstName = document.getElementById("firstName").value;
      let lastName = document.getElementById("lastName").value;
      let address = document.getElementById("address").value;
      let city = document.getElementById("city").value;
      let email = document.getElementById("email").value;

      // function prénom
      function validateFirstName(firstName) {
        // objet regex pour tester la chaîne de caractères 
        let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
        if (regex.test(firstName) == false || firstName == "") {
          return false;
        } else {
          document.getElementById("firstNameErrorMsg").innerText = "";
          return true;
        }
      }
      // function nom 
      function validateLastName(lastName) {
        let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
        if (regex.test(lastName) == false || lastName == "") {
          return false;
        } else {
          document.getElementById("lastNameErrorMsg").innerText = "";
          return true;
        }
      }
      // function adresse
      function validateAddress(address) {
        let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
        if (regex.test(address) == false || address == "") {
          return false;
        } else {
          document.getElementById("addressErrorMsg").innerText = "";
          return true;
        }
      }
      // function ville
      function validateCity(city) {
        let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
        if (regex.test(city) == false || city == "") {
          return false;
        } else {
          document.getElementById("cityErrorMsg").innerText = "";
          return true;
        }
      }
      // function mail 
      function validateEmail(email) {
        let regexMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexMail.test(email) == false) {
          return false;
        } else {
          document.getElementById("emailErrorMsg").innerText = "";
          return true;
        }

      }
      // function pour envoyer message d'erreur si champs n'est pas valide 
      function errorHandler(email, firstName, lastName, address, city) {
        if (!validateEmail(email)) {
          document.getElementById("emailErrorMsg").innerText = "Veuillez saisir une adresse e-mail valide.";
        }
        if (!validateFirstName(firstName)) {
          document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez saisir un prénom valide sans chiffre.";
        }
        if (!validateLastName(lastName)) {
          document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez saisir un nom valide sans chiffre.";
        }
        if (!validateCity(city)) {
          document.getElementById("cityErrorMsg").innerHTML = "Veuillez saisir une commune valide sans chiffre.";
        }
        if (!validateAddress(address)) {
          document.getElementById("addressErrorMsg").innerHTML = "Veuillez saisir un adresse valide.";
        }
      }
      errorHandler(email, firstName, lastName, address, city);

      if (validateEmail(email) == true && validateFirstName(firstName) == true && validateLastName(lastName) == true
        && validateCity(city) == true && validateAddress(address) == true) {
        // si tout est valide soumettre résultat
        let contact = {
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          email: email,
        }
        let productsApi = [];
        for (m = 0; m < localStorage.getObj("panier").length; m++) {
          productsApi.push(localStorage.getObj("panier")[m].productId);
        }
        // envoi des données à l'API
        fetch(("http://localhost:3000/api/products/order"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contact: contact, products: productsApi })
        })
          .then((res) => res.json())
          .then((order) => {
            //enleve les produits du panier
            localStorage.clear();
            //renvoi a la page confirmation
            window.location = "../html/confirmation.html?orderId=" + order.orderId
          })
          .catch(function (error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });
      }
    });
  });
