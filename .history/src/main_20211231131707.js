// 1. fetch
function loadItems() {
    // return fetch('/data/data.json')
    return fetch('../../shopping-game/data/data.json')
        .then(response => response.json())
        .then(json => json.items);
}

// 2. .items 접근
function displayItems(items) {
    const inputText = document.querySelector('.items');
    inputText.innerHTML = items.map(item => createHTMLString(item)).join('');
}
// 3. create HTML list
function createHTMLString(items) {
    return `<li class="item" >
        <img src="${items.image}" alt="${items.type}" class="item__thumbnail">
        <span class="item__description">${items.gender}, ${items.size}</span>
        </li>`;
}

// 4. button event
function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    // console.log(key);
    // console.log(value);
    // console.log(items.filter(item => item[key] == value));

    const filterData = items.filter(item => item[key] == value);
    displayItems(filterData);
}

// 5. setEvent
function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', () => onButtonClick(event, items));
}

// main
loadItems()
    .then(items => {
        displayItems(items);
        setEventListeners(items);
    })
    .catch(console.log);