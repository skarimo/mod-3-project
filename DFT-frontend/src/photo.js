
function loadCamera() {
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          video.src = window.URL.createObjectURL(stream);
          localstream = stream
          // video.play();
      });
  }
}


function TakePhoto() {
    context.drawImage(video, 0, 0, 640, 480);
    userPhotoContext.drawImage(video, 0, 0, 200, 200);
    video.pause();
    video.src = "";
    localstream.getTracks()[0].stop();
  // let form = document.getElementById("picture")
    return new Promise((res, rej)=>{
    canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
    // photoForm.innerHTML = ""
  }).then((res) => {
   return getBase64(res)
  })
}
