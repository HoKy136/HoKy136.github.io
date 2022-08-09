const searchInput = document.getElementById("search-box");
const resultContainer = document.getElementById("result-container");

searchInput.addEventListener("input", function () {
  const matchedItems = searchItems(searchInput.value);

  // clear search result
  resultContainer.innerHTML = "";

  for (let i = 0; i < matchedItems.length; i++) {
    const divTag = document.createElement("div");
    const htmlContent = `<div class="line-result">
                            <p><a href="${
                              "https://www.google.com/search?q=" +
                              matchedItems[i].name
                            }" 
                            target="_blank">${matchedItems[i].name}</a></p>
                            
                        </div>`;
  // <p>${matchedItems[i].price}</p>
    divTag.innerHTML = htmlContent;

    resultContainer.appendChild(divTag);
  }
});

function searchItems(keyWord) {
  if (!keyWord) return [];

  return items.filter((item) =>
    item.name.toLowerCase().startsWith(keyWord.toLowerCase())
  );
}






// Menu dropdown
function hamDropdown() {
  document.querySelector(".noti_dropdown").classList.toggle("index_dropdown");
 }
 
 window.onclick = function(e) {
   if (!e.target.matches('.btn_dropdown')) {
   var noiDungDropdown = document.querySelector(".noti_dropdown");
     if (noiDungDropdown.classList.contains('')) {
       noiDungDropdown.classList.remove('index_dropdown');
     }
   }
 }

 document.getElementById("showCart").style.display="none";
//  Ần/Hiện Giỏ Hàng
  function showCart(){
    var show = document.getElementById('showCart');
    if(show.style.display == "block"){
      show.style.display = "none";
    }else{
      show.style.display = "block";
    }
    renderCart();
  }

var Cart = new Array()
function addCart(x){
  var valueItem = x.parentElement.children;
  var img = valueItem[0].src;
  var name = valueItem[1].innerText;
  var price = valueItem[2].children[0].innerText;
  var count = Number(valueItem[5].value);
  
  var arr = new Array(img , name , price , count );

  var checkDup = true;
  for (let i = 0; i < Cart.length; i++) {
    if(Cart[i][1] == name ){
      checkDup = false;
      count += Number(Cart[i][3]) ;
      Cart[i][3] = count;
      break;
    }
    
  }

  if(checkDup == true){
    Cart.push(arr); 
  }
  
  localStorage.setItem('Cart' ,JSON.stringify(Cart)); 
  showCount();
}

//  đếm số lượng hàng trong giỏ
function showCount(){
document.getElementById('showCount').innerHTML = Cart.length;
}


function renderCart(){
  var infoCart = " ";
  
  for(let i = 0; i < Cart.length; i++) {
    var total = Number(Cart[i][2]) * Number(Cart[i][3]);
    var tXoa = document.createElement('button');
    tXoa.value = 'Xóa';
    tXoa.setAttribute("onclick","handleRev(this)");
    
    infoCart += '<tr>'+
    '<td><img src=" '+ Cart[i][0] +' " alt="" style = "width : 100px"></td>'+
    '<td>'+ Cart[i][1] +'</td>'+
    '<td>'+ Cart[i][2] +'</td>'+
    '<td>'+ Cart[i][3] +'</td>'+
    '<td>'+total +'</td>'+
    '<td>' + '<button onclick="handleRev(this)" style="background-color: #934398; color: white; font-size: 16px; width: 100px; height:50px; border-radius:15px;"> Xóa Sản Phẩm </button>' +'</td>'+
    
      '</tr>'       
 } 
document.getElementById('myCart').innerHTML = infoCart;
      totalPrice();
}



//  Tổng Đơn Hàng
function totalPrice(){
  const handleTotal = document.getElementById('myCart')
  var tr = handleTotal.children;
  var tong = 0;
  for (let i = 0; i < tr.length; i++) {
    var td = tr[i].getElementsByTagName('td');
    var thanhTien = parseInt(td[4].innerHTML) ;
    tong += thanhTien;
    document.getElementById('totalPrice').innerHTML = tong;   
  }
 
}


//  Xóa hàng
function handleRev(x){
  var rev= x.parentElement.parentElement;
  var getName = rev.children[1].innerText;
  rev.remove();
  for (let i = 0; i < Cart.length; i++) {
    if(Cart[i][1] == getName){
      Cart.splice(i,1);
    }
  }
 
  totalPrice();
  showCount();  
}

//  XÓa tất cả giỏ hàng
function removeAll(){
  let toRemove =document.querySelector('#myCart');
  let toRemovePrice =document.querySelector('#totalPrice');
      toRemove.remove();
      toRemovePrice.remove();
      localStorage.clear();
}




 var getCart = new Array();
  
  function renderCartPage(){
    var infoCart = " ";
    //  Get items Storage
    var getStorage = localStorage.getItem('Cart');
    getCart = JSON.parse(getStorage);
    
    for(let i = 0; i < getCart.length; i++) {
      var total = Number(getCart[i][2]) * Number(getCart[i][3]);
      var tXoa = document.createElement('button');
      tXoa.value = 'Xóa';
      tXoa.setAttribute("onclick","cartRemove(this)");
      
      infoCart += '<tr>'+
      '<td><img src=" '+ getCart[i][0] +' " alt="" style = "width : 100px"></td>'+
      '<td>'+ getCart[i][1] +'</td>'+
      '<td>'+ getCart[i][2] +'</td>'+
      '<td>'+ getCart[i][3] +'</td>'+
      '<td>'+ total +'</td>'+
      '<td>' + '<button onclick="cartRemove(this)" style="background-color: #934398; color: white; font-size: 16px; width: 100px; height:50px; border-radius:15px;"> Xóa Sản Phẩm </button>' +'</td>'+
      
        '</tr>'       
   } 
  document.getElementById('myCart').innerHTML = infoCart;
        totalPrice();
  }

  function cartRemove(x){
    var rev= x.parentElement.parentElement;
    var getName = rev.children[1].innerText;
    rev.remove();
    for (let i = 0; i < getCart.length; i++) {
      if(getCart[i][1] == getName){
        console.log(getCart)
        getCart.splice(i,1);
      }
    }
    totalPrice();
  }

  function complete(){
    if(getCart == null){
      alert('Có mua gì đâu mà thanh toán cha')
      
      
    }
    else{
      let toRemove =document.querySelector('#myCart');
      let toRemovePrice =document.querySelector('#totalPrice');
      toRemovePrice.remove();
      toRemove.remove();
      localStorage.clear();
     alert('Bạn đã thanh toán thành công!!!');
    }
  }
  function clearAll(){
    let toRemove =document.querySelector('#myCart');
    let toRemovePrice =document.querySelector('#totalPrice');
    if(toRemovePrice !== null){
      toRemove.remove(); 
      toRemovePrice.remove();
      localStorage.clear();
    }
        
        
  }
  
