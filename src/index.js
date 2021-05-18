let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
});

const fetchToys = () => {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => toys.forEach(showToy))
}

const showToy = toy => {
  let thisToy = toy
  let toyDiv = document.createElement('div')

  toyDiv.classList.add('card')
  toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class ="toy-avatar" />
    <p>${toy.likes}</p>`

    // delete toy button and like toy button
  let deleteBtn = document.createElement('button')
  deleteBtn.class = 'like-btn'
  deleteBtn.innerText = 'Delete'
  deleteBtn.addEventListener('click', e => deleteToy(e, thisToy.id))
  toyDiv.append(deleteBtn)

  let likeBtn = document.createElement('button')
  likeBtn.class = 'like-btn'
  likeBtn.innerText = 'Like <3'
  likeBtn.addEventListener('click', e => showLikes(e, thisToy))
  toyDiv.append(likeBtn)
  
  toyCollection.append(toyDiv)
}

const likeToy = toy => {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ likes: toy.likes++ })
  }).then(resp => resp.json())
}

const deleteToy = (e, id) => {
  e.target.parentNode.remove()
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'DELETE'
  }).then(resp => resp.json())
}

createToyForm.addEventListener('submit', e => {
  e.preventDefault()
  addNewToy(e)
  createToyForm.reset()
})

const addNewToy = e => {
  let newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  createToy(newToy)
}

const createToy = toy => {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
  })
    .then(resp => resp.json())
    .then(showToy(toy))
}

fetchToys()