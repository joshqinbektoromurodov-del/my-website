let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart(){
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item,index)=>{
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <li>
        ${item.name} ($${item.price}) 
        x ${item.qty}
        <button onclick="changeQty(${index},1)">+</button>
        <button onclick="changeQty(${index},-1)">-</button>
        <button onclick="removeItem(${index})">❌</button>
      </li>
    `;
  });

  totalEl.textContent = total;
  countEl.textContent = cart.length;
  saveCart();
}

function addToCart(name,price){
  const existing = cart.find(item=>item.name===name);
  if(existing){
    existing.qty++;
  }else{
    cart.push({name,price,qty:1});
  }
  updateCart();
}

function changeQty(index,amount){
  cart[index].qty += amount;
  if(cart[index].qty <= 0){
    cart.splice(index,1);
  }
  updateCart();
}

function removeItem(index){
  cart.splice(index,1);
  updateCart();
}

function openCart(){
  document.getElementById("cartModal").classList.add("active");
}

function closeCart(){
  document.getElementById("cartModal").classList.remove("active");
}

function scrollToProducts(){
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
}

updateCart();