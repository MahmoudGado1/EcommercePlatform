let userInfo =document.querySelector("#user_info")
let userData =document.querySelector("#user")
let links =document.querySelector("#links")

if(localStorage.getItem("username")){
    links.remove()
    userInfo.style.display = "flex"
    userData.style.display="flex"
    userData.innerHTML = localStorage.getItem("username")
}
let logOutBtn=document.querySelector("#logout")
logOutBtn.addEventListener("click",function(){
    localStorage.clear();
    setTimeout(() => {
        window.location="login.html"
    }, 1000);
})
// /////////////////////////////
let allProducts=document.querySelector(".product")
let products = [
    {
        id:1,
        title:"T-Shirt",
        price:"80",
        category:"fashion",
        imageUrl:"images/shop/24.jpg"
    },
    {
        id:2,
        title:"Hat",
        price:"40",
        category:"Men Accessories",
        imageUrl:"images/shop/11.jpg"
    },
    {
        id:3,
        title:"Bag",
        price:"60",
        category:"fashion",
        imageUrl:"images/shop/3.jpg"
    },
    {
        id:4,
        title:"Shoes",
        price:"80",
        category:"Men Accessories",
        imageUrl:"images/shop/4.jpg"
    },
    {
        id:5,
        title:"Skullies",
        price:"20",
        category:"Men Accessories",
        imageUrl:"images/shop/5.jpg"
    },
    {
        id:6,
        title:"Watch",
        price:"20",
        category:"Men Accessories",
        imageUrl:"images/shop/10.jpg"
    },
    {
        id:7,
        title:"T-Shirt",
        price:"70",
        category:"fashion",
        imageUrl:"images/shop/25.jpg"
    },
    {
        id:8,
        title:"Shoes",
        price:"40",
        category:"Men Accessories",
        imageUrl:"images/shop/7.jpg"
    },
    {
        id:9,
        title:"bag",
        price:"40",
        category:"fashion",
        imageUrl:"images/shop/9.jpg"
    }
]
function drawItems() {
    let y = products.map((item) => {
        return `
        <div class="card col-lg-4 col-md-6 col-12 mb-4">
            <img src="${item.imageUrl}" class="card-img-top pb-3" alt="...">
            <div class="details">
                <h3>${item.title}</h3>
                <h4>Price: ${item.price}$</h4>
                <h4 class="category">${item.category}</h4>
                <button class="mb-3 mt-3 add_to_cart btn btn-outline-light" onClick="addToCart(${item.id})">Add To Cart</button>
                <i class="fas fa-heart icon mt-3" onClick="toggleFavorite(this, ${item.id})"></i>
            </div>
        </div>
        `;
    });
    allProducts.innerHTML = y.join("");
}

// let favorites = [];
// let addedFav= localStorage.getItem("ProductFav")? JSON.parse(localStorage.getItem("ProductFav")) : [];

// function toggleFavorite(element, itemId) {
//     // Toggle background color
//     element.style.color = element.style.color === 'red' ? '#fcfcfc' : 'red';
    
//     // Add or remove from favorites
//     if (favorites.includes(itemId)) {
//         favorites = favorites.filter(id => id !== itemId);
//     } else {
//         favorites.push(itemId);
//     }
//     addedFav = [...addedFav, favorites];
//     localStorage.setItem("ProductFav", JSON.stringify(addedFav));
//     console.log('Favorites:', favorites);
// }


drawItems();

///////////////////
// ///////////////////////////////
// let addButtons = document.querySelectorAll(".add_to_cart");
// let removeButtons = document.querySelectorAll(".remove_to_cart");

// addButtons.forEach(function(addButton) {
//     addButton.addEventListener("click", function() {
//         addButton.style.display = 'none';
//         // Find the corresponding remove button
//         let index = Array.from(addButtons).indexOf(addButton);
//         removeButtons[index].style.display = 'inline-block';
//     });
// });

// removeButtons.forEach(function(removeButton) {
//     removeButton.addEventListener("click", function() {
//         removeButton.style.display = 'none';
//         // Find the corresponding add button
//         let index = Array.from(removeButtons).indexOf(removeButton);
//         addButtons[index].style.display = 'inline-block';
//     });
// });

//////////////////////

/////////////////// 
let cartProductDiv = document.querySelector(".carts_products .details");

document.addEventListener("DOMContentLoaded", function() {
    let badge = document.querySelector(".badge");
    let addedItem = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];
    let addedFav= localStorage.getItem("ProductFav")? JSON.parse(localStorage.getItem("ProductFav")) : [];

    // Clear the cartProductDiv to avoid duplicate elements
    cartProductDiv.innerHTML = '';
    if (addedItem.length > 0) {
        addedItem.forEach(item => {
            cartProductDiv.innerHTML += `
            <div class="product-item">
                <p class="d-flex">
                <img src="${item.imageUrl}" alt="${item.title}" width="30">
                ${item.title}
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>1</span>
                    <span class="plus">+</span>
                </div>
                </p>
            </div>`;
        });
        badge.style.display = "block";
        badge.innerHTML = addedItem.length;
    }
    if (localStorage.getItem("username")) {
        window.addToCart = function(id) {
            let choosenItem = products.find(item => item.id === id);
            cartProductDiv.innerHTML += `
            <div class="product-item">
                <p class="d-flex">
                <img src="${choosenItem.imageUrl}" alt="${choosenItem.title}" width="30">
                ${choosenItem.title}
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>1</span>
                    <span class="plus">+</span>
                </div>
                </p>
            </div>`;
            addedItem = [...addedItem, choosenItem];
            localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
            
            badge.style.display = "block";
            badge.innerHTML = addedItem.length;
        }
    } else {
        window.location = "login.html";
    }
    if (localStorage.getItem("username")) {
        window.toggleFavorite = function(element,id)  {
            let choosenItem = products.find(item => item.id === id);
            cartProductDiv.innerHTML += `
                <div class="product-item">
                <p class="d-flex">
                    <img src="${choosenItem.imageUrl}" alt="${choosenItem.title}" width="30">
                    ${choosenItem.title}
                    <div class="quantity">
                    <span class="minus">-</span>
                    <span>1</span>
                    <span class="plus">+</span>
                    </div>
                </p>
                </div>`;
            addedFav = [...addedFav, choosenItem];
            localStorage.setItem("ProductFav", JSON.stringify(addedItem));
                element.style.color = element.style.color === 'red' ? '#fcfcfc' : 'red';
        }
    } else {
        window.location = "login.html";
    }
});


let shoppingCartIcon=document.querySelector(".shopping_cart")
let cartsProducts=document.querySelector(".carts_products")
shoppingCartIcon.addEventListener("click",openCart)
function openCart(){
    if (cartProductDiv.innerHTML!=""){
        if(cartsProducts.style.display=="block"){
            cartsProducts.style.display="none"
        }else{
            cartsProducts.style.display="block"
        }
    }
}


// /////////////////////
    function search() {
        var searchInput = document.querySelector('.search').value.toLowerCase();
        var searchOption = document.querySelector('.select-option').value;
        var cards = document.querySelectorAll('.card');

        cards.forEach(function(card) {
            var title = card.querySelector('h3').innerText.toLowerCase();
            var category = card.querySelector('.category').innerText.toLowerCase();
            
            if (searchOption === "Search By Name" && title.includes(searchInput)) {
                card.style.display = 'block';
            } else if (searchOption === "Search By Category" && category.includes(searchInput)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
///////////////////////////////

