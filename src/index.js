let addToy = false;
let toyContainer;
const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");

  document.addEventListener("DOMContentLoaded", () => {
  toyContainer = document.getElementById("toy-collection");
  fetchToys()
  });

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => {
      toyContainer.innerHTML += renderToys(toy)
    })
  })
}

function createToy(toyData) {
  const data = {
    name: toyData.name.value,
    image: toyData.image.value,
    likes: 0
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(resp => resp.json())
  .then(toyObj => {
    let newToy = renderToys(toyObj)
    toyContainer.appendChild(newToy)
  });
}

function likes(e) {
  e.preventDefault();
  let more = parseInt(e.target.previousElementSibling.innerText) + 1;
  let likeData = {likes: more}
  
  fetch('http://localhost:3000/toys', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(likeData)
  })
    .then(resp => resp.json())
    .then(likeObj => {
      e.target.previousElementSibling.innerText = `${more} likes`
    })
}

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let button = document.createElement('button')
  button.setAttribute('class', 'like-btn')
  button.setAttribute('id', toy.id)
  button.innerText = "like"
  button.addEventListener('click', (e) => {
      console.log(e.target.dataset)
      likes(e)
    })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  toyContainer.appendChild(divCard)
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