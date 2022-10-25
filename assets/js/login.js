import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js';
import { getDatabase, ref, update} from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js';
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
const db = getDatabase(app);
const auth = getAuth();

login.addEventListener('click', (e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        const dt = new Date();
        update(ref(db, 'admin/' + user.uid), {
            lastlogin: dt,
        })

        alert('Login successful!');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert('An error has occured: ' + errorMessage);
    });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
      // Admin is signed in, see docs for a list of available properties
      const uid = user.uid;
      // ...
    } else {
      // Admin signed out
      // ...
    }
});

logout.addEventListener('click',(e) => {
    signOut(auth).then(() => {
        // Sign-out successful.
        alert('Admin logged out.');
      }).catch((error) => {
        // An error happened.

        alert('An error has occured: ' + error);
    });
});