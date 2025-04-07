document.addEventListener('DOMContentLoaded', function() {
    //slider functionality
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let slideIndex = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.slider img');
        const maxIndex = Math.ceil(slides.length / 2) - 1;
        if (index > maxIndex) slideIndex = 0;
        if (index < 0) slideIndex = maxIndex;
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        slideIndex--;
        showSlide(slideIndex);
    });

    nextBtn.addEventListener('click', () => {
        slideIndex++;
        showSlide(slideIndex);
    });


    //shopping cart functionality
    let cart = [];

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        renderCart();
    }

    function removeFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        renderCart();
    }

    function clearCart() {
        cart = [];
        renderCart();
    }

    function renderCart() {
        const cartItemsContainer = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        cartItemsContainer.innerHTML = "";

        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} × ${item.quantity} 
                = $${itemTotal.toFixed(2)}
                <button class="remove" data-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(li);
        });

        cartTotal.innerText = `Total: $${total.toFixed(2)}`;
    }

    document.querySelectorAll(".cart-button").forEach(button => {
        button.addEventListener("click", event => {
            const item = event.target.closest(".menu-item");
            const name = item.querySelector("h4").textContent;
            const price = parseFloat(item.querySelector(".price").textContent.replace('$', ''));
            addToCart(name, price);
        });
    });

    document.getElementById("cart-items").addEventListener("click", event => {
        if (event.target.classList.contains("remove")) {
            const name = event.target.getAttribute("data-name");
            removeFromCart(name);
        }
    });

    document.getElementById("cart-clear").addEventListener("click", clearCart);
});