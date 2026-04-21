// Initialize cart and orders from LocalStorage or empty arrays if first time
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// 1. Function to Add to Cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(name + " added to cart!");
}

// 2. Update Cart Count in Header
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }
}

// 3. Process Checkout (Move cart to order history)
function checkout() {
    if (cart.length === 0) return alert("Cart is empty!");
    
    const newOrder = {
        id: "#" + Math.floor(Math.random() * 100000),
        date: new Date().toLocaleDateString(),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + item.price, 0)
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart after checkout
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'orders.html'; // Redirect to history
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
