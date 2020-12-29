let addToy = false;

const toyCollection = document.querySelector("#toy-collection")
const addBtn = document.querySelector("#new-toy-btn")
const toyForm = document.querySelector(".container")

document.addEventListener("DOMContentLoaded", () => {
  fetchAllToys()
});

function fetchAllToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data =>
     data.forEach(toy => renderToys(toy) )
  )
} 

function createToy(toy_info) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify({
      "name": toy_info.name.value,
      "image": toy_info.image.value,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then((toyObj) => {
    let new_toy = renderToys(toyObj)
    toyCollection.append(new_toy)
  })
}

function renderToys(toy){
  let toyCard = document.createElement('div')
  toyCard.className = "card"
  toyCard.id = `toys-${toy.id}`

  toyCard.innerHTML = `
  <h2>${toy.name}</h2>
  <img src='${toy.image}' class=toy-avatar>
  <p>${toy.likes} Likes </p>
  `
  let likeBtn = document.createElement('button')
  likeBtn.setAttribute('class', 'like-btn')
  likeBtn.setAttribute('data-id', `${toy.id}`)
  toyCard.append(likeBtn)
  likeBtn.innerHTML = 'Like'
  likeBtn.addEventListener('click', addLikes)

  toyCollection.appendChild(toyCard)
}

function addLikes(event) {
  console.log(event.target.dataset.id)
  let likes = parseInt(event.target.previousElementSibling.innerText) 
  likes += 1 
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": `${likes}`
    })
  })
  .then(resp => resp.json())
  .then(likeObj => {
    event.target.previousElementSibling.innerText = `${likes} likes`
  })
  
}

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    toyForm.addEventListener('submit', event => {
      event.preventDefault(),
      createToy(event.target)
    })
  } else {
    toyForm.style.display = "none";
  }
});