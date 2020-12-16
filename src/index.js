let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyContainer = document.querySelector('div#toy-collection');

  function fetchToys (){
    return fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
  }

  function postToy(toyData) {

    let formData = {
      "name": toyData.name.value,
      "image": toyData.image.value,
      "likes": 0
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch('http://localhost:3000/toys', configObj)
    .then(resp => resp.json())
    .then(toy_obj => {
      let new_toy = renderToys(toy_obj)
      toyContainer.appendChild(new_toy)
    });
  }

  function likes(e) {
    e.preventDefault();
    let more = parseInt(e.target.previousElementSibling.innerText) + 1;
    let likeData = {"likes": more}
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(likeData)
    };
    fetch('http://localhost:3000/toys', configObj)
      .then(resp => resp.json())
      .then(like_obj => {
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

    let btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', toy.id)
    btn.innerText = "like"
    btn.addEventListener('click', (e) => {
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
        postToy(event.target)
      })
    } else {
      toyForm.style.display = "none";
    }
  });

  fetchToys().then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
    })
  })

});