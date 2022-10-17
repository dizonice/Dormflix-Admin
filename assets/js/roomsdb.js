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

// ===== Fill Rooms Table ===== //
var roomNo = 0;
var roomList = [];
//var roomListener = roomNo;
//document.getElementById('roomsNo').innerHTML= roomListener;
var tbody = document.getElementById('rooms-table');

function addRoomToTable(name, details, price, totalbed, availbed) {
    let trow = document.createElement('tr');
    let td0 = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');

    roomList.push([name, details, price, totalbed, availbed]);

    td0.innerHTML = ++roomNo;
    td1.innerHTML = name;
    td2.innerHTML = details;
    td3.innerHTML = price;
    td4.innerHTML = totalbed;
    td5.innerHTML = availbed;

    trow.appendChild(td0);
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);

    var actionTd = document.createElement('td');
    actionTd.innerHTML =
    '<button class="edit-btn" onclick="editmodal.showModal()"><i class="bx bxs-edit"></i></button>';
    actionTd.innerHTML +=
    '<button class="del-btn" onclick="delmodal.showModal()"><i class="bx bxs-trash"></i></button>';
    actionTd.classList.add('action-td');

    trow.appendChild(actionTd);
    tbody.appendChild(trow);
}

function addAllRoomToTable(Rooms) {
    roomNo = 0;
    tbody.innerHTML = '';
    Rooms.forEach((element) => {
        addRoomToTable(element.name, element.details, element.price, element.totalbed, element.availbed);
    });
}

async function getRoomRealtime() {
    const dbRef = collection(db, 'Rooms');

    onSnapshot(dbRef, (querySnapshot) => {
        var rooms = [];

        querySnapshot.forEach((doc) => {
            rooms.push(doc.data());
        });
        addAllRoomToTable(rooms);
    });
}

window.onload = getRoomRealtime;