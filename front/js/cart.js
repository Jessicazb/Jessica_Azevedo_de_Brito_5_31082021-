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
});
};