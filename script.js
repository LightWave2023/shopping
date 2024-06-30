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
    window.location.href = 'Login.html'; // Assuming you have a login.HTML as the login page  
}
function login() {  
    var loginUsername = document.getElementById('loginUsername').value;  
    var loginPassword = document.getElementById('loginPassword').value;  
  
    // Attempt to obtain username and password from localStorage 
    var storedUsername = localStorage.getItem('username');  
    var storedPassword = localStorage.getItem('password');  
    var expiration = localStorage.getItem('expiration');  
  
    // Check if the username and password have been set and have not expired 
    if (expiration && new Date().getTime() < parseInt(expiration)) {  
        // If the user has not entered a username and password, and the username and password are remembered and have not expired, attempt automatic login  
        if (loginUsername === '' && loginPassword === '') {  
            if (storedUsername && storedPassword) {  
                // This is just a simulation of the client, and there will be server verification in real applications  
                alert('Auto login successful!');  
                // Jump to shopping page  
                window.location.href = 'shopping.html';  
                return;  
            }  
        }  
    }  
  
    // The username or password is empty, expired, or manually entered by the user  
    if (loginUsername !== '' && loginPassword !== '') {  
        // The username and password have been entered, perform login verification  
        if (loginUsername === storedUsername && loginPassword === storedPassword) {  
            alert('Login successful!');  
            // Jump to shopping page  
            window.location.href = 'shopping.html';  
        } else {  
            alert('Incorrect username or password!');  
        }  
    } else {  
        alert('Please fill in both username and password.');  
    }  
}


function checkLogin() {  
    // 假设有一个函数或变量可以检查用户是否已登录  
    var isLoggedIn = false; // 这里应该根据实际情况来设置  
  
    if (!isLoggedIn) {  
        // 如果用户未登录，则重定向到登录页面，并传递一个参数以便登录后重定向回购物车页面  
        window.location.href = "Login.html?redirect=shoppingPage";  
    }  
}  

// 假设这是登录页面的JavaScript代码片段  
window.onload = function() {  
    var redirectUrl = new URLSearchParams(window.location.search).get('redirect');  
  
    // 登录按钮或表单的提交事件处理函数中  
    function onLoginSuccess() {  
        if (redirectUrl) {  
            // 如果存在重定向URL，则跳转到该URL  
            window.location.href = redirectUrl;  
        } else {  
            // 否则，跳转到默认页面（可能是主页）  
            window.location.href = "home.html";  
        }  
    }  
  
    // ... 其他登录相关的代码 ...  
};
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
  
    // 验证规则（这里只是简单的非空检查，你可以添加更复杂的验证）  
    var isValid = true;  
    if (!name) {  
        alert('Please enter your name.');  
        isValid = false;  
    }  
    if (!email) {  
        alert('Please enter your email.');  
        isValid = false;  
    }  
    // 你可以继续添加其他字段的验证...  
  
    // 如果所有字段都有效，返回true以允许表单提交  
    // 否则返回false阻止表单提交  
    return isValid;  
}  
  
function showModal() {  
    // 这里应该是显示模态框的代码  
    // 例如：alert('Form submitted successfully!');  
    console.log('Form submitted successfully!');  
    // 注意：在实际应用中，你可能希望使用更复杂的模态框库，如Bootstrap Modal等  
}  
