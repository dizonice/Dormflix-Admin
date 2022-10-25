var db = firebase.database();

// ===== Get User Data ===== //
var userRef = firebase.database().ref('users');

userRef.once("value", (snapshot) => {
    var obj = snapshot.val();

    Object.keys(obj).forEach((key) => {
        document.querySelector('#user-table').innerHTML += `
            <tr>
                <td>${obj[key].name}</td>
                <td>${obj[key].email}</td>
                <td>${obj[key].number}</td>
                <td>
                    <button id="editBtn" onclick="viewUser('${key}')"><i class='bx bxs-message-alt-detail'></i></button>
                    <button id="delBtn" onclick="delUser('${key}')"><i class="bx bxs-trash"></i></button>
                </td>
            </tr>`;
    });
});


// ===== View Data ===== //
function viewUser(e) {
    document.getElementById("viewUserMod").showModal();

    firebase.database().ref('users/' + e).once("value", (snapshot) => {
        selectedUser = e;

        document.getElementById('namebox').value = snapshot.val().name;
        document.getElementById('emailbox').value = snapshot.val().email;
        document.getElementById('numbox').value = snapshot.val().number
    })
}


// ===== Delete Data ===== //
function delUser(e) {
    document.getElementById("delUserMod").showModal();

    var confirm = document.getElementById("delconfirm");

    confirm.addEventListener("click", function() {
        firebase.database().ref('users/' + e).remove()
        .then(() => {
            alert('User successfully deleted.');
            location.reload();
        })
        .catch((error) => {
            alert('An error has occured. Error: ' + error);
        });
    });
}


// ===== Count Data ===== //
function countUsers() {
    var userCount = 0;
    
    firebase.database().ref('users/').once("value", (snapshot) => {
            userCount = snapshot.numChildren();
            document.getElementById("tenantsNo").innerHTML = userCount;
    });
}