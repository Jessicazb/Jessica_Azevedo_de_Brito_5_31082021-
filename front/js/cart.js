//parametrage pour le local storage
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
  } 
  Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
  }
  let totalPrice = 0
  let totalItem = 0
 // Envoie les produits dans le panier
  for (let i=0; i<localStorage.getObj("panier").length; i++){
   let productId = localStorage.getObj("panier")[i].id; //recuperation id de la ligne panier
   fetch("http://localhost:3000/api/products/"+productId)
   .then((response) => response.json())
   .then((product) => {

    console.log(product);
 
    // calcul du prix total de la commande 
 let totalItemPrice = 0;
 totalItemPrice = parseInt(localStorage.getObj("panier")[i].quantity) * product.price;
 totalPrice += totalItemPrice;

 //calcul du nombre d'article
 totalItem += parseInt(localStorage.getObjt("panier")[i].quantity);


    document.getElementById("cart__items").innerHTML+=
    '<article class="cart__item" data-id='+localStorage.getObjt("panier")[i].id+' data-color='+localStorage.getObjt("panier")[i].color+'>'+
      '<div class="cart__item__img">'+
        '<img src='+product.imageUrl+' alt="Photographie d\'un canapé">'+
      '</div>'+
      '<div class="cart__item__content">'+
        '<div class="cart__item__content__description">'+
          '<h2>'+product.name+'</h2>'+
          '<p> '+localStorage.getObjt("panier")[i].color+' </p>'+
          '<p> '+totalItemPrice+' €</p>'+
        '</div>'+
        '<div class="cart__item__content__settings">'+
          '<div class="cart__item__content__settings__quantity">'+
            '<p>Qté : '+localStorage.getObjt("panier")[i].quantity+' </p>'+
            '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+localStorage.getObjt("panier")[i].quantity+'">'+
          '</div>'+
          '<div class="cart__item__content__settings__delete">'+
            '<p class="deleteItem">Supprimer</p>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</article>';
   
    })}
/*
let cardsFetch = function () {
    fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((product) => {
  
    console.log(product);

    
    for (let j=0; j<product.length; j++){
      if(localStorage.getItem("item")[i] !== undefined && product[j]._id !== undefined){
        if(product[j]._id == localStorage.getItem("item")[i].id){
          product = product[j];
     }
      }
     */ 
    };
    
    

 // calcul du prix total de la commande 
 let totalItemPrice = 0;
 totalItemPrice = parseInt(localStorage.getObjt("panier")[i].quantity) * product.price;
 totalPrice += totalItemPrice;

 //calcul du nombre d'article
 totalItem += parseInt(localStorage.getObjt("panier")[i].quantity);

 

 
  //renvoi la quantité total d'article
  document.getElementById("totalQuantity").innerHTML = totalItem;

  //renvoi le prix total
  document.getElementById("totalPrice").innerHTML = totalPrice;

   // suppression d'un article du panier 
function removeItem(product){
 let deleteItem = getObj("panier"); // a voir
 deleteItem = deleteItem.filtrer(prod => prod.id == product.id);
  saveItem(deleteItem);
}
let deleteItem = document.getElementsByClassName("deleteItem");
for (l=0; l<deleteItem.length; l++){
  deleteItem[l].addEventListener("click", function(test){
    removeProductFromCart(test.target.parentNode.parentNode.parentNode.parentNode.dataset.id, test.target.parentNode.parentNode.parentNode.parentNode.dataset.color);
  });
}

// Changement de quantité d'un élément 
function Quantity (product,quantity){
let changeQuantity = getObj("panier"); // a voir
let foundProduct = item.find(prod => prod.id == product.id);
if (foundProduct != undefined){
        foundProduct.quantity += quantity;
}     
saveObj(panier);
}
let changeQuantity = document.getElementsByClassName("itemQuantity");
for(l=0; l<changeQuantity.length; l++){
  changeQuantity[l].addEventListener("change", function(testQuantity){
    changeQuantityFromCart(testQuantity.target.parentNode.parentNode.parentNode.parentNode.dataset.id, testQuantity.target.parentNode.parentNode.parentNode.parentNode.dataset.color, testQuantity.target.value);
  });
}
// formulaire 
const buttonCommander = document.getElementById("order");
buttonCommander.addEventListener("click", (e) => { e.preventDefaut();
let prenon = document.getElementById("firstName").value;
let nom = document.getElementById("lastName").value;
let ville = document.getElementById("city").value;
let adresse = document.getElementById("address").value;
let mail = document.getElementById("email").value;

// Prénom
let prenomError = document.getElementById("firstNameErrorMsg");
function validatePrenom (prenom){
let regexPrenom = /^[a-z][a-z '-.,]{1,31}$|^$/i;
if (regexPrenom.test(prenom)== false){
    return false;
 }else{
    prenomError.innerHTML = null;
    return true;
 }
}

// Nom
let nomError = document.getElementById("lastNameErrorMsg");
function validateNom (nom){
let regexNom = /^[a-z][a-z '-.,]{1,31}$|^$/i;
if (regexNom.test(nom)== false){
    return false;
   }else{
    nomError.innerHTML = null;
    return true;
  }
}

// ville 
let villeError = document.getElementById ("cityErrorMsg");
function validateVille (ville){
let regexVille = /^[a-z][a-z '-.,]{1,31}$|^$/i;
if(regexVille.test(ville)== false){
    return false;
  }else{
    villeError.innerHTML = null;
    return true;
  }
}

// Email 
let emailError = document.getElementById("emailErrorMsg");
function validateEmail (mail){
let regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (regexEmail.test(mail)== false){
    return false;
  }else{
    emailError.innerHTML = null;
    return true;
 }
}

// Conditions pour le message d'erreur si formulaire est pas rempli correctement 
if (validatePrenom (prenom) == false){
    prenomError.innerHTML = "Entrez un prénom valide sans chiffre.";    
 }
if (validateNom (nom) == false){
    nomError.innerHTML = "Entrez un nom valide sans chiffre";
 }
if (validateVille(ville)== false){
    villeError.innerHTML = "Entrez une comune valide";
 }
if (validateEmail (mail)== false){
    emailError.innerHTML = "Entrez une adresse e-mail valide";
}
let contact = [];
let productId = 0;
let Api = [];

//envoyer le résultats à la base de données et changer de page

if(validateEmail(mail)==true && validateFirstName(prenom)==true && validateLastName(nom)==true && validateCity(ville)==true){
    //envoyer resultats
    contact = {
    prenom: prenom,
    nom: nom,
    address: adresse,
    ville: ville,
    email: mail,
    }
    // boucle pour enrengistrer les information dans le local storage (?)
    for (m = 0; m<localStorage.getObj("panier").length; m++){
        for(n = 0; n<product.length; n++){
          if(localStorage.getObjt("panier")[m] !== undefined && product[n]._id !== undefined){
            if(product[n]._id == localStorage.getObj("panier")[m].id){
              product[n].productId = product[n]._id;
              Api.push(product[n]._id);
            }
          }
        }
      }
    let json = JSON.stringify({ contact, product : Api });
     // envoi des données à l'API
      fetch(("http://localhost:3000/api/products/order"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      })
      .then((res) => res.json())
      .then((order) => {
        // panier vide = enlever les produits du panier
        localStorage.clear();
        //renvoi a la page confirmation
        window.location = "../html/confirmation.html?orderId="+order.orderId // à voir 
      })
      .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message); // à voir

       });
     }
    });
   }
 });
};
cardsFetch();