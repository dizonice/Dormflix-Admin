var db = firebase.database();

// ===== Get User Data ===== //
var userRef = firebase.database().ref('users');
userRef.once("value", (snapshot) => {
    var obj = snapshot.val();

    Object.keys(obj).forEach((key) => {
        console.log(key);
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