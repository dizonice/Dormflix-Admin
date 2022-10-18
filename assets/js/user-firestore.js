// ===== Imports and Configurations ===== //
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
    getFirestore, doc, getDocs, onSnapshot, collection
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAklyCSNDIpdLg1Wb6nTRZoFNc_gWdR0mQ",
    authDomain: "dormflix-gncd69.firebaseapp.com",
    databaseURL: "https://dormflix-gncd69-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dormflix-gncd69",
    storageBucket: "dormflix-gncd69.appspot.com",
    messagingSenderId: "230970620762",
    appId: "1:230970620762:web:6332b503b8f83262569163",
    measurementId: "G-3FKXSP5Z7R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

// ===== Fill User Table ===== //
var userNo = 0;
var userList = [];
var tbody = document.getElementById('user-table');

function addUserToTable(fname, email, pass, phone) {
    let trow = document.createElement('tr');
    let td0 = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');

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
    '<button class="edit-btn" onclick="editmodal.showModal()"><i class="bx bxs-edit"></i></button>';
    actionTd.innerHTML +=
    '<button class="del-btn" onclick="delmodal.showModal()"><i class="bx bxs-trash"></i></button>';
    actionTd.classList.add('action-td');

    trow.appendChild(actionTd);
    tbody.appendChild(trow);
}

function addAllUserToTable(Users) {
    userNo = 0;
    tbody.innerHTML = '';
    Users.forEach((element) => {
        addUserToTable(element.fname, element.email, element.pass, element.phone);
    });
}

async function getUserRealtime() {
    const dbRef = collection(db, 'Users');

    onSnapshot(dbRef, (querySnapshot) => {
        var users = [];

        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        addAllUserToTable(users);
    });
}

window.onload = getUserRealtime;