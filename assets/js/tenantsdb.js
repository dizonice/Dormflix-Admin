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
                <td>${obj[key].roomno}</td>
                <td>${obj[key].date}</td>
                <td>
                    <button id="editBtn" onclick="editTenant('${key}')"><i class="bx bxs-edit"></i></button>
                    <button id="delBtn" onclick="delTenant('${key}')"><i class="bx bxs-trash"></i></button>
                </td>
            </tr>`;
    });
});


// ===== Add Data ===== //
function addTenant() {
    document.getElementById("editTenantMod").showModal();

    var add = document.getElementById("editsave");

    add.addEventListener("click", function() {
        var nameBox = document.getElementById('namebox').value;
        var numBox = document.getElementById('numbox').value;
        var roomBox = document.getElementById('roombox').value;
        var dateBox = document.getElementById('datebox').value;

        var tenantListRef = firebase.database().ref('tenants/');
        var newTenantRef = tenantListRef.push();

        newTenantRef.set({
            fname: nameBox,
            pnumber: numBox,
            roomno: roomBox,
            date: dateBox,
        })
        .then(() => {
            alert('Tenant successfully added.');
            location.reload();
        })
        .catch((error) => {
            alert('Unsuccessful, error: ' + error);
        });
    });
}

// ===== Update Data ===== //
function editTenant(e) {
    document.getElementById("editTenantMod").showModal();

    firebase.database().ref('tenants/' + e).once("value", (snapshot) => {
        selectedTenant = e;

        document.getElementById('namebox').value = snapshot.val().fname;
        document.getElementById('numbox').value = snapshot.val().pnumber;
        document.getElementById('roombox').value = snapshot.val().roomno;
        document.getElementById('datebox').value = snapshot.val().date
    })

    var save = document.getElementById("editsave");

    save.addEventListener("click", function() {
        firebase.database().ref('tenants/' + selectedTenant).update({
            fname: document.getElementById('namebox').value,
            pnumber: document.getElementById('numbox').value,
            roomno: document.getElementById('roombox').value,
            date: document.getElementById('datebox').value
        })
        .then(() => {
            alert('Tenant successfully updated.');
            location.reload();
        })
        .catch((error) => {
            alert('Unsuccessful, error: ' + error);
        });
    });
}


// ===== Delete Data ===== //
function delTenant(e) {
    document.getElementById("delTenantMod").showModal();

    var confirm = document.getElementById("delconfirm");

    confirm.addEventListener("click", function() {
        firebase.database().ref('tenants/' + e).remove();
        location.reload();
    })
    .then(() => {
        alert('Tenant successfully deleted.');
        location.reload();
    })
    .catch((error) => {
        alert('Unsuccessful, error: ' + error);
    });
}


// ===== Count Data ===== //
function countTenants() {
    var tenantCount = 0;
    
    firebase.database().ref('tenants/').once("value", (snapshot) => {
            tenantCount = snapshot.numChildren();
            document.getElementById("tenantsNo").innerHTML = tenantCount;
    });
}