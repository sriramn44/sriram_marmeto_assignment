fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json')
.then(response => response.json())
.then(data => {
    const product = data.product;
    document.getElementById('product-title').innerText = product.title;
    document.getElementById('product-description').innerHTML = product.description;
    document.getElementById('product-price').innerText = `Price: ${product.price}`;
    document.getElementById('compare-price').innerText = `Compare at Price: ${product.compare_at_price}`;
    
    const percentOff = Math.round(((product.compare_at_price.replace('$', '') - product.price.replace('$', '')) / product.compare_at_price.replace('$', '')) * 100);
    document.getElementById('percent-off').innerText = `${percentOff}% Off`;
    
    const mainImage = product.images[0].src;
    document.getElementById('main-image').src = mainImage;
    
    const thumbnailsContainer = document.querySelector('.thumbnails');
    product.images.forEach(image => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image.src;
        thumbnail.alt = 'Thumbnail Image';
        thumbnail.classList.add('thumbnail-image');
        thumbnail.addEventListener('click', () => {
            document.getElementById('main-image').src = image.src;
        });
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    const colorSelect = document.getElementById('color-select');
    product.options[0].values.forEach(value => {
        const colorBlock = document.createElement('div');
        colorBlock.classList.add('color-block');
        colorBlock.style.backgroundColor = value[Object.keys(value)[0]];
        colorBlock.addEventListener('click', () => {
            const selectedColorBlock = document.querySelector('.selected-color');
            if (selectedColorBlock) {
                selectedColorBlock.classList.remove('selected-color');
            }
            colorBlock.classList.add('selected-color');
        });
        colorSelect.appendChild(colorBlock);
    });
    
    const sizeSelect = document.getElementById('size-select');
    product.options[1].values.forEach(value => {
        const radioLabel = document.createElement('label');
        radioLabel.classList.add('size-radio');
        radioLabel.textContent = value;
        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'size';
        radioButton.value = value;
        sizeSelect.appendChild(radioButton);
        sizeSelect.appendChild(radioLabel);
    });
});

function decrementQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantity--;
    }
    quantityInput.value = quantity;
}

function incrementQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    quantity++;
    quantityInput.value = quantity;
}

function addToCart() {
    const color = document.querySelector('.selected-color').style.backgroundColor;
    const size = document.querySelector('input[name="size"]:checked').value;
    const quantity = document.getElementById('quantity').value;
    const productName = document.getElementById('product-title').innerText;
    const message = `${quantity} ${productName} with Color ${color} and Size ${size} added to cart`;
    document.getElementById('cart-message').innerText = message;
}

