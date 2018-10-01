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
        adapter.saveImageData(user_id, photoObj)
        .then(renderDisplay)
      })
    })
  })
}

function renderDisplay() {
  takePhotoForm.style = "display: none;"
  const displayBlock = document.getElementById('display');
  displayBlock.style = "display: block;"
}



//   loadCamera()
//
// document.getElementById("snap").addEventListener("click", function(e) {
//   e.preventDefault()
//   TakePhoto().then((file) => {
//     getBase64(file).then((x) => {
//       adapter.getImageDataFromAPI(x).then(console.log)
//     })
//   })
// console.log(form)
//
// });
