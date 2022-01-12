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
  cardsFetch();

