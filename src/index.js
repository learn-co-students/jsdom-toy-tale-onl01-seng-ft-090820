const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(toys=>{
    
    let toysHTML = toys.map(function(){
      return `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>4 ${toy.likes} </p>
        <button data-id="${toy.id}"class="like-btn">Like <3</button>
      </div>
      `
    })
      document.querySelector("toy-selection").innerHTML = toysHTML.join('')
  })

  toyFormContainer.addEventListener("Submit",function(e){
    e.preventDefault()
    console.log(e.target.name )
    //grab inputs fromform
    const toyName = e.target.name.value
    const toyImage = e.target.image.value

    fetch ("http://localhost:3000/toys")
      method: "POST"
      headers:{
        "Content-Type": "application/json"
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName ,
        image: toyImage,
        likes: 99
      })
    })
    .then(r=> r.json())
    .then(newToy => {
      //fetch updated the database
      //NOWI NEED TO UPDATE THE DOM
      //CONVERT NEW TOY FROM JSON TO HTML IN ORDER TO ADD TO THE DOM
      let newToyHTML = `
      <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${ newToy.image} class="toy-avatar" />
        <p>4 ${newToy.likes} </p>
        <button data-id="${newToy.id}" class="like-btn">Like <3</button>
      </div>
      `
      //after adding what is below, add the data id to both buttoms in the html
    toyCollection.innerHTML += newToyHTML 
    console.log(e.target.reset())
    
    })
 
  }) 
  toyCollection.addEventListener("click",(e) =>  {
    console.log(e.target)
  })

  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form  
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
