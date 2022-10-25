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
                    <button id="editBtn" onclick="editUser('${key}')"><i class="bx bxs-edit"></i></button>
                    <button id="delBtn" onclick="delUser('${key}')"><i class="bx bxs-trash"></i></button>
                </td>
            </tr>`;
    });
});


// ===== Button Tester ===== //
function test() {
    alert('Clicked!');
}

// ===== Add Data ===== //
function addUser() {
    var nameBox = document.getElementById('namefield').value;
    var emailBox = document.getElementById('emailfield').value;
    var numBox = document.getElementById('numfield').value;

    var postListRef = firebase.database().ref('users/');
    var newPostRef = postListRef.push();

    newPostRef.set({
        name: nameBox,
        email: emailBox,
        number: numBox
    });
    location.reload();
}


// ===== Update Data ===== //
function editUser(e) {
    document.getElementById("editUserMod").showModal();

    firebase.database().ref('users/' + e).once("value", (snapshot) => {
        selectedUser = e;

        document.getElementById('namebox').value = snapshot.val().name;
        document.getElementById('emailbox').value = snapshot.val().email;
        document.getElementById('numbox').value = snapshot.val().number
    })

    var save = document.getElementById("editsave");

    save.addEventListener("click", function() {
        firebase.database().ref('users/' + selectedUser).update({
            name: document.getElementById('namebox').value,
            email: document.getElementById('emailbox').value,
            number: document.getElementById('numbox').value
        })
        location.reload();
    });
}


// ===== Delete Data ===== //
function delUser(e) {
    document.getElementById("delTenantMod").showModal();

    var confirm = document.getElementById("delconfirm");

    confirm.addEventListener("click", function() {
        firebase.database().ref('tenants/' + e).remove();
        location.reload();
    });
}