const API_URL = "https://api-us.faceplusplus.com/facepp/v3/detect"
const API_KEY = "xeqjFioREjQnZE7GE6WkWMeotdUYswm8"
const API_SECRET = "xP7bTCyA6UMD5c_eMTdVxgCcLIkBhcN1"
const baseURL = "http://localhost:3000/api/v1"

let form = document.querySelector("#photo-form")
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let video = document.getElementById('video');

const adapter = new Adapter(baseURL)

  loadCamera()

document.getElementById("snap").addEventListener("click", function(e) {
  e.preventDefault()
  TakePhoto().then((file) => {
    getBase64(file).then((x) => {
      adapter.getImageDataFromAPI(x).then(console.log)
    })
  })
console.log(form)

});
