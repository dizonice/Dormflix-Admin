var db = firebase.database();

// ===== Get User Data ===== //
var tenantRef = firebase.database().ref('tenants');
tenantRef.once("value", (snapshot) => {
    var obj = snapshot.val();

    Object.keys(obj).forEach((key) => {
        document.querySelector('#tenant-table').innerHTML += `
            <tr>
                <td>${obj[key].fname}</td>
                <td>${obj[key].pnumber}</td>
                <td>
                    <p><b>Room ${obj[key].roomno}</b></p>
                    <p><small>Registration Date: ${obj[key].date}</small></p>
                </td>
                <td>${obj[key].status}</td>
                <td>
                    <button id="editBtn" onclick="editTenant('${key}')"><i class="bx bxs-edit"></i></button>
                    <button id="delBtn" onclick="delTenant('${key}')"><i class="bx bxs-trash"></i></button>
                </td>
            </tr>`;
    });
});


// ===== Button Tester ===== //
function test() {
    alert('Clicked!');
}

// ===== Add Data ===== //
function addTenant() {
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
function editTenant(e) {
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
function delTenant(e) {
    document.getElementById("delTenantMod").showModal();

    var confirm = document.getElementById("delconfirm");

    confirm.addEventListener("click", function() {
        firebase.database().ref('tenants/' + e).remove();
        location.reload();
    });
}