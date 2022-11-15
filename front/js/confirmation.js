// On récupere l'endroit ou nous allons afficher notre id de commande et on l'injecte dans notre url de page et dans le texte
//on fini par effacer notre panier car la commande est passé
function displayConfirmation() {
    const orderIdNumber = document.getElementById('orderId');
    var str = window.location.href;
    var url = new URL(str);
    orderIdNumber.innerText = url.searchParams.get('orderId');
    localStorage.removeItem('cart');
}

displayConfirmation();