// ===== Variables and References ===== //
var db = firebase.database();

var btnAdd = document.getElementById('addBtn');
var realBtn = document.getElementById('realbtn');
var uploadBtn = document.getElementById('uploadbtn');
var imgTxt = document.getElementById('imgtext');

var imgName, imgUrl;
var files = [];
var reader = new FileReader();


// ===== Test buttons ===== //
function run() {
    alert('Clicked!');
}


// ===== Get Rooms Data ===== //
var roomRef = firebase.database().ref('rooms');

roomRef.once('value', (snapshot) => {
    var obj = snapshot.val();

    Object.keys(obj).forEach((key) => {
        document.querySelector('#room-table').innerHTML += `
            <tr>
                <td>${obj[key].roomno}</td>
                <td>${obj[key].pic}</td>
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


// ===== Upload Image Function ===== //
function realBtnClick() {
    realBtn.click();
}

function imgTxtUrl() {
    if (realBtn.value) {
        imgTxt.innerHTML = realBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
    } else {
        imgTxt.innerHTML = 'No file chosen, yet.';
    }
}

document.getElementById("");


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

uploadBtn.addEventListener('click', realBtnClick);
realBtn.addEventListener('change', imgTxtUrl);