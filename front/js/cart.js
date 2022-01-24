    //parametrage pour le local storage
    Storage.prototype.setObj = function(key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    } 
    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key))
    }

  let totalPrice = 0;
  let totalItem = 0;
   //recuperation id de la ligne panier
   fetch("http://localhost:3000/api/products")
   .then((response) => response.json())
   .then((products) => {
    console.log(products);
    for (let i=0; i<localStorage.getObj("panier").length; i++){
    let product=false;
      for (let j=0; j<products.length; j++){
        if(localStorage.getObj("panier")[i] !== undefined && products[j]._id !== undefined){
          if(products[j]._id == localStorage.getObj("panier")[i].productId){
            product = products[j];
          }
        }
      }
    if(product !== false){
        totalItem += parseInt(localStorage.getObj("panier")[i].quantity);
        totalPrice += parseInt(localStorage.getObj("panier")[i].quantity) * product.price;
        console.log(totalItem,totalPrice);
    
        // Affichage des articles 
        document.getElementById("cart__items").innerHTML+=
        '<article class="cart__item" data-id='+localStorage.getObj("panier")[i].productId+' data-color='+localStorage.getObj("panier")[i].color+'>'+
        '<div class="cart__item__img">'+
            '<img src='+product.imageUrl+' alt="Photographie d\'un canapé">'+
        '</div>'+
        '<div class="cart__item__content">'+
            '<div class="cart__item__content__description">'+
            '<h2>'+product.name+'</h2>'+
            '<p> '+localStorage.getObj("panier")[i].color+' </p>'+
            '<p> '+product.price+' €</p>'+
            '</div>'+
            '<div class="cart__item__content__settings">'+
            '<div class="cart__item__content__settings__quantity">'+
                '<p>Qté : '+localStorage.getObj("panier")[i].quantity+' </p>'+
                '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+localStorage.getObj("panier")[i].quantity+'">'+
            '</div>'+
            '<div class="cart__item__content__settings__delete">'+
                '<p class="deleteItem">Supprimer</p>'+
            '</div>'+
            '</div>'+
        '</div>'+
        '</article>';
    }
    }  
   //renvoi la quantité total d'article
   document.getElementById("totalQuantity").innerHTML = totalItem;
   //renvoi le prix total
     document.getElementById("totalPrice").innerHTML = totalPrice;
    });

/*
   
  // suppression d'un article du panier 
function removeItem(product){
  let deleteItem = getObj("panier");
  document.getElementsByClassName("deleteItem").addEventListener("click", event =>{
   productId = productId.filter(p => p.id != productId);
});
}
// Changement de quantité d'un élément 
function changeQuantity (product,quantity,color){
  let changeQuantity = getObj("panier"); // a voir
  let foundProduct = item.find(prod => prod.id == product.id);
    if (foundProduct != undefined){
        foundProduct.quantity += quantity;
    }     
    quantity(panier);
}

 // validation formulaire 
 
 const button = document.getElementById("order")
 button.addEventListener("click", (event) =>{
   event.preventDefault();
   
 let firstName = document.getElementById("firstName");
 let lastName = document.getElementById("lastName");
 let address = document.getElementById("address");
 let city = document.getElementById("city");
 let email = document.getElementById("email");

 function validateFirstName (firstName) {
  let input = event.currentTarget;
  let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
  let nomTest = regex.test(firstName.value);

    if(!nomTest){
      button.setAttribute("false","false");
      input.document.getElementById("firstNameErrorMsg");
    }else{
      button.removeAttribute("false");
      input.document.getElementById.remove("firstNameErrorMsg");
      return true;
    }
  }
  function validateLastName (lastName){
    let input = event.currentTarget;
    let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
    let nomTest = regex.test(lastName.value);
  
    if(!nomTest){
        button.setAttribute("false","false");
        input.document.getElementById("lastNameErrorMsg");
    }else{
        button.removeAttribute("false");
        input.document.getElementById.remove("lastNameErrorMsg");
        return true;
    }  
  }
 function validateAddress (address){
   let input = event.currentTarget;
   let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
   let addressTest = regex.test(address.value);

  if(!addressTest){
      button.setAttribute("false","false");
      input.document.getElementById("addressErrorMsg");
    }else{
      button.removeAttribute("false");
      input.document.getElementById.remove("addressErrorMsg");
      return true;
    }
 }
 function validateCity (city){
    let input = event.currentTarget;
    let regex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
    let villeTest = regex.test(city.value);
  
    if(!villeTest){
        button.setAttribute("false","false");
        input.document.getElementById("cityErrorMsg");
    }else{
        button.removeAttribute("false");
        input.document.getElementById.remove("cityErrorMsg");
        return true;
    }
 } 
 function validateEmail (email){
    let input = event.currentTarget;
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailTest = regex.test(city.value);
  
    if(!emailTest){
        button.setAttribute("false","false");
        input.document.getElementById("emailErrorMsg");
    }else{
        button.removeAttribute("false");
        input.document.getElementById.remove("emailErrorMsg");
        return true;
    }
 }
// function pour envoyer message d'erreur si champs n'est pas valide 
 function errorHandler(email, firstName,lastName,address,city){
    if (validateEmail(email) == false) {
        emailErrorMsg.innerHTML = "Entrez une adresse e-mail valide.";
    }
    if (validateFirstName(firstName) == false) {
        firstNameErrorMsg.innerHTML = "Entrez un prénom valide sans chiffre.";
    }
    if (validateLastName(lastName) == false) {
        lastNameErrorMsg.innerHTML = "Entrez un nom valide sans chiffre.";
    }
    if (validateCity(city) == false) {
        cityErrorMsg.innerHTML = "Entrez une commune valide sans chiffre.";
    } 
    if (validateAddress(address)== false){
        addressErrorMsg.innerHTML = "Entrez un adresse valide.";
    }
 }
  if(validateEmail(mail)==true && validateFirstName(firstName)==true && validateLastName(lastName)==true 
  && validateCity(city)==true && validateAddress(address)==true){
    // si tout est valide soumettre résultat
    fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            lastName: lastName.value,
            firstName: firstName.value,
            city: city.value,
            address: address.value,
        })
    }).then((response) => {
        if (response.status !== 3000) {
            return errorHandler();
        }else{
            window.location = "../html/confirmation.html?orderId="+order.orderId
        }
    }).catch(() => {
        errorHandler();
    })
   }
  })
 });
};
window.onload = button;
*/