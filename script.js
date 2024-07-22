
//--------------Select Elements-------------


const productCardsContainer = document.querySelector(".product-cards-container");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const cartCount = document.querySelector(".cart-count");
const totalPriceDisplay = document.querySelector(".total-price");
const searchBar = document.querySelector(".search-bar");
const mensClothingCategory = document.querySelector(".mens-clothing");
const womensClothingCategory = document.querySelector(".womens-clothing");
const electronicsCategory = document.querySelector(".electronics");
const jeweleryCategory = document.querySelector(".jewelery");

//--------------Categories-------------

const categoriesMenu = document.querySelector(".categories-menu");
const overlayCategories = document.querySelector(".overlay-categories");

const showCategoriesMenu = () => {
    categoriesMenu.style.transform = "translateX(0%)";
    overlayCategories.style.display = "block";
}
const hideCategoriesMenu = () => {
    categoriesMenu.style.transform = "translateX(-448px)";
    overlayCategories.style.display = "none";
};

hamburgerMenu.addEventListener("click", showCategoriesMenu);
overlayCategories.addEventListener("click", hideCategoriesMenu);

//--------------Create Product Carts-------------

const createProductCarts = async () => {
    let serverResponse = await fetch("https://fakestoreapi.com/products");
    let data = await serverResponse.json();

    for(let i = 0; i<data.length; i++){
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
        cardContainer.dataset.category = data[i].category.toLowerCase();

        const cardImageLink = document.createElement('a');
        cardImageLink.setAttribute('href', `./product.html?id=${data[i].id}`);

        // <a href="/product?id=1"></a>
        const cardImage = document.createElement("div");
        cardImage.classList.add("product-card-image");
        cardImage.style.backgroundImage = `url('${data[i].image}')`;

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
        cardContent.innerHTML = `
            <h3 class="product-title"> ${data[i].title}</h3>
            <p class="product-description"> ${data[i].description} </p>
            <p class="product-price">$${data[i].price} </p>
        `;

        const addToCartButton = document.createElement("button");
        addToCartButton.innerText = "ADD TO CART";
        addToCartButton.classList.add("add-to-cart-button")

        addToCartButton.addEventListener("click", () => {
            const productData = {
                id: data[i].id,
                title: data[i].title,
                price: data[i].price,
                image: data[i].image,
            };
            addToCart(productData);
        });

        cardImageLink.appendChild(cardImage);
        cardContainer.appendChild(cardImageLink)
        cardContainer.appendChild(cardContent);
        cardContainer.appendChild(addToCartButton);
        productCardsContainer.appendChild(cardContainer);
    }
};

createProductCarts();

//--------------Update Cart-------------

const cartProducts = [];
const cartProductsContainer = document.querySelector(".cart-products-container");

const addToCart = (product) => {
    const productIndex = cartProducts.findIndex((element) => element.id === product.id);
    
        if (productIndex === -1) {
            const productToBePushed = {
                ...product,
                quantity: 1
            };
            cartProducts.push(productToBePushed);
        } else {
            cartProducts[productIndex].quantity = cartProducts[productIndex].quantity + 1;
        }

        updateCart();
};

const removeFromCart = (productId) => {
    const productIndex = cartProducts.findIndex((element) => element.id === productId);

    if (cartProducts[productIndex].quantity === 1) {
        cartProducts.splice(productIndex, 1);
    } else {
        cartProducts[productIndex].quantity = cartProducts[productIndex].quantity - 1;
    }

    updateCart();
};

const updateCart = () => {
    cartProductsContainer.innerHTML = '';

    for (let i = 0;i < cartProducts.length;i++) {
        const productSection = document.createElement("div")   
        productSection.classList.add("product-section");    
        
        const productData = document.createElement("div");
        productData.classList.add("product-data")

        productData.innerHTML = `
        <div>
            <h4 class="cart-product-title"> ${cartProducts[i].title} </h4>
            <div>
                <div class="cart-product-prices">
                    <p> Price: $${cartProducts[i].price} </p>
                    <p> Total: $${cartProducts[i].price * cartProducts[i].quantity} </p>
                </div>
                <div class="cart-product-quantity">
                    <button class="cart-product-quantity-button minus-one-item-from-cart"> - </button>
                    <div>
                        <p> ${cartProducts[i].quantity} </p>
                    </div>
                    <button class="cart-product-quantity-button plus-one-item-to-cart"> + </button>
                </div>
            </div>
        </div>
        <div>
            <img class="cart-product-image-container" src="${cartProducts[i].image}" />
        </div>
        `;

        const plusButton = productData.querySelector(".plus-one-item-to-cart");
        plusButton.addEventListener("click", () => {
            const productData = {
                id: cartProducts[i].id,
                title: cartProducts[i].title,
                price: cartProducts[i].price,
                image: cartProducts[i].image
            }

            addToCart(productData);
        });

        const minusButton = productData.querySelector(".minus-one-item-from-cart");
        minusButton.addEventListener("click", () => {
            removeFromCart(cartProducts[i].id);
        });

        productSection.appendChild(productData);
        cartProductsContainer.appendChild(productSection);
    }

    if (sideBar.style.transform !== "translateX(0%)") {
        sideBar.style.transform = "translateX(0%)";
        overlay.style.display = "block";
    }
}; 

//--------------Search Functionality-------------

const filterProducts = (searchTerm) => {
    const productCards = productCardsContainer.querySelectorAll(".card-container");
    searchTerm = searchTerm.toLowerCase();

    productCards.forEach(card => {
        const title = card.querySelector(".product-title").innerText.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
};

searchBar.addEventListener("input", () => {
    let searchTerm = searchBar.value;
    filterProducts(searchTerm);
});

//--------------Displaying Categories-------------

const categorisingProducts = (category) => {
    const productCards = productCardsContainer.querySelectorAll(".card-container");
    category = category.toLowerCase();

    productCards.forEach(card => {
        let cardCategory = card.dataset.category.toLowerCase();
        if (category === cardCategory){
            card.style.display = "block";
        } else {
            card.style.display = "none";
            categoriesMenu.style.transform = "translateX(-448px)";
            overlayCategories.style.display = "none";
        }
    });
    hideCategoriesMenu();
};

mensClothingCategory.addEventListener("click", () => {
    categorisingProducts("men's clothing");
});

womensClothingCategory.addEventListener("click", () => {
    categorisingProducts("women's clothing");
});

electronicsCategory.addEventListener("click", () => {
    categorisingProducts("electronics");
});

jeweleryCategory.addEventListener("click", () => {
    categorisingProducts("jewelery");
});
