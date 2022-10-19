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
var feedbackRef = ref(db, 'feedbacks');

// ===== Get User Data ===== //
onValue(feedbackRef, (snapshot) => {
    var obj = snapshot.val();

    Object.keys(obj).forEach((key) => {
        document.querySelector('#feedback-table').innerHTML += `
            <tr>
                <td>${key}</td>
                <td>${obj[key].user}</td>
                <td>${obj[key].message}</td>
                <td class="action-btn">
                    <button id="editBtn" onclick="editRoomMod.showModal()"><i class="bx bxs-edit"></i></button>
                    <button id="delBtn" onclick="delRoomMod.showModal()"><i class="bx bxs-trash"></i></button>
                </td>
            </tr>`;
    });
});