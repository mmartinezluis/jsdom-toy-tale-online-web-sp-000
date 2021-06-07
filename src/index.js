let addToy = false;
const collectionDiv = document.getElementById("toy-collection");
const form = document.querySelector('form');


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

  return fetch("http://localhost:3000/toys")
    .then( resp => resp.json())
    .then( toys => {
      for (const toy of toys) {
        addToDom(toy);
      }
    })
});

function addToDom(toy) {
  let newDiv = document.createElement('div');
  newDiv.className = "card";
  newDiv.innerHTML = 
  `<h2>${toy.name}</h2>
   <img sc="${toy.image}">
   <p>${toy.likes} likes</p>
   <button class="like-btn" id="${toy.id}">Like</button>`;
  collectionDiv.appendChild(newDiv);
  let button = newDiv.querySelector('button');
  button.addEventListener('click', (e) => {
    handleLikes(e, toy.id, toy.likes);
  });
}

function handleLikes(e, toyId, toyLikes) {  
  e.preventDefault()
  return fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "applicaotn/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": toyLikes++
    })
  })
    .then( resp => resp.json() )
    .then( (toy_obj) => {
      e.target.previousElementSibling.innerText = `${toyLikes} likes`;
    })
    .catch( error => alert(error) )
}


form.addEventListener("submit", function(event) {
  event.preventDefault()
  let name = document.querySelectorAll('form input')[0].name;
  let image = document.querySelectorAll('form input')[1].name
  submitData(name, image);;
});

function submitData(toyName, imgUrl) {
  let formData = {
    name: toyName,
    image: imgUrl,
    likes: 0
  };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }
  return fetch("http://localhost:3000/toys", configObj)
    .then( resp => { return resp.json() } )
    .then( toy => addToDom(toy) )
    .catch( error => alert(error.message) )
}
