const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

//Functions
function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newItem = itemInput.value;

    //validate input
    if(newItem === ''){
        alert('Please add an item');
        return;
    }
    //create new list index
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value = '';
});
