//parametrage pour le local storage
Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

//gestion de l'url
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let productId = urlParams.get('id');


let cardsFetch = function () {
    fetch("http://localhost:3000/api/products/" + productId)
        .then((response) => response.json())
        .then((product) => {

            console.log(product);

            // ajout des cards sur la page produit 
            document.getElementsByClassName("item__img")[0].innerHTML =
                '<img src="' + product.imageUrl + '" alt="Photographie d\'un canapé">';
            document.getElementById("title").innerHTML = product.name;
            document.getElementById("price").innerHTML = product.price;
            document.getElementById("description").innerHTML = product.description;


            //fonction pour la gestion du panier en local storage
            function ItemPanier(productId, quantity, color) {
                let panier = [];
                if (!localStorage.getObj("panier")) {
                    localStorage.setObj("panier", panier);
                } else {
                    panier = localStorage.getObj("panier");
                }
                quantity = parseInt(quantity);
                //vérifie l'id de l'url pour enregistré le bon produit avec le bon id et gerer sa quantité
                if (quantity > 0 && color.length > 0) {
                    let exist = false;
                    for (let i = 0; i < panier.length; i++) {
                        if (panier[i].productId == productId && panier[i].color == color) {
                            panier[i].quantity += quantity;
                            exist = true
                        }
                    }
                    // gestion de la quantité et de quantités de coulors des articles 
                    if (exist == false) {
                        panier.push({ "productId": productId, "color": color, "quantity": quantity });
                    }
                    // enrengistrement de la valeur récuperée dans le localStorage
                    localStorage.setObj("panier", panier);
                    window.location = "./cart.html";
                }
                // condition si la couleur et la quantité ne sont pas saisies 
                else {
                    alert("Veuillez saisir une quantité valide et selectioner une couleur");
                }
            }

            //envoie les différentes couleurs des canapés
            if (product) {
                for (let j = 0; j < product.colors.length; j++) {
                    document.getElementById("colors").innerHTML +=
                        '<option value="' + product.colors[j] + '">' + product.colors[j] + '</option>';
                }
                // buton au clic redirectionne à la pag panier 
                document.getElementById("addToCart").addEventListener("click", event => {
                    ItemPanier(product._id, document.getElementById("quantity").value, document.getElementById("colors").value);
                });

            } else {
                // gère la redirection si produit inexistant
                window.location = "./index.html"
            }


        });
};

cardsFetch();



