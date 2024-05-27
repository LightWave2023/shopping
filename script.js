//I am Vincent
// 定义一个空数组用于存储用户信息  
var users = [];  
  
// 页面初始化函数，假设有相应的页面元素  
function init() {  
    // 隐藏所有页面  
    var pages = document.querySelectorAll('.page');  
    for (var i = 0; i < pages.length; i++) {  
        pages[i].style.display = 'none';  
    }  
      
    // 显示创建用户页面  
    showPage('createUserPage');  
}  
  
/**  
 * 显示指定ID的页面，并隐藏其他所有页面  
 *  
 * @param {string} pageId - 要显示的页面的ID  
 */  
function showPage(pageId) {  
    // 隐藏所有页面  
    var pages = document.querySelectorAll('.page');  
    for (var i = 0; i < pages.length; i++) {  
        pages[i].style.display = 'none';  
    }  
    // 显示指定ID的页面  
    document.getElementById(pageId).style.display = 'block';  
}  
  
/**  
 * 创建新用户并添加到用户数组中，然后跳转到登录页面  
 */  
function createUser() {  
    // 获取用户名和密码输入框的值  
    var username = document.getElementById("username").value;  
    var password = document.getElementById("password").value;  
    // 将新用户信息添加到用户数组中  
    users.push({ username: username, password: password });  
    // 显示成功创建用户的提示  
    alert('User ' + username + ' created!');  
    // 跳转到登录页面  
    showPage('loginPage');  
}  
  
/**  
 * 验证登录信息，如果正确则跳转到购物页面，否则返回创建用户页面  
 */  
function login() {  
    // 获取登录页面上的用户名和密码输入框的值  
    var loginUsername = document.getElementById("loginUsername").value;  
    var loginPassword = document.getElementById("loginPassword").value;  
    var found = false; // 标记是否找到了匹配的用户  
    // 遍历用户数组以查找匹配的用户名和密码  
    for (var i = 0; i < users.length; i++) {  
        if (users[i].username === loginUsername && users[i].password === loginPassword) {  
            found = true; // 找到了匹配的用户，设置标记为true  
            break; // 跳出循环  
        }  
    }  
    // 如果找到了匹配的用户，则跳转到购物页面  
    if (found) {  
      alert('User ' + loginUsername + ' logged in!');
        showPage('shoppingPage');  
    } else {  
        // 如果没有找到匹配的用户，则返回创建用户页面  
        showPage('createUserPage');  
        // 显示错误消息（如果需要）  
        alert("Invalid username or password. Please try again.");  
    }  
}  
  
// 假设页面加载完成后执行init函数  
window.onload = init;  
  
/**  
 * 计算购物车中的商品总价，并显示在页面上  
 */  
var cart = {}; // 购物车对象  
  
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