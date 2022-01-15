let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let sid = urlParams.get('id');

let cardsFetch = function () {
    fetch("http://localhost:3000/api/products/"+sid)
      .then((response) => response.json())
      .then((product) => {
  
        console.log(product);
        // document.getElementById(a).innerHTML+= b;
        document.getElementsByClassName("item__img")[0].innerHTML = 
        '<img src="'+product.imageUrl+'" alt="Photographie d\'un canapé">';
        
        function detailsProduits(a, b){
        document.getElementById(a).innerHTML+= b;
          };
        detailsProduits ("title", product.name);
        detailsProduits("price", product.price);
        detailsProduits ("description", product.description);
      });
  };
   //ajoute l'id dans l'url
   let product=false;
   for (let i=0; i<product.length; i++){
    if(product[i]._id === sid){
       product=product[i];
    }
   };
 // Gestion des éléments dans le local storage 
  function saveItem(item){
     localStorage.setItem("item",JSON.stringify(item));
  }
// recuperation du panier 
  function getItem(){
    let item = localStorage.getItem("item");
    if(item == null){
        return [];
    }else{
        return JSON.parse(item);
    }
    
  }
  // trouver produit et gerer sa quantité
  function addItem (product){
   let item = getItem();
   let foundProduct = item.find(prod => prod.id == product.id);
   if (foundProduct != undefined){
       foundProduct.quantity++;
   }else{
       product.quantity = 1;
       item.push(product);
   }
    
   saveItem(item);
  }
 // Gerer la coulor et la quantité d'un produit 
  let colorQuantity = document.getElementById("colors");
  console.log(colorQuantity);
  console.log(product.colors);
// à voir 
    product.colors.forEach((colors) => {
      console.log(document.createElement("option"));
      let tagOption = document.createElement("option");
      tagOption.innerHTML = "vert";
      tagOption.value = "vert";
      colorQuantity.appendChild(tagOption);
  });
  


  cardsFetch();

  

