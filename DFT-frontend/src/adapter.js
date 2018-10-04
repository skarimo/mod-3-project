class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  get(path) {
    return fetch(path).then(res => res.json())
  }

  getImageDataFromAPI(imgBase64) {
    return $.ajax({
      type: 'POST',
      url: API_URL,
      data: {
        api_key: API_KEY,
        api_secret: API_SECRET,
        // enctype: 'multipart/form-data',
        // return_attributes: "gender",
        return_attributes: "age,gender,smiling,skinstatus,emotion,ethnicity,beauty",
        image_base64: imgBase64
      }
    })
  }

  saveImageData(user_id, photoObj) {
    let data = photoObj.faces[0].attributes
    data.user_id = user_id
    // data.note = inputNote
    return fetch(this.baseURL + "/photo_infos",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
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

  getPhoto(id) {
    return fetch(this.baseURL + `/photo_infos/${id}`).then(res => res.json())
  }
  getPhotoOutline(imgBase64){
    let outlineURL = "https://api-us.faceplusplus.com/humanbodypp/v2/segment"
    return $.ajax({
      type: 'POST',
      url: outlineURL,
      data: {
        api_key: API_KEY,
        api_secret: API_SECRET,
        // enctype: 'multipart/form-data',
        // return_attributes: "gender",
        // return_attributes: "age,gender,smiling,skinstatus,emotion,ethnicity,beauty",
        image_base64: imgBase64
      }
    })
}

  addNote(id,inputNote){

    return fetch(this.baseURL + `/photo_infos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({note:inputNote}), // body data type must match
    }).then(res => res.json())

  }

}
