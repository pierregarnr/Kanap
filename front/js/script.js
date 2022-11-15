// Créer une constante qui selectionne l'id items dans notre index
const wrapper = document.getElementById('items');

// Créer une fonction asynchrone pour retourner le résultat de mes données API en format JSON
const getKanaps = async () => {
  return await fetch('http://localhost:3000/api/products')
    .then(donneekanaps => donneekanaps.json())
}

// Retourne une chaine de caractère avec les valeurs de nos canapés
function createProduct(kanap) {

  return `<a href='./product.html?id=${kanap._id}'>
            <article>
              <img src='${kanap.imageUrl}' alt='${kanap.altTxt}'>
              <h3 class='productName'>${kanap.name}</h3>
              <p class='productDescription'>${kanap.description}</p>
            </article>
          </a>`
}

/* Créer une fonction asynchrone qui contient un constante avec toutes les données des canapés de notre API 
 On récupere notre element html (items) pour l'injection dynamique pour chaque canapé avec la fonction createProduct
*/
const displayProducts = async () => {
  try {
    const arrayProducts = await getKanaps();
    wrapper.innerHTML = arrayProducts.map(createProduct).join('');
  }catch(e) {
    console.log('Une erreur est survenue!' , e);
  }
}

document.addEventListener('DOMContentLoaded', displayProducts);





