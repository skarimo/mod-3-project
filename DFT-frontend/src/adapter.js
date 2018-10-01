class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  get(path) {
    return fetch(path).then(res => res.json())
  }

  getImageDataFromAPI(data) {
    return $.ajax({
      type: 'POST',
      url: API_URL,
      data: {
        api_key: API_KEY,
        api_secret: API_SECRET,
        // enctype: 'multipart/form-data',
        // return_attributes: "gender",
        return_attributes: "age,gender,smiling,skinstatus,emotion,ethnicity,beauty",
        image_base64: data
      }
    })
  }

  saveImageData(user_id, photoObj) {
    let data = photoObj.faces[0].attributes
    x.user_id = user_id
    return fetch(this.baseURL + "/photo_infos",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(x)
    }).then(res => res.json())
  }

  findOrCreateUser(input_name, input_email){
    let data = {name: input_name, email: input_email}
    return fetch(this.baseURL + "/user-find-or-create",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(res => res.json())
  }

  getUserPreviousImages(input_user_id) {
    let data = {user_id: input_user_id}
    return fetch(this.baseURL + "/user-find-all-photos",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(res => res.json())
  }





}
