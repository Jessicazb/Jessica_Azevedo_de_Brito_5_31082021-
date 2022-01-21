 //parametrage pour le local storage
 Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
  } 
  Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
  }
 
    // Envoie les produits dans le panier
  for (let i=0; i<localStorage.getObj("panier").length; i++){
    //recuperation id de la ligne panier
   let productId = localStorage.getObj("panier")[i].id; 
   fetch("http://localhost:3000/api/products/"+productId)
   .then((response) => response.json())
   .then((product) => {

    console.log(product);

    let totalPrice = 0
    let totalItem = 0
  
      // calcul du prix total de la commande 
   totalPrice += parseInt(localStorage.getObj("panier")[i].quantity) * product.price;
  
   //calcul du nombre d'article
   totalItem += parseInt(localStorage.getObj("panier")[i].quantity)* productId;

// Affichage des articles 
document.getElementById("cart__items").innerHTML+=
'<article class="cart__item" data-id='+localStorage.getObj("panier")[i].id+' data-color='+localStorage.getObj("panier")[i].color+'>'+
  '<div class="cart__item__img">'+
    '<img src='+product.imageUrl+' alt="Photographie d\'un canapé">'+
  '</div>'+
  '<div class="cart__item__content">'+
    '<div class="cart__item__content__description">'+
      '<h2>'+product.name+'</h2>'+
      '<p> '+localStorage.getObj("panier")[i].color+' </p>'+
      '<p> '+totalPrice+' €</p>'+
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
 /*
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

  */





 
});
};

