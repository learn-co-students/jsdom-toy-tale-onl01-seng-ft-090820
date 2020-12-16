let addToy = false;

  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  let toyCollect = document.getElementById("toy-collection");

  function getToys() {
    return fetch("http://localhost:3000/toys")
      .then(resp => resp.json())
  }

  function postToy(toy_data) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0
      })
    })
    .then(resp => resp.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyForm.style.display = "none";
    }
  });

  function likes(e) {
    e.preventDefault();
    let more = parseInt(e.target.previousElementSibling.innerText) + 1

    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(resp => resp.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
  }

  function renderToys(toy){
    let h2 = document.createElement("h2");
    h2.innerText = toy.name

    let img = document.createElement("img");
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')

    let p = document.createElement("p")
    p.innerText = `${toy.likes} likes`

    let button = document.createElement("button")
    button.innerText = "Like <3"
    button.setAttribute('class', 'like-btn')
    button.setAttribute('id', toy.id)
    button.addEventListener("click", (e) => {
       likes(e)
    })

    let divCard = document.createElement("div")
    divCard.setAttribute("class", "card")
    divCard.append(h2, img, p, button)
    toyCollect.appendChild(divCard)
  }

  getToys().then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
      })
    });
