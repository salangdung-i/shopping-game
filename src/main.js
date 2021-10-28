
// Fetch the items from ths JSON file
// Fetch는 가져오기API, 네트워크에서 비동기적으로 리소스를 가져오는 방법을 제공
/*
  기본 가져오기 요청 설정 
  fetch('http://example.com/movies.json')
    .then(response => response.json())
    .then(data => console.log(data)); 
*/

// loadItems 'data.json'의 리소스를 가져와 json으로 변환한후 json에 담긴 items를 리턴한다.
function loadItems() {
     return fetch('data/data.json')
     .then(response => response.json()) //json으로 변환
     .then(json => json.items); //json 안의 items를 return
}
// loadItems 라는 함수는 fetch를 이용해서 데이터를 받아온다음 
// 받아온 데이터가 성공적이면 Json으로 변환하고 json 안의 items 를 리턴한다.

// Update the list with the given items
// querySelector로 itmes 클래스에 접근 
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLStirng(item)).join('');     
}
// querySelector : Returns all element descendants of node that match selectors.
// 선택자와 일치하는 노드의 모든 요소 하위 항목을 반환합니다.
// map() 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다

// Create HTML list item from the given data item
// json.items 을 전달받아 아래 작업을 수행 
function createHTMLStirng(item) {
    return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

// Handle button click
// ? onClick으로 지정안했는데 이게 왜 수행되는지 모르겠음
function onButtonClick(event, items) {
  // ? event 가 뭐가 들어오는건지 모르겠음
  // ? event.target.dataset 왜 이렇게 접근해야되는지 모름
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null) {
        return;
    }

    //updateItems(items, key, value);
    // 만약 key: color, value: blue 라면
    // item 에서 item.color == blue 인것만 filter된다. 
     const filtered = items.filter(item => item[key] == value);
     console.log(filtered);
     displayItems(filtered);

    // console.log(event.target.dataset.key);
    // console.log(event.target.dataset.value);
}

// Make the items matching {key: value} invisible.
// 이거 아직 안씀
function updateItems(items, key, value) {
    items.forEach(item => {
      if (item.dataset[key] === value) {
        item.classList.remove('invisible');
      } else {
        item.classList.add('invisible');
      }
  });
}

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', 
    function(event) {
      console.log(`아니 이게 뭔데? ${event.pointerType}`);
      onButtonClick(event, items)
      
    });
}
// addEventListener() 메서드는 지정한 이벤트가 대상에 전달될 떄마다 호출함수를 설정한다.
// logo에 클릭시 isplayItems를 실행
// 

// main
// promise처럼 써보이네?
// loadItems를 실행하고 items를 반환한다.
// 이후 displayItems, setEventListeners 를 실행시킨다. 
loadItems()
    .then(items => {
        displayItems(items);
        setEventListeners(items)
})
.catch(console.log)

//data.josn 읽어와서 
//promiss를 읽도록
//fetch 사용법