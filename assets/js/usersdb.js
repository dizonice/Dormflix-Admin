// ===== Imports and Configurations ===== //
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js';
import {
    getDatabase, ref, onValue, set, child, get, update
} from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js';

const firebaseConfig = {
    apiKey: 'AIzaSyAklyCSNDIpdLg1Wb6nTRZoFNc_gWdR0mQ',
    authDomain: 'dormflix-gncd69.firebaseapp.com',
    databaseURL: 'https://dormflix-gncd69-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'dormflix-gncd69',
    storageBucket: 'dormflix-gncd69.appspot.com',
    messagingSenderId: '230970620762',
    appId: '1:230970620762:web:6332b503b8f83262569163',
    measurementId: 'G-3FKXSP5Z7R'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
var userRef = ref(db, 'users');

// ===== Get User Data ===== //
onValue(userRef, (snapshot) => {
    var obj = snapshot.val();

    Object.keys(obj).forEach((key) => {
        document.querySelector('#user-table').innerHTML += `
            <tr>
                <td>${key}</td>
                <td>${obj[key].name}</td>
                <td>${obj[key].email}</td>
                <td>${obj[key].number}</td>
                <td>
                    <button id="editBtn" onclick="editUserMod.showModal()"><i class="bx bxs-edit"></i></button>
                    <button id="delBtn" onclick="delUserMod.showModal()"><i class="bx bxs-trash"></i></button>
                </td>
            </tr>`;
            
    });  
});

// ===== Select Data ===== //
function selUser(e) {
    // Needs to call edit modal
    // document.getElementById("editmodal").showModal();

    // then fill boxes with selected data
    onValue(userRef, (snapshot) => {
        selectedUser = e;
        nameBox.value = snapshot.val().name;
        emailBox.value = snapshot.val().email;
        numBox.value = snapshot.val().phone;
    });
}
var selectedUser;

// ===== Update Data ===== //
function updUser() {
    update(ref(db, 'users' + selectedUser), {
        name: numBox.value,
        email: numBox.value,
        number: numBox.value
    });
    location.reload();
}

// ===== Delete Data ===== //
function delUser(e) {
    remove(ref(db, 'users/' + e))
        .then(() => {
            alert('User removed successfully.');
        })
        .catch((error) => {
            alert('Unsuccessl, error: ' + error);
        });
    location.reload();
}

// ===== Test ===== //
var btnDel  = document.getElementById("deleteUser");
var btnEdt  = document.getElementById("editUser");

function run(){
    
}

btnEdt.addEventListener("click", run, false);