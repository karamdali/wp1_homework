
/* open nave bar in the mobile mod*/
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');


bar.addEventListener('click', () => {
    nav.style.right="0px"
});

/*close the navbar in the mobile mode*/

const close = document.getElementById('close');
    
close.addEventListener('click', () => {
    nav.style.right="-300px"
});


/* product information*/
let products = [
    {
        brand : "Kangol",
        description:"Wool Flexfit Baseball",
        imgscr : "img/products1/black1.jpg",
        price : 52,
        incart : 0,
        tag:"item1",
    },
    {
        brand : "Kangol",
        description:"Kangol Pouch Baseball",
        imgscr : "img/products1/white2.jpg",
        price : 58,
        incart : 0,
        tag:"item2",
    },
    {
        brand : "Kangol",
        description:"Stretch Fit Army Cap",
        imgscr : "img/products1/orange3.jpg",
        price : 60,
        incart : 0,
        tag:"item3",
    },
    {
        brand : "Kangol",
        description:"Tie Dye Baseball",
        imgscr : "img/products1/ocean4.jpg",
        price : 110,
        incart : 0,
        tag:"item4",
    },
    {
        brand : "Bailey 1922",
        description:"Colver Fedora",
        imgscr : "img/products1/black5.jpg",
        price : 89,
        incart : 0,
        tag:"item5",
    },
    {
        brand : "Kangol",
        description:"Tech Flexfit Cap",
        imgscr : "img/products1/gray6.jpg",
        price : 77,
        incart : 0,
        tag:"item6",
    },
    {
        brand : "Melin",
        description:"Hydro A-Game Baseball - Limited Edition",
        imgscr : "img/products1/blue7.jpg",
        price : 120,
        incart : 0,
        tag:"item7",
    },
    {
        brand : "Bailey Western",
        description:"Truckton 3X Cowboy Western Hat",
        imgscr : "img/products1/white8.jpg",
        price : 80,
        incart : 0,
        tag:"item8",
    },
    {
        brand : "Melin",
        description:"Hydro Trenches Icon Baseball",
        imgscr : "img/products1/green9.jpg",
        price : 60,
        incart : 0,
        tag:"item9",
    },
    {
        brand : "Bailey 1922",
        description:"Hester Fedora",
        imgscr : "img/products1/opal10.jpg",
        price : 65,
        incart : 0,
        tag:"item10",
    },
    {
        brand : "Bailey 1922",
        description:"Stansfield Panama Fedora",
        imgscr : "img/products1/black11.jpg",
        price : 100,
        incart : 0,
        tag:"item11",
    },
    {
        brand : "Kangol",
        description:"USA Wool 504",
        imgscr : "img/products1/red12.jpg",
        price : 45,
        incart : 0,
        tag:"item12",
    },

]
let cart = document.querySelectorAll('.add-to-cart');
for (let i=0;i<cart.length;i++){
    cart[i].addEventListener('click',()=> {
        cartNumber(products[i])
        totalCost(products[i])
    })
}

/*to save the number of items near the cart icon in the navebar if refresh is done to the page*/
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumber')
    if(productNumbers){
        document.querySelector('#bag span').textContent = productNumbers;
    }
}
/*function to set variables in the local storage after clicking add to cart button*/
function cartNumber(product){
    let productNumbers = localStorage.getItem('cartNumber')
    productNumbers = parseInt(productNumbers)
    if(productNumbers){
        localStorage.setItem('cartNumber',productNumbers+1)
        document.querySelector('#bag span').textContent = productNumbers+1;
        
    }
    else {
        localStorage.setItem('cartNumber',1)
        document.querySelector('#bag span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    if (cartItems != null){
        if(cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].incart+= 1;
    }
    else{
        product.incart = 1;
        cartItems = {
            [product.tag]:product
        }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}
function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost!=null){
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost+product.price);
    }
    else{
        localStorage.setItem("totalCost",product.price);
    }
}

/*display the selected items in the cart page*/
function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    let cartCost = localStorage.getItem("totalCost");
    cartItems = JSON.parse(cartItems);
    cartCost = parseInt(cartCost);
    let productsTable = document.querySelector("#purshasedProduct");
    let totalTable = document.querySelector("#total-price");
    let finalFee = document.querySelector("#fee");
    //totalTable.innerHTML = '';
    //productsTable.innerHTML = '';
    if(cartItems && productsTable){
        //console.log("1")
        if(cartCost>0 || cartCost !=null){
            //console.log("2")
            Object.values(cartItems).map(item =>{
            productsTable.innerHTML += `
            <tr id="row">
                <td><a class = "deletButton"><i class="fa-solid fa-trash-can"></i></a></td>
                <td><img src="${item.imgscr}" alt=""></td>
                <td>${item.description}</td>
                <td>$${item.price}</td>
                <td><a class ="increase"> <i class="fa-solid fa-plus"></i></a><span id = "quantityNumber">${item.incart}</span><a class ="decrease"><i class="fa-solid fa-minus"></i></a></td>
                <td ><span>$</span><strong id = 'sub-total'>${item.incart * item.price}</strong></td>
            </tr>`;
        })
    }
    if(cartCost<=0){
        //console.log('3')
        productsTable.innerHTML = `
        <h4> Your Cart is Empty</h4>
        `;
    }
    //display the value
    totalTable.textContent = cartCost;
    finalFee.textContent = cartCost+(cartCost/10);
    }
}

onLoadCartNumbers();
displayCart();

/*delet Item from the list*/
let delButton = document.querySelectorAll('.deletButton');
for (let i=0;i<delButton.length;i++){
    delButton[i].addEventListener('click',()=> {
        //console.log(i)
        deletProduct(i)
    })
}
function deletProduct(i){
    let purshased = localStorage.getItem('productsInCart');
    purshased = JSON.parse(purshased)
    //console.log(i)
    var item= []
    for (var key in purshased){
        item.push(key)
    }
    console.log(row.length)
    console.log(i)
    let quantity = purshased[item[i]].incart;
    let cost = (purshased[item[i]].incart)*(purshased[item[i]].price);
    //console.log(cost)
    delete purshased[item[i]];
    localStorage.setItem("productsInCart",JSON.stringify(purshased));
    /*decrese the number of cartNumber */
    let productNumbers = localStorage.getItem('cartNumber')
    productNumbers = parseInt(productNumbers)
    localStorage.setItem('cartNumber',productNumbers-quantity)
    /*decrese the totaCost*/
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost)
    localStorage.setItem("totalCost", cartCost-cost);
    //delet row from html table generatedby displayCart()
    window.location.reload();
    //update the number of selected producrs beside the cart logo in the navbar
    let update = localStorage.getItem('cartNumber');
    document.querySelector('#bag span').textContent = update;
}

/*change the quantity*/

/*increase the quantity*/
let increaseBtn = document.querySelectorAll('.increase');
for (let i=0;i<increaseBtn.length;i++){
    increaseBtn[i].addEventListener('click',()=>{
        increaseQuantity([i])
    })
}

function increaseQuantity(i){
    let purshased = localStorage.getItem('productsInCart');
    purshased = JSON.parse(purshased);
    
    var item= []
    for (var key in purshased){
        item.push(key)   
    }
    
    //console.log(purshased[item[i]])
    purshased[item[i]].incart = parseInt(purshased[item[i]].incart)+1;
    localStorage.setItem("productsInCart", JSON.stringify(purshased));
    /*update the cartNumber*/
    let productNumbers = localStorage.getItem('cartNumber');
    productNumbers = parseInt(productNumbers)
    localStorage.setItem('cartNumber',productNumbers+1);
    /*update the totlCost*/
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost)
    localStorage.setItem("totalCost", cartCost+purshased[item[i]].price);
    //change the value displayed in the tabel
    //console.log(i)
    currentQuantity = document.querySelectorAll('#quantityNumber');
    currentQuantity[i].textContent = purshased[item[i]].incart;
    let totalTable = document.querySelector("#total-price");
    let finalFee = document.querySelector("#fee");
    totalTable.textContent = cartCost+purshased[item[i]].price;
    finalFee.textContent = cartCost+purshased[item[i]].price+((cartCost+purshased[item[i]].price)/10);
    let subTotal = document.querySelectorAll("#sub-total");
    subTotal[i].textContent = purshased[item[i]].price*purshased[item[i]].incart;
    let update = localStorage.getItem('cartNumber');
    document.querySelector('#bag span').textContent = update;
}


/*decrese the quantity*/
let decreaseBtn = document.querySelectorAll('.decrease');
for (let i=0;i<increaseBtn.length;i++){
    decreaseBtn[i].addEventListener('click',()=>{
        decreaseQuantity([i])
    })
}

function decreaseQuantity(i){
    let purshased = localStorage.getItem('productsInCart');
    purshased = JSON.parse(purshased);
    //console.log(i)
    var item= []
    for (var key in purshased){
        item.push(key)   
    }
    let productNumbers = localStorage.getItem('cartNumber');
    productNumbers = parseInt(productNumbers);
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost)
    //console.log(purshased[item[i]])
    /*check if the quantity will be below 1*/
    if(parseInt(purshased[item[i]].incart)==1){
        purshased[item[i]].incart = 1;
        localStorage.setItem("productsInCart", JSON.stringify(purshased));
    }else{
        purshased[item[i]].incart = parseInt(purshased[item[i]].incart)-1;
        localStorage.setItem("productsInCart", JSON.stringify(purshased));
        localStorage.setItem('cartNumber',productNumbers-1);
        localStorage.setItem("totalCost", cartCost-purshased[item[i]].price);
        //change the value displayed in the tabel
        currentQuantity = document.querySelectorAll('#quantityNumber');
        currentQuantity[i].textContent = purshased[item[i]].incart;
        //let value = localStorage.getItem('totalCost');
        let totalTable = document.querySelector("#total-price");
        let finalFee = document.querySelector("#fee");
        totalTable.textContent = cartCost-purshased[item[i]].price;
        finalFee.textContent = cartCost-purshased[item[i]].price+((cartCost-purshased[item[i]].price)/10);
        let subTotal = document.querySelectorAll("#sub-total");
        subTotal[i].textContent = purshased[item[i]].price*purshased[item[i]].incart;
    }
    let update = localStorage.getItem('cartNumber');
    document.querySelector('#bag span').textContent = update;
    
    
}

//console.log('1')
/*Single page product*/
 let sltProduct = document.querySelectorAll('.ppage');
 //console.log('1')
 for (let i=0;i<sltProduct.length;i++){
    sltProduct[i].addEventListener('click',()=>{
        localStorage.setItem('sltProduct',i);    
    })
 }


 if(document.querySelector("#brand")!=null){
    let i= localStorage.getItem('sltProduct');
    i = parseInt(i);
    let brand = document.querySelector("#brand");
    let description = document.querySelector("#description")
    let price = document.querySelector("#price")
    let image = document.querySelector("#pImage")
    brand.textContent = products[i].brand;
    //console.log(products[i].brand)
    description.textContent = products[i].description;
    price.textContent = products[i].price;
    image.src = products[i].imgscr;
 }


 /*add the functunality to add to cart butun in the sproduct.html*/

 let addToCart = document.querySelector('.add-to-cart-ppage');
 if(addToCart != null){
    addToCart.addEventListener('click',()=>{
        spAddToCart();   
    })
}
function spAddToCart(){
    let i = localStorage.getItem('sltProduct')
    i = parseInt(i);
    let q = document.querySelector('#quantity').value;
    q = parseInt(q);
    if (q<=0){
        q=1;
        document.querySelector('#quantity').value = 1;
        alert("The value in the qauntity field can't be below 1")
    }else{
    /*Check if the productsICart is created if not creat one*/
    let productNumbers = localStorage.getItem('cartNumber')
    productNumbers = parseInt(productNumbers)
    if(productNumbers){
        localStorage.setItem('cartNumber',productNumbers+q)
        document.querySelector('#bag span').textContent = productNumbers+q;
    }
    else {
        localStorage.setItem('cartNumber',q)
        document.querySelector('#bag span').textContent = q;
    }
    /* add the product to productsInCart*/
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    if (cartItems != null){
        if(cartItems[products[i].tag]==undefined){
            cartItems={
                ...cartItems,
                [products[i].tag]:products[i]
            }
        }
        cartItems[products[i].tag].incart+= q;
    }
    else{
        products[i].incart = q;
        cartItems = {
            [products[i].tag]:products[i]
        }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));

    /*update the totalCost*/
    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost!=null){
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost+(products[i].price*q));
    }
    else{
        localStorage.setItem("totalCost",products[i].price*q);
    }
}

}


/*form check*/
const form = document.getElementById('form');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const address = document.getElementById('address');
const bank = document.getElementById('bank');
if(form !=null){
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        checkInputs();
    });
}

function checkInputs() {
	// trim to remove the whitespaces
	const fullnameValue = fullname.value.trim();
	const emailValue = email.value.trim();
	const addressValue = address.value.trim();
	const bankValue = bank.value.trim();
	
	if(fullnameValue === '') {
		setErrorFor(fullname, 'Name cannot be blank');
	} else if (!isName(fullnameValue)) {
		setErrorFor(fullname, 'Not a valid Name');
	} else {
		setSuccessFor(fullname);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(addressValue === '') {
		setErrorFor(address, 'address cannot be blank');
	}else if(!isAddress(addressValue)) {
		setErrorFor(address, 'address does not match the formula ex: Syria - Lattakia - 8azar'); 
    }else {
		setSuccessFor(address);
	}
	
	if(bankValue === '') {
		setErrorFor(bank, 'Bank account cannot be blank');
	} else if(!isbank(bankValue)) {
		setErrorFor(bank, 'Bank account does not match ex: ab12-cd34-56ef-78gh');
	} else{
		setSuccessFor(bank);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
function isName	(name){
    return /^([a-zA-Z]*)\s+([a-zA-Z ]*)$/.test(name);
}
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function isAddress(address){
    return /^[a-zA-Z]+ - [a-zA-Z]+ - [a-zA-Z0-9]+$/.test(address);
}
function isbank(bank){
    return /^[A-Za-z0-9]{4}\-[A-Za-z0-9]{4}\-[A-Za-z0-9]{4}\-[A-Za-z0-9]{4}$/.test(bank);
}


