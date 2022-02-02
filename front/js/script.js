let cardsFetch = function () {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((products) => {
  
      // Boucle d'envoi des produits en html
      for (let i=0; i<products.length; i++){
        document.getElementById("items").innerHTML+=
        '<a href="./product.html?id='+products[i]._id+'">'+
          '<article>'+
            '<img src="'+products[i].imageUrl+'" alt="'+products[i].altTxt+'+'+products[i].name+'">'+
            '<h3 class="productName">'+products[i].name+'</h3>'+
            '<p class="productDescription">'+products[i].description+'</p>'+
          '</article>'+
        '</a>';
        };
      });
  };
  cardsFetch();
