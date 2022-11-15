const sectionCart = document.getElementById('cart__items');
let inputQuantity = document.getElementsByClassName('itemQuantity');


let totalPriceInput = document.getElementById('totalPrice');
let totalQuantityInput = document.getElementsByClassName('totalQuantity');

let cartLocal = JSON.parse(localStorage.getItem('cart'));

const fetchProducts = async () => {
  return await fetch('http://localhost:3000/api/products/')
    .then(response => response.json())
}
// préparation du patern de notre page carte
function buildProductHTML(p) {

  return `<article class='cart__item' data-id='${p.productId}' data-color='${p.color}'>
      <div class='cart__item__img'>
        <img src='${p.image}' alt='${p.imagealt}'>
      </div>
      <div class='cart__item__content'>
        <div class='cart__item__content__description'>
          <h2>${p.name}</h2>
          <p>${p.color}</p>
          <p>${p.price}€</p>
        </div>
        <div class='cart__item__content__settings'>
          <div class='cart__item__content__settings__quantity'>
            <p>Qté : </p>
            <input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value='${p.quantity}'>
          </div>
          <div class='cart__item__content__settings__delete'>
            <p class='deleteItem'>Supprimer</p>
          </div>
        </div>
      </div>
    </article>
    </section> `
}

//On créer une fonction qui utilise la méthode find pour trouver les elements semblables
function getPriceById(productList, productId) {
  const p = productList.find(product => product._id == productId)
  return p.price
}

// créer une fonction qui récupère les caractéristiques du fetch
async function setProductsPrices() {
  const products = await fetchProducts();
  cartLocal = cartLocal.map(p => {
    p['price'] = getPriceById(products, p.productId)
    return p
  });
}

// Faire une fonction pour afficher les articles sauvergardés dans mon localstorage 
function displayCart(cartLocal) {
  // si le pannier est vide
  if (cartLocal == null) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    sectionCart.innerHTML = emptyCart;
  }
  else {
    let basketHtml = ''
    for (let i = 0; i < cartLocal.length; i++) {
      basketHtml = basketHtml + buildProductHTML(cartLocal[i])
    }
    sectionCart.innerHTML = sectionCart.innerHTML + basketHtml;
  }
}

// On ajoute un addeventlistener avec change sur notre input quantity
function handleQuantityChange() {
  const inputQuantity = document.querySelectorAll('.itemQuantity')


  for (let i = 0; i < inputQuantity.length; i++) {
    const qtyButton = inputQuantity[i]
    
    qtyButton.addEventListener('change', () => {
      
      let newQty = qtyButton.valueAsNumber;
      const quantityInteger = Number.isInteger(newQty) == true;
      const quantityIsInTheRightRange = (newQty >= 0 && newQty <= 100);

      if (quantityInteger && quantityIsInTheRightRange) {
        cartLocal[i].quantity = newQty;
        localStorage.setItem('cart', JSON.stringify(cartLocal));
        getTotalQtyPrice()
      } else {
        alert('Merci de séléctionner une quantité valide')
      }
    })
  }
}


function getTotalQtyPrice() {
  totalQty = 0;
  totalPrice = 0;

  for (let i = 0; i < cartLocal.length; i++) {
    totalQty += cartLocal[i].quantity;
    totalPrice += (cartLocal[i].quantity * cartLocal[i].price);
  }

  totalQuantity.innerHTML = totalQty;
  totalPriceInput.innerHTML = totalPrice;
}


//On créer une fonction qui boucle l'écoute du btn supprimer et qui moidifie notre local
function deleteProduct() {
  let deleteButtons = document.querySelectorAll('.deleteItem');
  const elementDom = document.getElementsByTagName('article');

  for (let i = 0; i < deleteButtons.length; i++) {

    deleteButtons[i].addEventListener('click', (e) => {

      let deleteId = cartLocal[i].productId;

      let deleteColor = cartLocal[i].color;

      cartLocal = cartLocal.filter(elt => elt.productId !== deleteId || elt.color !== deleteColor);


      localStorage.setItem('cart', JSON.stringify(cartLocal));
      alert(`Le canapé de couleur ${deleteColor} a été retiré du panier`);
      elementDom[i].remove();
      getTotalQtyPrice()

      if (cartLocal.length == 0) {
        sectionCart.innerHTML = `<p>Votre panier est vide</p>`;
      }

    })
  }
}

// créer un controle de formulaire afin de voir si l'utilisateur rempli des données viables
function validateForm() {

  const regExpName = /^[a-z]+([-\s]{0,1})[a-z]$/i;
  const regExpAddress = /^[a-zA-Z0-9\s,'-]*$/i;
  const regExpEmail = /[a-z][a-z0-9]+([\.-\s]{0,1}[a-z][a-z0-9]+)*@[a-z][a-z0-9]+(\.[a-z]+)*\.[a-z]{2,5}$/i;

  firstName.addEventListener('change', function () {
    validateFirstName(this);
  });

  const validateFirstName = function (inputFirstName) {

    let ErrorMsgFirstName = document.getElementById('firstNameErrorMsg');

    if (regExpName.test(inputFirstName.value)) {
      ErrorMsgFirstName.innerHTML = '';
    } else {
      ErrorMsgFirstName.innerHTML = 'Veuillez rentrer un prénom valide'
    }
  }

  lastName.addEventListener('change', function () {
    validateLastName(this);
  });

  const validateLastName = function (inputLastName) {

    let ErrorMsgLastName = document.getElementById('lastNameErrorMsg');

    if (regExpName.test(inputLastName.value)) {
      ErrorMsgLastName.innerHTML = '';
    } else {
      ErrorMsgLastName.innerHTML = 'Veuillez rentrer un name de famille valide'
    }
  };

  address.addEventListener('change', function () {
    validateAddress(this);
  });

  const validateAddress = function (inputAddress) {

    let ErrorMsgAddress = document.getElementById('addressErrorMsg');

    if (regExpAddress.test(inputAddress.value)) {
      ErrorMsgAddress.innerHTML = '';
    } else {
      ErrorMsgAddress.innerHTML = 'Veuillez rentrer une adresse valide'
    }
  };


  city.addEventListener('change', function () {
    validateCity(this);
  });

  const validateCity = function (inputCity) {

    let ErrorMsgCity = document.getElementById('cityErrorMsg');

    if (regExpName.test(inputCity.value)) {
      ErrorMsgCity.innerHTML = '';
    } else {
      ErrorMsgCity.innerHTML = 'Veuillez rentrer un name de ville valide'
    }
  };

  // Vérification de l'email
  email.addEventListener('change', function () {
    validateEmail(this);
  });

  const validateEmail = function (inputEmail) {

    let ErrorMsgEmail = document.getElementById('emailErrorMsg');

    if (regExpEmail.test(inputEmail.value)) {
      ErrorMsgEmail.innerHTML = '';
    } else {
      ErrorMsgEmail.innerHTML = 'Veuillez rentrer un email valide'
    }
  };
};


//On envoi ensuite les données via un fetch get en configurant l'objet a envoyer
function sendData() {

  let form = document.querySelector('.cart__order__form');

  console.log(form)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupération des données du formulaire
    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAdress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputEmail = document.getElementById('email');

    //creation d'un array vide dans le localstorage
    let productsId = [];

    for (let i = 0; i < cartLocal.length; i++) {
      productsId.push(cartLocal[i].productId)
    }

    // Assemblage des données envoyées
    const orders = {
      contact: {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputEmail.value,
      },
      products: productsId,
    }
    const postInfos = {
      method: 'POST',
      body: JSON.stringify(orders),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    fetch('http://localhost:3000/api/products/order', postInfos)
      .then((response) => response.json())
      .then((data) => {
        document.location.href = 'confirmation.html?orderId=' + data.orderId;
      })
      .catch((error) => {
        alert('Problème rencontré avec fetch : ' + error.message);
      });
  })
}

async function main() {
  await setProductsPrices()
  displayCart(cartLocal);
  deleteProduct();

  getTotalQtyPrice();
  handleQuantityChange();
  validateForm();
}

main();
sendData();


