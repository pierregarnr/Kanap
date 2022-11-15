// Initialisation de variables et constantes globals
let currentProduct = '';
const kanapImageWrapper = document.querySelector('.item__img')
const kanapName = document.getElementById('title')
const kanapPrice = document.getElementById('price')
const kanapDescription = document.getElementById('description')
const kanapColors = document.getElementById('colors');
const itemQuantity = document.getElementById('quantity');

const wrapper = document.getElementsByClassName('item');
const buttonBasket = document.getElementById('addToCart');

let url = new URLSearchParams(location.search);
let idKanap = url.get('id');

// Récupération des données dans l'api du produit avec son id
const getKanap = async () => {
  return fetch('http://localhost:3000/api/products/' + idKanap)
    .then(datakanapes => datakanapes.json())
}

// Fonction pour mettre en place le descriptif de nos kanapés et une boucle pour nos couleurs
function setProductInfos(kanap) {
  kanapName.innerHTML = kanap.name
  kanapPrice.innerHTML = kanap.price
  kanapDescription.innerHTML = kanap.description
  kanapImageWrapper.innerHTML = `<img src='${kanap.imageUrl}' alt='${kanap.altTxt}'>`

  for (let i = 0; i < kanap.colors.length; i++) {
    let color = new Option(kanap.colors[i], kanap.colors[i]);
    kanapColors.options.add(color);
  }
}
// Affichage de nos produits 
async function displayProducts() {
  try {
    currentProduct = await getKanap();
    setProductInfos(currentProduct);
  } catch (e) {
    console.log('Une erreur est survenue!', e);
  }
}
// Vérifier qu'une quantité comprise entre 1 et 100 est séléctionné et que cela représente un nb entier
function isQuantityValid(quantity) {
  if (Number.isInteger(quantity) == false)
    return false

  if (quantity <= 0 || quantity > 100)
    return false

  return true
}

//Faire une fonction pour savoir si le client a bien séléctionné une couleur
function isColorSelected(kanapColors) {
  if (kanapColors.value)
    return true
  else {
    return false
  }
}
// Ajout au pannier en stockant la quantité et en vérifiant que la qty et la couleur sont séléctionné
function addToBasket() {
  let quantity = Number(itemQuantity.value);

  if (isQuantityValid(quantity) && isColorSelected(kanapColors))
    clientOrder();
  else
    alert('Merci de séléctionner une couleur et une quantité valide')
};
// On créer un objet avec les données de nos kanapés envoyer au pannier
function clientOrder() {
  let colorSelected = kanapColors.value;

  let productInfos = {
    color: colorSelected,
    quantity: Number(itemQuantity.value),
    productId: idKanap,
    name: currentProduct.name,
    image: currentProduct.imageUrl,
    imagealt: currentProduct.altTxt,
    description: currentProduct.description
  };
// Initialisation du localstorage dans une 'cart'
  let basketOfCustomer = JSON.parse(localStorage.getItem('cart'));

  if (basketOfCustomer) {
    const sameProduct = basketOfCustomer.find(element => element.productId === idKanap && element.color === colorSelected);
    
    if (sameProduct) {

      let newQuantity = parseInt(productInfos.quantity) + parseInt(sameProduct.quantity);
      sameProduct.quantity = newQuantity;

      localStorage.setItem('cart', JSON.stringify(basketOfCustomer));
      alert(`Votre commande de ${Number(itemQuantity.value)} ${currentProduct.name} de color ${colorSelected} est ajoutée au panier`);
    }
    else {
      basketOfCustomer.push(productInfos);
      localStorage.setItem('cart', JSON.stringify(basketOfCustomer));
      alert(`Votre commande de ${Number(itemQuantity.value)} ${currentProduct.name} de color ${colorSelected} est ajoutée au panier`);
    }
  }
  else {
    localStorage.setItem('cart', JSON.stringify([productInfos]));
    alert(`Votre commande de ${Number(itemQuantity.value)} ${currentProduct.name} de color ${colorSelected} est ajoutée au panier`);
  }
}

displayProducts();

buttonBasket.addEventListener('click', addToBasket);
