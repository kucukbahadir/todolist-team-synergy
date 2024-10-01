const card = [
{name:'task 1', id:'card1'},
{name:'task 2', id:'card2'},
{name:'task 3', id:'card3'}
]

localStorage.setItem(
    'CardData', JSON.stringify(card)
)

let Getcard = JSON.parse(localStorage.getItem("CardData"))

const CardList = document.getElementById("card-list");

for (let i = 0; i < card.length; i++) {
  Getcard.innerHTML =
   Getcard.innerHTML +
    `<div class="card-container"> Hello ${card[i]}</div>`;
}

console.log('Getcard',Getcard);