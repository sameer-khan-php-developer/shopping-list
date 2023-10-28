const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');
//Functions
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDom(item);
  });
  reloadUI();
}
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;

  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}
function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  //validate input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }
  //Add item to DOM
  addItemToDom(newItem);
  //Add item to Storage
  addItemToStorage(newItem);
  itemInput.value = '';
  reloadUI();
}

function addItemToDom(item) {
  //create new list index
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');

  li.appendChild(button);
  itemList.appendChild(li);
}
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  //convert to Json String and set to storage again
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}
function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
    e.target.parentElement.parentElement.remove();
    reloadUI();
  }
}
function removeItem(item) {
  if (confirm('Are you sure?')) {
    //Remove item from DOM
    item.remove();
    //Remove item from Storage
    removeItemFromStorage(item.textContent);
    reloadUI();
  }
}
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  //Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => {
    return i !== item;
  });
  //Re set the local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
function clearItems(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  //Clear Items from local Storage
  localStorage.removeItem('items');
  reloadUI();
}

//Reset the UI dynamically
function reloadUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
  }
}
function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.textContent.toLowerCase();
    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
  console.log(text);
}

//Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
reloadUI();
