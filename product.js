const createProduct = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get('id');

    const serverResponse = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await serverResponse.json();

    //imaginea
    const productImage = document.querySelector('.product-image');
    productImage.style.backgroundImage = `url('${data.image}')`;
    productImage.style.height = '300px';

    //titlul
    const productTitle = document.querySelector('.product-title');
    productTitle.innerText = data.title;

    //descrierea
    const productDescription = document.querySelector('.product-description');
    productDescription.innerText = data.description;

    console.log(data);
};

createProduct();