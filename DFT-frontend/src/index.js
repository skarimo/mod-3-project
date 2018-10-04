const API_URL = "https://api-us.faceplusplus.com/facepp/v3/detect"
const API_KEY = "xeqjFioREjQnZE7GE6WkWMeotdUYswm8"
const API_SECRET = "xP7bTCyA6UMD5c_eMTdVxgCcLIkBhcN1"
const baseURL = "http://localhost:3000/api/v1"

let photoForm = document.querySelector("#photo-form")
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let video = document.getElementById('video');
let userPhoto = document.getElementById('user-photo-canvas');
let userPhotoContext = userPhoto.getContext('2d');
let p = document.getElementById("note-p")

const loginForm = document.getElementById('user-login-form');
const takePhotoForm = document.getElementById('take-photo');
const chartContDiv = document.getElementById('chart-container');
const chartEmotDiv = document.getElementById('chart-emotion');

const adapter = new Adapter(baseURL)
let user_id;
let email;
let name;
let age;
let ethnicity;
let gender;
let photoCount;
let inputNote;

loginForm.addEventListener('submit',(e) => {
  e.preventDefault()
  loginForm.style = "display: none;"
  let input_name = document.getElementById('user-name').value
  let input_email = document.getElementById('user-email').value
  adapter.findOrCreateUser(input_name, input_email)
  .then((userObj) =>{
    user_id = userObj.id
    email = userObj.email
    name = userObj.name
  }).then(renderTakePhoto)
})

function renderTakePhoto() {
  takePhotoForm.style = "display: block;"
  const snap = document.getElementById('snap');
  loadCamera()
  // snap.addEventListener("click",(e) => {
  // e.preventDefault()
  //   TakePhoto().then((photoBase64) => {
  //     adapter.getImageDataFromAPI(photoBase64).then((photoObj)=> {
  //       console.log(photoObj.faces[0].attributes.note)
  //        age = photoObj.faces[0].attributes.age.value
  //        ethnicity = photoObj.faces[0].attributes.ethnicity.value
  //        gender = photoObj.faces[0].attributes.gender.value
  //       adapter.saveImageData(user_id, photoObj)
  //       .then(renderDisplay).then(() =>{
  //         renderPrevious()
  //       })
  //
  //     })
  //   })
  // })
}

// snap.addEventListener("click",(e) => {
// e.preventDefault()
//   TakePhoto().then((photoBase64) => {
//     adapter.getImageDataFromAPI(photoBase64).then((photoObj)=> {
//       console.log(photoObj.faces[0].attributes.note)
//        age = photoObj.faces[0].attributes.age.value
//        ethnicity = photoObj.faces[0].attributes.ethnicity.value
//        gender = photoObj.faces[0].attributes.gender.value
//       adapter.saveImageData(user_id, photoObj)
//       .then(renderDisplay).then(() =>{
//         renderPrevious()
//       })
//
//     })
//   })
// })


document.addEventListener("click",(e) => {
  if (e.target.class === "photo-details-list") {
    let id = e.target.id
    adapter.getPhoto(id).then((imgObj) => {
      renderDisplay(imgObj)
      let userPrevious = document.getElementById('user-previous')

    })
  }else if (e.target.name==="noteSubmit") {
    let inputEl = e.target.parentElement.querySelector("input[name='note'")
    inputNote = inputEl.value
    inputEl.value = ''
    let id = chartContDiv.dataset.id
    // let data1 = {note:inputNote}
    adapter.addNote(id,inputNote)
    .then((imgObj) => {
      renderDisplay(imgObj)
    })
  } else if (e.target.name==="retake-photo") {
    let displayBlock = document.getElementById('display');
    displayBlock.style = "display: none;"
    renderTakePhoto()
  } else if (e.target.id === "snap") {
      e.preventDefault()
      TakePhoto().then((photoBase64) => {
        adapter.getImageDataFromAPI(photoBase64).then((photoObj)=> {
          console.log(photoObj.faces[0].attributes.note)
           age = photoObj.faces[0].attributes.age.value
           ethnicity = photoObj.faces[0].attributes.ethnicity.value
           gender = photoObj.faces[0].attributes.gender.value
          adapter.saveImageData(user_id, photoObj)
          .then(renderDisplay).then(() =>{
            renderPrevious()
          })
        })
      })
  }
})



function renderDisplay(res) {
  takePhotoForm.style = "display: none;"
  let displayBlock = document.getElementById('display');
  displayBlock.style = "display: block;"
  createChart(res)
  if (res.note != null){
      p.innerText = `Note: ${res.note}`
    }else{
      p.innerText = ''
    }
}


function renderPrevious() {
  let userPreviousUl = document.getElementById('user-previous-ul')
      userPreviousUl.innerHTML = ''
  let allPhotos = adapter.getUserPreviousImages(user_id)
  let ul = document.createElement("ul")
  allPhotos.then((photos)=>{
    photoCount = photos.length
    let photosSorted = photos.slice().sort(function(a,b) {
      return a.id - b.id
      })
    photosSorted.forEach(function(photo) {
      let date = new Date(photo.created_at)
      let options = {
        year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"}
      let li = document.createElement("li")
      li.innerText = `${date.toLocaleString("en-us", options)}`
      li.class = "photo-details-list"
      li.id = `${photo.id}`
      li.style = "background-color: rgb(66,80,97); border-bottom: 5px solid rgb(39,46,57); box-shadow: 0px 0px 97px 10px rgba(22,26,32,1); width: 95%;"
      ul.append(li)
      // renderUserDetail()
    })
    renderUserDetail()
  })

  userPreviousUl.append(ul)
}


function renderUserDetail() {
  let userDetailsDiv = document.getElementById('user-detail');
  userDetailsDiv.querySelector('h1').innerText = name
  userDetailsDiv.querySelector('p').innerText = `Age: ${age}  Ethnicity: ${ethnicity}  Gender: ${gender}`
  let userPhotoCount = document.getElementById('user-photo-count');
  userPhotoCount.querySelector('h2').innerText = photoCount
  userPhotoCount.querySelector('p').innerText = "Photo Count"
  console.log(age,ethnicity,gender);
}







// function previousPhotoInfos (arrOfResults) {
//   arrOfResults.forEach(createElement)
// }
// function createElement (el) {
//   console.log(el.age);
// }
