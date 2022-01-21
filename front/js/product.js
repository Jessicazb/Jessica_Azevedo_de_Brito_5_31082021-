  //parametrage pour le local storage
  Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
   } 
  Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
  }
  
  //gestion de l'url
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let productId = urlParams.get('id');

let cardsFetch = function () {
    fetch("http://localhost:3000/api/products/"+productId)
    .then((response) => response.json())
    .then((product) => {
  
    console.log(product);


   // ajout des cards sur la page produit 
    document.getElementsByClassName("item__img")[0].innerHTML = 
    '<img src="'+product.imageUrl+'" alt="Photographie d\'un canapé">';
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;
    

 //fonction pour la gestion du panier en local storage
    function ItemPanier(productId, quantity, color){
        let panier = [];
        if(!localStorage.getItem("panier")){
            localStorage.setItem("panier", JSON.stringify(panier));
        }else{
            panier = localStorage.getItem("panier");
            panier = JSON.parse(panier)
        }
        //vérifie l'id de l'url pour enregistré le bon produit avec le bon id et gerer sa quantité
        if(quantity => 1){
            let index = panier.findIndex(item => item.id == productId)
            if(index > -1){
                panier[index][[color]] = parseInt(quantity);  // convertir en nombre
            }else{
                panier.push({"id":productId, [color]: parseInt(quantity)});
            }
        }
        console.log(panier);

        localStorage.setItem("panier", JSON.stringify(panier)); // enrengistrer la valeur récuperée
    }

    //envoie les différentes couleurs des canapés
    if(product){  //renvoie true 
    for (let j=0; j<product.colors.length; j++){
        document.getElementById("colors").innerHTML+=
        '<option value="'+product.colors[j]+'">'+product.colors[j]+'</option>';
    }
      // buton au clic redirectionne à la pag panier 
       document.getElementById("addToCart").addEventListener("click", event=>{
        ItemPanier(product._id, document.getElementById("quantity").value, document.getElementById("colors").value);
        window.location = "./cart.html"
    });
      
    }else{
        // gère la redirection si produit inexistant
        window.location = "./index.html"
    }
 

    });
};
    
cardsFetch();

  

