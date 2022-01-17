 //gestion de l'url
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let sid = urlParams.get('id');

let cardsFetch = function () {
    fetch("http://localhost:3000/api/products/"+sid)
    .then((response) => response.json())
    .then((product) => {
  
    console.log(product);

   // ajout des cards sur la page produit 
    document.getElementsByClassName("item__img")[0].innerHTML = 
    '<img src="'+product.imageUrl+'" alt="Photographie d\'un canapé">';

    function detailsProduits(y, z){
    document.getElementById(y).innerHTML+= z;
    };
    detailsProduits ("title", product.name);
    detailsProduits("price", product.price);
    detailsProduits ("description", product.description);
    
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

 //fonction pour la gestion du panier en local storage
    function ItemPanier(productId, quantity, color){
    if(!localStorage.getItem("panier")){
        localStorage.setItem("panier",[]);
    }
    let panier= localStorage.getItem("panier");
//vérifie l'id de l'url pour enregistré le bon produit avec le bonne id (Gerer la quantité)
    if(quantity=>1){
    let quantityColor= false
    for (let i=0; i<panier.length; i++){
    if(panier[i].id === productId){
    quantityColor = i;
 }
    }
    //Gestion de la couleur et sa quantité
    if(quantityColor!==false){
    if(panier[quantityColor].color === color){
    panier[quantityColor].quantity = parseInt(panier[quantityColor].quantity) + parseInt(quantity);
    }
    else{
    panier.push({"id":productId,"quantity":quantity,"color":color});
  }
    }
     }
      localStorage.setItem("panier",panier);
    }

    //envoie les différentes couleurs des canapés
    if(product!==false){
      for (let j=0; j<product.colors.length; j++){
        document.getElementById("colors").innerHTML+=
        '<option value="'+product.colors[j]+'">'+product.colors[j]+'</option>';
      }
      // buton au clic redirectionne à la pag panier 
       document.getElementById("addToCart").addEventListener("click", event=>{
        ItemPanier(product._id, document.getElementById("quantity").value, document.getElementById("colors").value);
      });
      
    }else{
        // gère la redirection si produit inexistant
        window.location = "./index.html"
      }
 

    });
};
    
cardsFetch();

  

