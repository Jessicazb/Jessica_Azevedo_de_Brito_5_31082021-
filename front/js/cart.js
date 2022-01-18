 //gestion de l'url
 let queryString = window.location.search;
 let urlParams = new URLSearchParams(queryString);
 let sid = urlParams.get('id');

let cardsFetch = function () {
    fetch("http://localhost:3000/api/products/"+sid)
    .then((response) => response.json())
    .then((product) => {
  
    console.log(product);

    // Gestion des éléments dans le local storage 
    function saveItem(item){
        localStorage.setItem("item",JSON.stringify(item));
     }
    // recuperation des données des éléments  
       function getItem(){
       let item = localStorage.getItem("item");
       if(item == null){
           return [];
       }else{
           return JSON.parse(item);
       }  
   
    }
   let totalPrice = 0
   let totalItem = 0
  // Envoie les produits dans le panier
   for (let i=0; i<localStorage.getItem("item").length; i++){
    let product=false;
    for (let j=0; j<product.length; j++){
      if(localStorage.getItem("item")[i] !== undefined && product[j]._id !== undefined){
        if(product[j]._id == localStorage.getItem("item")[i].id){
          product = product[j];
     }
      }
    };

 // calcul du prix total de la commande 
 let totalItemPrice = 0;
 totalItemPrice = parseInt(localStorage.getItem("item")[i].quantity) * product.price;
 totalPrice += totalItemPrice;

 // Affichage des éléments dans le panier

 document.getElementById("cart__items").innerHTML+=
 '<article class="cart__item" data-id='+localStorage.getItem("item")[i].id+' data-color='+localStorage.getItem("item")[i].color+'>'+
   '<div class="cart__item__img">'+
     '<img src='+product.imageUrl+' alt="Photographie d\'un canapé">'+
   '</div>'+
   '<div class="cart__item__content">'+
     '<div class="cart__item__content__description">'+
       '<h2>'+product.name+'</h2>'+
       '<p> '+localStorage.getItem("item")[i].color+' </p>'+
       '<p> '+totalItemPrice+' €</p>'+
     '</div>'+
     '<div class="cart__item__content__settings">'+
       '<div class="cart__item__content__settings__quantity">'+
         '<p>Qté : '+localStorage.getItem("item")[i].quantity+' </p>'+
         '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+localStorage.getItem("item")[i].quantity+'">'+
       '</div>'+
       '<div class="cart__item__content__settings__delete">'+
         '<p class="deleteItem">Supprimer</p>'+
       '</div>'+
     '</div>'+
   '</div>'+
 '</article>';


  //calcul du nombre d'article
  totalItem += parseInt(localStorage.getItem("item")[i].quantity);

  //renvoi la quantité total d'article
  document.getElementById("totalQuantity").innerHTML = totalItem;

  //renvoi le prix total
  document.getElementById("totalPrice").innerHTML = totalPrice;

   // suppression d'un article du panier 
function removeItem(product){
 let deleteItem = getItem();
 deleteItem = deleteItem.filtrer(prod => prod.id == product.id);
  saveItem(deleteItem);
}
let deleteItem = document.getElementsByClassName("deleteItem");
for (l=0; l<deleteItem.length; l++){
  deleteItem[l].addEventListener("click", function(test){
    removeProductFromCart(test.target.parentNode.parentNode.parentNode.parentNode.dataset.id, test.target.parentNode.parentNode.parentNode.parentNode.dataset.color);
  });
}

// Changer la quantité d'un élément 
function Quantity (product,quantity){
let changeQuantity = getItem();
let foundProduct = item.find(prod => prod.id == product.id);
if (foundProduct != undefined){
        foundProduct.quantity += quantity;
}     
saveItem(item);
}
let changeQuantity = document.getElementsByClassName("itemQuantity");
for(l=0; l<changeQuantity.length; l++){
  changeQuantity[l].addEventListener("change", function(testQuantity){
    changeQuantityFromCart(testQuantity.target.parentNode.parentNode.parentNode.parentNode.dataset.id, testQuantity.target.parentNode.parentNode.parentNode.parentNode.dataset.color, testQuantity.target.value);
  });
}


 }  
});
};
cardsFetch();