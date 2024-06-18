//ALGORITHM
// select all the elements needed 
// create an empty array
// add a function to the form that pushes the inputs in the form into the empty items array and displays it in the listedItemsContainer
// 
// 
// 
//onclick of the checkbox strike-through the text

let listedItemsContainer = document.querySelector('.listed-items');
let inputForm = document.querySelector('#inputForm');
let nameInput = document.querySelector('#nameInput');
let quantityInput = document.querySelector('#quantityInput');
let priceInput = document.querySelector('#priceInput');
let addItemBtn = document.querySelector('#addItemBtn');
let updateItemBtn = document.querySelector('#updateItemBtn');
let textSection = document.getElementsByClassName("text-section")
let itemsList = document.getElementsByClassName ("items-list")
let totalPrice = document.getElementById("total-price")
let items = JSON.parse(localStorage.getItem("items")) || []
let checkbox = document.querySelectorAll('.checkbox-main');
let unselectAllBtn = document.getElementById("unselectAllButton")
let selectAllBtn = document.getElementById("selectAllButton")
let itemlistSection = document.getElementsByClassName('item-list-section')
let deleteItemBtn = document.querySelectorAll('#deleteItem')
let deleteAllButton = document.getElementById('deleteAllButton')
let offcanvasDeleteAllButton = document.getElementById('offcanvas-delete-all-button')

inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
let item =  {
    id: new Date().getTime(),
    name: nameInput.value,
    quantity: parseInt(quantityInput.value),
    price: parseInt(priceInput.value),
    isPurchased: false,
}
items.push(item);
localStorage.setItem("items", JSON.stringify(items))
generateItems();
calculateTotalPrice();
inputForm.reset();
console.log(items);
toastMessage("New Item Added!")
})

//Toast Function
const toastMessage = (newContent, timeout = 600) => {
    const myToast = new bootstrap.Toast(".toast") 
    const modal = document.getElementById("toastModal");
    const modalContent = document.getElementById("modalContent");
    modalContent.textContent = newContent;
    toastModal.classList.remove('active')
    setTimeout(() => {}, timeout)
    myToast.show();
}

// get total
const calculateTotalPrice = () => {
    let totals = items.map(item => item.quantity * item.price);
    let total = totals.reduce((acc, cur) => acc + cur, 0)
    totalPrice.innerText = `$${total}`;
    if (total > 1) {
        totalPrice.style.color = "#28c065";
    }
    localStorage.setItem("items", JSON.stringify(items))
}
calculateTotalPrice();

const generateItems = () => {
    listedItemsContainer.innerHTML = "";
    listedItemsContainer.innerHTML += items.map((data) => {
        let { id, name, quantity, price, isPurchased } = data

        return `
    <div class="items-section">
        <div class="items-list">
            <div class="checkbox">
                <input onchange=togglePurchase('${id}') class="checkbox-main" type="checkbox" ${isPurchased ? "checked" : ""}>
            </div>

            <div class="text-section">
                <div id="${id}" class="text ${isPurchased ? "strike-through-text" : "" } " >
                    ${name} - ${price} x ${quantity}
                </div>    
            </div>

            <div class="edit-del">
                <button class="edit-item-btn" id="editItem" onclick= {editItem(${id})}>
                    <i class="bi bi-pencil-square edit-item"></i>
                </button>
            
                <button class="delete-item-btn" onclick= {deleteItem(${id})}>
                    <i class="bi bi-trash delete-item"></i>
                </button>
            </div> 
        </div>
                
            <span class="line-under"></span>
    </div> 
                `
            }).reverse().join("")

    if (items.length < 1) {
		listedItemsContainer.innerHTML = `
        <div class="nothing-yet-section">
            <div>
			    <span class="nothing-yet">Nothing yet.</span>
            <div/>
                
            <div>
		        <small class="nothing-yet"> Please use the form to create a list </small>
            <div/>

        <div/>
        `
	}
	nameInput.focus()

}
 generateItems();
 
// Function to check changes in the media query
const mediaQuery = window.matchMedia('(max-width: 770px)');
const handleMediaQueryChange = (e) => {
     if (items.length < 1) {
    listedItemsContainer.innerHTML = `
    <div class="nothing-yet-section">
        <div>
            <span class="nothing-yet">Nothing yet.</span>
        <div/>
            
        <div>
            <small class="nothing-yet">Click the plus (+) icon above to use the form to create a list </small>
        <div/>
    
        <div>
            <small class="nothing-yet">Double Tap items To select</small>
        <div/>
    <div/>
    `
     } 
 };handleMediaQueryChange(mediaQuery);

const togglePurchase = (id) => {
   const selectedItem = items.find(item => item.id == id);
   items = items.map(item => {
       if(item.id == selectedItem.id){
           item.isPurchased = !item.isPurchased;
           console.log(item.isPurchased);
           return item;
    }
    return item
   })
   generateItems();
   calculateUnpurchasedItem();
   localStorage.setItem("items", JSON.stringify(items))
}

const calculateUnpurchasedItem = () => {
    let totals = items.map(item => {
        if(item.isPurchased === false){
            return item.price * item.quantity;
        }
        return 0;
    });
    let total = totals.reduce((acc, cur) => acc + cur, 0)
    document.getElementById("unpurchase-total").innerText = `$${total}`;
    if (total > 1) {
        document.getElementById("unpurchase-total").style.color = "#d4d421";
    }else{
        document.getElementById("unpurchase-total").style.color = "#ff0000";
    }
    localStorage.setItem("items", JSON.stringify(items))
}
calculateUnpurchasedItem()

function selectAll() {
    let disabledBtns = document.querySelectorAll('#disabled')
    let myCheckbox = document.querySelectorAll('.checkbox-main')
    if (items.length >= 1) {
        for(const disabledBtn of disabledBtns){
            disabledBtn.removeAttribute('disabled')
            unselectAllBtn.style.display = "block"
            selectAllBtn.style.display = "none"
        }
        for(let i=0;i<myCheckbox.length;i++){
            myCheckbox[i].checked=true
        }
        listedItemsContainer.style.backgroundColor = "pink";
    }else{
        toastMessage('Sorry,There are no items to select!')
        listedItemsContainer.style.backgroundColor = "";
    }
    localStorage.setItem("items", JSON.stringify(items))
    
}

function unselectAll() {
    let disabledBtns = document.querySelectorAll('#disabled')
    let myCheckbox = document.querySelectorAll('.checkbox-main')
    for(const disabledBtn of disabledBtns){
        disabledBtn.setAttribute('disabled', '');
        selectAllBtn.style.display = "block"
        unselectAllBtn.style.display = "none"
    }
    for(let i=0;i<myCheckbox.length;i++){
        myCheckbox[i].checked=false
    }
    listedItemsContainer.style.backgroundColor = "";
    localStorage.setItem("items", JSON.stringify(items))

}

// Function to delete a single item
const deleteItem = id => {
    if (items.length > 0) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: ['No', 'Yes'],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                items = items.filter(item => item.id !== id);
                willDelete = items

                swal("Poof! Item has been deleted!", {
                    icon: "success",
                    willDelete : deleteItem(id)
                });
            } 
        });
    } 

    generateItems();
    calculateTotalPrice();
    calculateUnpurchasedItem();

    console.log(items);
    console.log(id);
};

// Function to delete selected items
const deleteSelectedItems = () => {
    let disabledBtns = document.querySelectorAll('#disabled')
    if (items.length >= 1) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: ['NO','YES'],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Item has been deleted!", {
                    icon: "success",
                    willDelete : deleteAllItems()
              });
            } else {
              swal("Item is safe!");
            }
          });
        ;
    }else{
        toastMessage('Sorry,There are no items to delete!')
    }
    listedItemsContainer.style.backgroundColor = "";
    for(const disabledBtn of disabledBtns){
        disabledBtn.setAttribute('disabled', '');
        selectAllBtn.style.display = "block"
        unselectAllBtn.style.display = "none"
    }    

};

// Function to delete all items
const deleteAllItems = () => {
    items = [];
    generateItems();
    calculateTotalPrice();
    calculateUnpurchasedItem();
    localStorage.setItem("items", JSON.stringify(items));
};

// Event listener for deleting all items
deleteAllButton.addEventListener("click", () => {
    if (items.length >= 1) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: ['NO','YES'],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Item has been deleted!", {
                    icon: "success",
                    willDelete : deleteAllItems()
              });
            } else {
              swal("Item is safe!");
            }
          });
        ;
    }else{
        toastMessage('Sorry,There are no items to delete!')
    }
});

offcanvasDeleteAllButton.addEventListener("click", () => {
    if (items.length >= 1) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: ['NO','YES'],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Item has been deleted!", {
                    icon: "success",
                    willDelete : deleteAllItems()
              });
            } else {
              swal("Item is safe!");
            }
          });
        ;
    }else{
        toastMessage('Sorry,There are no items to delete!')
    }
});

// Function to purchase selected items
function purchaseSelectedItems() {
    items.forEach(item => {
        if (item.id) {
            item.isPurchased = true;
        }
    });
    generateItems();
    calculateUnpurchasedItem();
    localStorage.setItem("items", JSON.stringify(items));
}

// Function to unpurchase selected items
function unpurchaseSelectedItems() {
    items.forEach(item => {
        if (item.id) {
            item.isPurchased = false;
        }
    });
    generateItems();
    calculateUnpurchasedItem();
    localStorage.setItem("items", JSON.stringify(items));
}

// Function to purchase all items
function purchaseAllItems() {
    items.forEach(item => {
        item.isPurchased = true;
    });
    generateItems();
    calculateUnpurchasedItem();
    localStorage.setItem("items", JSON.stringify(items));
}

// //function to edit Items 
const editItem = (id) => {
    let selectedItem = items.find(item => item.id === id);
    
    if (!selectedItem) {
        console.error("Item not found with ID:", id);
        return;
    }
    
    nameInput.value = selectedItem.name; 
    priceInput.value = selectedItem.price;
    quantityInput.value = selectedItem.quantity;
    
    addItemBtn.style.display = "none";
    updateItemBtn.style.display = "block";
    nameInput.focus();
    
    updateItemBtn.addEventListener('submit', () => { 
        let newName = nameInput.value.trim();
        let newPrice = parseInt(priceInput.value.trim());
        let newQuantity = parseInt(quantityInput.value.trim()); 
    
        if (newName && newQuantity && newPrice) {
            selectedItem.name = newName;
            selectedItem.quantity = newQuantity;
            selectedItem.price = newPrice;
            generateItems();
            calculateTotalPrice();
            calculateUnpurchasedItem();
            localStorage.setItem("items", JSON.stringify(items));
        } 
        inputForm.reset();
        toastMessage("Item Updated!");
        nameInput.focus();
        addItemBtn.style.display = "block";
        updateItemBtn.style.display = "none";
    });
}

function showForm() {
    var inputForm = document.getElementById('inputForm');
    var cross = document.getElementById('cross')
    var up = document.getElementById('up')
    if (inputForm.style.display !== 'block') {
        inputForm.style.display = 'block';
        cross.style.display = 'none'
        up.style.display = 'flex'
    } 
}

function closeForm(){
    var inputForm = document.getElementById('inputForm');
    var cross = document.getElementById('cross')
    var up = document.getElementById('up')
    if(inputForm.style.display === 'block'){
        inputForm.style.display = 'none';  
        cross.style.display = 'flex'
        up.style.display = 'none'
    }
}

