var db = firebase.database();
//var btnAdd = document.getElementById('addRoomBtn');

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


// ===== Add Data ===== //
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
var selectedRoom;


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
document.getElementById('addsave').onclick = function(){
    imgName = document.getElementById("filebox").value;
    var uploadTask = firebase.storage().ref('dorms/'+ imgName +'.png').put(files[0]);

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
    function(e){
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            imgUrl = url;
        
            var roomListRef = firebase.database().ref('dorms/' + e);
            var newRoomRef = roomListRef.push();

            newRoomRef.set({
                purl: imgUrl
            });
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
//btnAdd.addEventListener('click', test);

function test() {
    alert('test');
}