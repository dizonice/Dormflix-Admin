var db = firebase.database();


// ===== Get Rooms Data ===== //
var roomRef = firebase.database().ref('rooms');

roomRef.once('value', (snapshot) => {
    var obj = snapshot.val();

    Object.keys(obj).forEach((key) => {
        document.querySelector('#room-table').innerHTML += `
            <tr>
                <td>${obj[key].roomno}</td>
                <td><img src="${obj[key].purl}"></td>
                <td>
                    <p><b>${obj[key].dormname}</b></p>
                    <p><small>Description: ${obj[key].desc}</small></p>
                </td>
                <td>₱${obj[key].price}.00</td>
                <td>${obj[key].totalbed}</td>
                <td>${obj[key].availbed}</td>
                <td>
                    <button id="editBtn" onclick="editRoom('${key}')"><i class="bx bxs-edit"></i></button>
                    <button id="delBtn" onclick="delRoom('${key}')"><i class="bx bxs-trash"></i></button>
                </td>
            </tr>`;
    });
});


// ===== Upload Image Function ===== //
var imgName, imgUrl;
var files = [];
var reader;

// ===== Select Process ===== //
document.getElementById("selectbtn").onclick = function(e) {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.readAsDataURL(files[0]);
    }
    input.click();
}


// ===== Upload Process ===== //
document.getElementById('uploadbtn').onclick = function(){
    imgName = document.getElementById("filebox").value;
    var uploadTask = firebase.storage().ref('dorms/'+ imgName +'.jpg').put(files[0]);

    // ===== Uploading bar ===== //
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById('upProgress').innerHTML = 'Upload'+progress+'%';
    },

    // ===== Error handling ===== //
    function(error){
        alert('Error in saving image: ' + error);
    },

    // ===== Submit image link to database ===== //
    function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            imgUrl = url;
        
            var roomListRef = firebase.database().ref('dorms/');
            var newRoomRef = roomListRef.push();

            newRoomRef.set({
                purl: imgUrl
            });
        });
    });
}


// ===== Upload Check ===== //
const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");

// form click event
form.addEventListener("click", () =>{
  fileInput.click();
});

fileInput.onchange = ({target})=>{
  let file = target.files[0]; //getting file [0] this means if user has selected multiple files then get first one only
  if(file){
    let fileName = file.name; //getting file name
    if(fileName.length >= 12){ //if file name length is greater than 12 then split it and add ...
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(fileName); //calling uploadFile with passing file name as an argument
  }
}

// file upload function
function uploadFile(name){
  let xhr = new XMLHttpRequest(); //creating new xhr object (AJAX)
  xhr.open("POST", "php/upload.php"); //sending post request to the specified URL
  xhr.upload.addEventListener("progress", ({loaded, total}) =>{ //file uploading progress event
    let fileLoaded = Math.floor((loaded / total) * 100);  //getting percentage of loaded file size
    let fileTotal = Math.floor(total / 1000); //gettting total file size in KB from bytes
    let fileSize;
    // if file size is less than 1024 then add only KB else convert this KB into MB
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    // uploadedArea.innerHTML = ""; //uncomment this line if you don't want to show upload history
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if(loaded == total){
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      // uploadedArea.innerHTML = uploadedHTML; //uncomment this line if you don't want to show upload history
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML); //remove this line if you don't want to show upload history
    }
  });
}


// ===== Add Data ===== //
var btnAdd = document.getElementById('addRoomBtn');

function addRoom() {
    document.getElementById("addRoomMod").showModal();

    var add = document.getElementById("addsave");

    add.addEventListener("click", function() {
        var dormBox = document.getElementById('dormfield').value;
        var roomBox = document.getElementById('roomfield').value;
        var descBox = document.getElementById('descfield').value;
        var totalBox = document.getElementById('totalfield').value;
        var availBox = document.getElementById('availfield').value;
        var priceBox = document.getElementById('pricefield').value;

        var roomListRef = firebase.database().ref('rooms/');
        var newRoomRef = roomListRef.push();

        newRoomRef.set({
            dormname: dormBox,
            roomno: roomBox,
            desc: descBox,
            totalbed: totalBox,
            availbed: availBox,
            price: priceBox
        })
        .then(() => {
            alert('Room successfully added.');
            location.reload();
        })
        .catch((error) => {
            alert('Unsuccessful, error: ' + error);
        });
    });
}


// ===== Update Data ===== //
function editRoom(e) {
    document.getElementById("editRoomMod").showModal();

    firebase.database().ref('rooms/' + e).once("value", (snapshot) => {
        selectedRoom = e;

        document.getElementById('dormbox').value = snapshot.val().dormname;
        document.getElementById('roombox').value = snapshot.val().roomno;
        document.getElementById('descbox').value = snapshot.val().desc;
        document.getElementById('totalbox').value = snapshot.val().totalbed;
        document.getElementById('availbox').value = snapshot.val().availbed;
        document.getElementById('pricebox').value = snapshot.val().price
    })

    var save = document.getElementById("editsave");

    save.addEventListener("click", function() {
        firebase.database().ref('rooms/' + selectedRoom).update({
            dormname: document.getElementById('dormbox').value,
            roomno: document.getElementById('roombox').value,
            desc: document.getElementById('descbox').value,
            totalbed: document.getElementById('totalbox').value,
            availbed: document.getElementById('availbox').value,
            price: document.getElementById('pricebox').value
        })
        .then(() => {
            alert('Room successfully updated.');
            location.reload();
        })
        .catch((error) => {
            alert('Unsuccessful, error: ' + error);
        });
    });
}


// ===== Delete Data ===== //
function delRoom(e) {
    document.getElementById("delRoomMod").showModal();

    var confirm = document.getElementById("delconfirm");

    confirm.addEventListener("click", function() {
        firebase.database().ref('rooms/' + e).remove()
        .then(() => {
            alert('Room successfully deleted.');
            location.reload();
        })
        .catch((error) => {
            alert('Unsuccessful, error: ' + error);
        });
    });
}


// ===== Count Data ===== //
function countRooms() {
    var roomCount = 0;
    
    firebase.database().ref('rooms/').once("value", (snapshot) => {
            roomCount = snapshot.numChildren();
            document.getElementById("roomsNo").innerHTML = roomCount;
    });
}


// ===== Button Listeners ===== //
btnAdd.addEventListener('click', addRoom);