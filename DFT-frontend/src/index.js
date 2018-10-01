const API_URL = "https://api-us.faceplusplus.com/facepp/v3/detect"
const API_KEY = "xeqjFioREjQnZE7GE6WkWMeotdUYswm8"
const API_SECRET = "xP7bTCyA6UMD5c_eMTdVxgCcLIkBhcN1"
//


const form = document.querySelector("#files")


form.addEventListener('submit', (e) => {
  e.preventDefault()
  // const test_img = e.target.testpic.value

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.replace(/^.*;base64/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
}

let file = document.querySelector('#files > input[type="file"]').files[0];


getBase64(file).then((res) => {
  console.log(getBase64(file))
  $.ajax({
    type: 'POST',
    url: API_URL,
    data: {
      api_key: API_KEY,
      api_secret: API_SECRET,
      // enctype: 'multipart/form-data',
      // return_attributes: "gender",
      return_attributes: "age,gender,smiling,skinstatus,emotion,ethnicity,beauty",
      image_base64: res
    }
  })
  .then((photo_obj) => {
    let x= photo_obj.faces[0].attributes
    console.log(x)
    x.user_id = 1
    console.log(x)
    fetch("http://localhost:3000/api/v1/photo_infos",{
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
            "Content-Type": "application/json"

        },

        body: JSON.stringify(x)
    })

   .then(response => response.json())
  })

})

})
