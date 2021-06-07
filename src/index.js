let addToy = false;
const collectionDiv = document.getElementById("toy-collection");
const form = document.querySelector('form');
// const likeButtons = document.querySelectorAll('.like-btn')
let errorDiv = document.createElement('div')
errorDiv.setAttribute('class', 'error');
document.body.appendChild(errorDiv);

function addToDom(toy) {
  let newDiv = document.createElement('div');
  newDiv.className= "card";
  newDiv.innerHTML = 
  `<h2>${toy.name}</h2>
   <img sc="${toy.image}">
   <p>${toy.likes} likes</p>
   <button class="like-btn" id="${toy.id}">Like</button>`;
  collectionDiv.appendChild(newDiv);
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  // const likeButtons = document.querySelectorAll('.like-btn');
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
    .then( function(response) {
      return response.json();
    })
    .then(function(toys) {
      for (const toy of toys) {
        addToDom(toy);
      }
      let likeButtons = document.querySelectorAll('.like-btn');
      likeButtons.forEach( button => {
        button.addEventListener('click', activateLikeButton())
      })
    });
});

function handleLikes() {
  console.log("hello")
  // return fetch(`http://localhost:3000/toys/${button.id}`, {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "applicaotn/json",
  //     "Accept": "application/json"
  //   },
  //   body: JSON.stringify({
  //     likes: button.parentElement.querySelector('p').innerText++
  //   })
  // })
  //   .then(function(response) {
  //     return response.json();
  //   })
  //   .then(function(toy) {
  //     increaseLike(toy);
  //   })
  //   .catch(function(error) {
  //     errorDiv.innerHTML = error.message;
  //   })
}


form.addEventListener("submit", function(event) {
  event.preventDefault()
  let name = document.querySelectorAll('form input')[0].name;
  let image = document.querySelectorAll('form input')[1].name
  submitData(name, image);;
});

function submitData(toyName, imgUrl) {
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: imgUrl,
      likes: 0
    })
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(toy) {
      addToDom(toy);
    })
    .catch(function(error) {
      document.body.innerHTML = error.message;
    });
}



// likeButtons.forEach(button => {
//   button.addEventListener('click', function(e) {
//     e.preventDefault();
//     handleLikes();  
//   })
// })

let activateLikeButton = function () {  
  this.addEventListener('click', function(e) {
    e.preventDefault();
    handleLikes();  
  })
}


