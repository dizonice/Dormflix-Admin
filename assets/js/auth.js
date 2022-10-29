// ===== Initialize Variables ===== //
const auth = firebase.auth();
const database = firebase.database();

// ===== Login Auth ===== //
const loginForm = document.querySelector('#login-form');
loginbtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Get user info
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    // Log the user in
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user)
        loginForm.reset();
        window.location.href = '/dashboard.html';
        alert('Login successful');
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        
        alert(errorMessage);
    });
});

// ===== User Logout ===== //
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    //e.preventDefault();
    //auth.signOut();
    alert('Admin logged out.');
});

// ===== Listen for Auth Status Changes ===== //
auth.onAuthStateChange((user) => {
    if (user) {
        console.log('Admin logged in: ', user);
    } else {
        console.log('Admin logged out: ', user);
    }
});