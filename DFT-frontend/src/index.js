const API_URL = "https://api-us.faceplusplus.com/facepp/v3/detect"
const API_KEY = "xeqjFioREjQnZE7GE6WkWMeotdUYswm8"
const API_SECRET = "xP7bTCyA6UMD5c_eMTdVxgCcLIkBhcN1"
const baseURL = "http://localhost:3000/api/v1"

let photoForm = document.querySelector("#photo-form")
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let video = document.getElementById('video');
const loginForm = document.getElementById('user-login-form');
const takePhotoForm = document.getElementById('take-photo');
const chartContDiv = document.getElementById('chart-container');
const chartEmotDiv = document.getElementById('chart-emotion');

const adapter = new Adapter(baseURL)
let user_id;
let email;
let name;

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
  snap.addEventListener("click",(e) => {
  e.preventDefault()
    TakePhoto().then((photoBase64) => {
      adapter.getImageDataFromAPI(photoBase64).then((photoObj)=> {
        console.log(photoObj)
        adapter.saveImageData(user_id, photoObj)
        .then(renderDisplay)

      })
      .then(() =>{
        document.addEventListener("click",(e) => {
          console.log(e.target)
          if (e.target.id === "navbar-button") {
            renderPrevious()
            console.log(adapter.getPhoto(23))
          } else if (e.target.class === "photo-details-list") {
            let id = e.target.id
            adapter.getPhoto(id).then((imgObj) => {
              renderDisplay(imgObj)
              let userPrevious = document.getElementById('user-previous')
              userPrevious.style = "display: none;"
            })
          }
        })
      })
    })
  })
}

function renderDisplay(res) {
  takePhotoForm.style = "display: none;"
  let displayBlock = document.getElementById('display');
  let navBar = document.querySelector(".topnav")
  navBar.style = "display: block;"
  displayBlock.style = "display: block;"
  createChart(res)
  // makeEmotionChart(res)
  // makeBeautyFemaleChart(res)
  // makeBeautyMaleChart(res)
  // chartEmotDiv.append("")
  // adapter.getUserPreviousImages(user_id)
  // .then(previousPhotoInfos)
}

function renderPrevious() {
  let displayBlock = document.getElementById('display');
  let userPrevious = document.getElementById('user-previous')
  userPrevious.innerHTML = ""
  userPrevious.style = "display: block;"
  displayBlock.style = "display: none;"
  let allPhotos = adapter.getUserPreviousImages(user_id)
  let ol = document.createElement("ol")
  allPhotos.then((photos)=>{
    photos.forEach(function(photo) {
      let date = new Date(photo.created_at)
      let options = {
        year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"}
      let li = document.createElement("li")
      li.innerText = `${date.toLocaleString("en-us", options)}`
      li.class = "photo-details-list"
      li.id = `${photo.id}`
      ol.append(li)
    })
  })

  userPrevious.append(ol)
}











// function previousPhotoInfos (arrOfResults) {
//   arrOfResults.forEach(createElement)
// }
// function createElement (el) {
//   console.log(el.age);
// }
