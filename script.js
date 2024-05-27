//I am Vincent
// Define an empty array to store user information  
var users = [];  
  
// Page initialization function, assuming there are corresponding page elements  
function init() {  
    // Hide all pages  
    var pages = document.querySelectorAll('.page');  
    for (var i = 0; i < pages.length; i++) {  
        pages[i].style.display = 'none';  
    }  
      
    // Display Create User Page  
    showPage('createUserPage');  
}  
  
/**  
 * Display the page with the specified ID and hide all other pages  
 *  
 * @param {string} pageId - The ID of the page to be displayed  
 */  
function showPage(pageId) {  
    // Hide all pages  
    var pages = document.querySelectorAll('.page');  
    for (var i = 0; i < pages.length; i++) {  
        pages[i].style.display = 'none';  
    }  
    // Display the page with the specified ID  
    document.getElementById(pageId).style.display = 'block';  
}  
  
/**  
 * Create a new user and add it to the user array, then jump to the login page  
 */  
function createUser() {  
    // Get the values of the username and password input boxes  
    var username = document.getElementById("username").value;  
    var password = document.getElementById("password").value;  
    // Add new user information to the user array  
    users.push({ username: username, password: password });  
    // Display a prompt for successfully creating a user  
    alert('User ' + username + ' created!');  
    // Jump to login page  
    showPage('loginPage');  
}  
  
/**  
 * Verify login information. If correct, redirect to the shopping page. Otherwise, return to the user creation page  
 */  
function login() {  
    // Obtain the values of the username and password input boxes on the login page  
    var loginUsername = document.getElementById("loginUsername").value;  
    var loginPassword = document.getElementById("loginPassword").value;  
    var found = false; // Mark whether a matching user was found  
    // Traverse user arrays to find matching usernames and passwords  
    for (var i = 0; i < users.length; i++) {  
        if (users[i].username === loginUsername && users[i].password === loginPassword) {  
            found = true; // Found a matching user and set it to true  
            break; // Jump out of loop  
        }  
    }  
    // If a matching user is found, redirect to the shopping page  
    if (found) {  
      alert('User ' + loginUsername + ' logged in!');
        showPage('shoppingPage');  
    } else {  
        // If no matching user is found, return to the Create User page  
        showPage('createUserPage');  
        // Display error messages (if needed)  
        alert("Invalid username or password. Please try again.");  
    }  
}  
  
// Assuming that the init function is executed after the page loading is completed  
window.onload = init;  
  
/**  
 * Calculate the total price of items in the shopping cart and display it on the page  
 */  
var cart = {}; // Shopping Cart Object  
  
  // script.js  
document.addEventListener('DOMContentLoaded', function() {  
    // Get all product and cart summary elements  
    const products = document.querySelectorAll('.product');  
    const productTotalsElement = document.getElementById('product-totals');  
    const totalPriceElement = document.getElementById('total-price');  
  
    // Changes in the number of listeners input box  
    products.forEach(function(product) {  
        const quantityInput = product.querySelector('.quantity');  
        quantityInput.addEventListener('input', function() {  
            calculateTotals();  
        });  
    });  
  
    // Listen for the click event of the remove button  
    document.querySelectorAll('.remove').forEach(function(removeButton) {  
        removeButton.addEventListener('click', function() {  
            // Get the product index to be deleted  
            const productIndex = parseInt(removeButton.dataset.productIndex, 10);  
  
            // Check if the index is valid and reset the product quantity to 0  
            if (productIndex >= 0 && productIndex < products.length) {  
                products[productIndex].querySelector('.quantity').value = 0;  
                // Recalculate the total price  
                calculateTotals();  
            }  
        });  
    });  
  
    // Calculate total price  
    function calculateTotals() {  
        let totalPrice = 0;  
        let productTotalsHTML = '';  
  
        products.forEach(function(product) {  
            const quantity = parseInt(product.querySelector('.quantity').value, 10) || 0;  
            const price = parseFloat(product.dataset.price);  
  
            const subtotal = quantity * price;  
            totalPrice += subtotal;  
  
            productTotalsHTML += `<p>Course${product.textContent.match(/Course(\d+)/)[1]} total price is: $${subtotal.toFixed(2)}</p>`;  
        });  
  
        productTotalsElement.innerHTML = productTotalsHTML;  
        totalPriceElement.textContent = totalPrice.toFixed(2);  
    }  
  
     // The click event of the purchase button  
     function purchase() {  
        alert('Purchase successful!');  
        // Here, you can add purchasing logic, such as sending Ajax requests to the server, etc  
        // ...  
    }  
  
    // Clear the click event of the shopping cart button  
    function clearCart() {  
        products.forEach(function(product) {  
            product.querySelector('.quantity').value = 0; // Set quantity to 0  
        });  
        calculateTotals(); // Recalculate the total price 
    }  
  
    // Assuming the IDs of the purchase and delete buttons are 'purchase button' and 'clear part button', respectively  
    const purchaseButton = document.getElementById('purchase-button');  
    if (purchaseButton) {  
        purchaseButton.addEventListener('click', purchase);  
    }  
  
    const clearCartButton = document.getElementById('clear-cart-button');  
    if (clearCartButton) {  
        clearCartButton.addEventListener('click', clearCart);  
    }  
  
    // Calculate the total price initially  
    calculateTotals();  
});
