
//Fetch the items from ths JSON file
function loadItems() {
     return fetch('data/data.json')
     .then(response => response.json()) //json으로 변환
     .then(json => json.items); //json 안의 items를 return
}
// loadItems 라는 함수는 fetch를 이용해서 데이터를 받아온다음 
// 받아온 데이터가 성공적이면 Json으로 변환하고 json 안의 items 를 리턴한다.

// Update the list with the given items
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLStirng(item)).join('');     
}

// Create HTML list item from the given data item
function createHTMLStirng(item) {
    return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null) {
        return;
    }

    const filtered = items.filter(item => item[key] == value);
    console.log(filtered);
    displayItems(filtered);

    // console.log(event.target.dataset.key);
    // console.log(event.target.dataset.value);
}

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems()
    .then(items => {
        displayItems(items);
        setEventListeners(items)
})
.catch(console.log)

//data.josn 읽어와서 
//promiss를 읽도록
//fetch 사용법