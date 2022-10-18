// ===== Imports and Configurations ===== //
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js';
import {
    getDatabase,
    ref,
    child,
    onValue,
    get
} from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js';

const firebaseConfig = {
    apiKey: 'AIzaSyAklyCSNDIpdLg1Wb6nTRZoFNc_gWdR0mQ',
    authDomain: 'dormflix-gncd69.firebaseapp.com',
    databaseURL:
        'https://dormflix-gncd69-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'dormflix-gncd69',
    storageBucket: 'dormflix-gncd69.appspot.com',
    messagingSenderId: '230970620762',
    appId: '1:230970620762:web:6332b503b8f83262569163',
    measurementId: 'G-3FKXSP5Z7R'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// ===== Fill User Table ===== //
var userNo = 0;
var userList = [];
var tbody = document.getElementById('user-table');

function addUserToTable(fname, email, pass, phone) {
    var trow = document.createElement('tr');
    var td0 = document.createElement('td');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');

    userList.push([fname, email, pass, phone]);
    td0.innerHTML = ++userNo;
    td1.innerHTML = fname;
    td2.innerHTML = email;
    td3.innerHTML = pass;
    td4.innerHTML = phone;

    trow.appendChild(td0);
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);

    var actionTd = document.createElement('td');
    actionTd.innerHTML =
        '<button class="edit-btn" onclick="editmodal.showModal(); fillTBoxes('+userNo+')"><i class="bx bxs-edit"></i></button>';
    actionTd.innerHTML +=
        '<button class="del-btn" onclick="delmodal.showModal(); fillTBoxes(null)"><i class="bx bxs-trash"></i></button>';
    actionTd.classList.add('action-td');

    trow.appendChild(actionTd);
    tbody.appendChild(trow);
}

function addAllUserToTable(Users) {
    userNo = 0;
    tbody.innerHTML = '';
    Users.forEach((element) => {
        addUserToTable(
            element.fname,
            element.email,
            element.pass,
            element.phone
        );
    });
}

var editName = document.getElementById('nameEdit');
var editEmail = document.getElementById('emailEdit');
var editPass = document.getElementById('passEdit');
var editPhone = document.getElementById('phoneEdit');

var btnModUpd = document.getElementById('updModBtn');
var btnModDel = document.getElementById('delModBtn');

function fillTBoxes(index) {
    if(index==null) {
        editName.value = "";
        editEmail.value = "";
        editPass.value = "";
        editPhone.value = "";
    }
    else {
        --index;
        editName.value = userList[index][0];
        editEmail.value = userList[index][1];
        editPass.value = userList[index][2];
        editPhone.value = userList[index][3];
    }
}


// ===== Get Data Realtime ===== //
function getAllUserRealtime() {
    const dbRef = ref(db, 'users');

    onValue(dbRef, (snapshot) => {
        var users = [];

        snapshot.forEach((childSnapshot) => {
            users.push(childSnapshot.val());
        });
        addAllUserToTable(users);
    });
}
window.onload = getAllUserRealtime;
