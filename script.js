//I am Vincent
function createUser() {  
    var username = document.getElementById('username').value;  
    var password = document.getElementById('password').value;  
  
    // Simple client verification  
    if (username === '' || password === '') {  
        alert('Please fill in both username and password.');  
        return;  
    }  
  
    // Assuming successful verification, store username and password  
    localStorage.setItem('username', username);  
    localStorage.setItem('password', password);  
    // Set expiration time (only storing timestamps here, additional logic is needed to check for expiration)  
    localStorage.setItem('expiration', new Date().getTime() + 3 * 24 * 60 * 60 * 1000); // Expires in 3 days  
  
    // Prompt the user for successful registration and redirect to the login page (if necessary)  
    alert('Registration successful!');  
    window.location.href = 'shopping.html'; // Assuming you have a login.HTML as the login page  
}
function login() {  
    var loginUsername = document.getElementById('loginUsername').value;  
    var loginPassword = document.getElementById('loginPassword').value;  
  
    // Attempt to obtain username and password from localStorage  
    var storedUsername = localStorage.getItem('username');  
    var storedPassword = localStorage.getItem('password');  
    // Assuming that the logic of the expiration has already been processed on the server side, we will not check it again here  
  
    // If the user has not entered their username and password and has already remembered them (assuming they are always valid)  
    if (loginUsername === '' && loginPassword === '') {  
        if (storedUsername && storedPassword) {  
            // This is just a simulation of the client, and there will be server validation in practical applications  
            alert('Auto login successful!');  
            // Hide login container and display shopping cart page  
            hideLoginShowShopping();  
            return;  
        }  
    }  
  
    // The username or password is empty, or manually entered by the user  
    if (loginUsername !== '' && loginPassword !== '') {  
        // The username and password have been entered for login verification (this is only a simulation)  
        if (loginUsername === storedUsername && loginPassword === storedPassword) {  
            alert('Login successful!');  
            // Hide login container and display shopping cart page 
            hideLoginShowShopping();  
        } else {  
            alert('The username or password is incorrect!');  
        }  
    } else {  
        alert('Please provide your username and password.');  
    }  
  
    // Auxiliary function: Hide login container and display shopping cart page  
    function hideLoginShowShopping() {  
        var loginContainer = document.getElementById('loginContainer');  
        var shoppingPage = document.getElementById('shoppingPage');  
        loginContainer.style.display = 'none';  
        shoppingPage.style.display = 'block';  
    }  
}

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
document.getElementById('contactForm').addEventListener('submit', function(event) {  
    event.preventDefault(); // Block the default submission behavior of forms  
    
    // Clear previous success messages (if any)  
    document.getElementById('successMessage').style.display = 'none';  
    
    // AJAX requests or other backend processing logic can be added here to send data  
    // For demonstration purposes, we will only display a success message  
    
    // Display success message  
    document.getElementById('successMessage').style.display = 'block';  
    
    // Clear form fields (optional)  
    this.reset();  
  });
  
  function validateForm() {  
    // 获取表单输入  
    var name = document.getElementById('name').value;  
    var email = document.getElementById('email').value;  
    var date = document.getElementById('date').value;  
    var message = document.getElementById('message').value;  
    var requirement1 = document.getElementById('requirement1').value;  
    var requirement2 = document.getElementById('requirement2').value;  
  
    // Validation rules (here is just a simple non empty check, you can add more complex validations)  
    var isValid = true;  
    if (!name) {  
        alert('Please enter your name.');  
        isValid = false;  
    }  
    if (!email) {  
        alert('Please enter your email.');  
        isValid = false;  
    }  
    // You can continue to add validation for other fields
  
    // If all fields are valid, return true to allow form submission  
    // Otherwise, return false to prevent form submission 
    return isValid;  
}  
  
function showModal() {  
    // This should be the code for displaying the modal box 
    // alert('Form submitted successfully!');  
    console.log('Form submitted successfully!');  
    // Note: In practical applications, you may want to use more complex modal box libraries, such as Bootstrap Modal, etc 
}  
