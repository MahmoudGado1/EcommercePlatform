let userInfo =document.querySelector("#user_info")
let userData =document.querySelector("#user")

if(localStorage.getItem("username")){
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


let ProductsInCart= localStorage.getItem("ProductsInCart")
let allProducts=document.querySelector(".product")

    let btnShowPrice = document.querySelector("#showprice");
    let divTotalPrice = document.querySelector("#div2");

    if (ProductsInCart) {
    let items = JSON.parse(ProductsInCart);
    drawCartProducts(items);

    let totalSum = items.reduce((sum, product) => {
        return sum+= +(product.price);
    }, 0);

    btnShowPrice.addEventListener("click", function() {
        divTotalPrice.innerHTML = `Total Price: $${totalSum}`;
    });
    }


function drawCartProducts(products){
    let y=products.map((item)=>{
        return `
        <div class="card col-lg-4 col-md-6 col-12 mb-4 ">
            <img src="${item.imageUrl}" class="card-img-top pb-3" alt="...">
            <div class="details">
                <h3>${item.title}</h3>
                <h4>Price: ${item.price}$</h4>
                <h4 class="category"> ${item.category}</h4>
                <button class="mb-3 mt-3 btn btn-outline-danger remove_to_cart" onClick="removeFromCart(${item.id})">Remove From Chart</button>
                <i class="fas fa-heart icon mt-3"></i>
            </div>
        </div>
        `
    })
    allProducts.innerHTML=y
    allProducts.innerHTML= y.join("");

}
function removeFromCart(id) {
    let ProductsInCart = JSON.parse(localStorage.getItem("ProductsInCart"))
    let productIndex = ProductsInCart.findIndex(item => item.id === id)

    if (productIndex !== -1) {
        ProductsInCart.splice(productIndex, 1)
        localStorage.setItem("ProductsInCart", JSON.stringify(ProductsInCart))
        drawCartProducts(ProductsInCart)
    }
}

///////////////////////////////

