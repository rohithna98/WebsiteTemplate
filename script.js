// Load data from LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) countElement.innerText = cart.length;
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveAndRefresh();
    alert(name + " added!");
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) {
        if (confirm("Remove item?")) cart.splice(index, 1);
        else cart[index].quantity = 1;
    }
    saveAndRefresh();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveAndRefresh();
}

function saveAndRefresh() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    if (typeof displayCart === "function") displayCart();
}

function checkout() {
    if (cart.length === 0) return alert("Cart is empty!");
    
    const orderId = "#" + Math.floor(Math.random() * 10000);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder = { id: orderId, date: new Date().toLocaleDateString(), total: total.toFixed(2) };
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    document.getElementById('order-summary-box').innerHTML = `
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Total Paid:</strong> $${total.toFixed(2)}</p>
    `;
    document.getElementById('success-modal').style.display = 'block';
    
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', updateCartCount);
