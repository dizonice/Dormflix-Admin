// ===== Login ===== //
const inputs = document.querySelectorAll('.input-field');
const toggle_btn = document.querySelectorAll('.toggle');
const main = document.querySelector('.login-main');
const bullets = document.querySelectorAll('.bullets .span');
const images = document.querySelectorAll('.image');

inputs.forEach((inp) => {
    inp.addEventListener('focus', () => {
        inp.classList.add('active');
    });
    inp.addEventListener('blur', () => {
        if (inp.value != '') return;
        inp.classList.remove('active');
    });
});


function moveSlider() {
    let index = this.dataset.value;

    let currentImage = document.querySelector(`.img-${index}`);
    images.forEach((img) => img.classList.remove('show'));
    currentImage.classList.add('show');

    const textSlider = document.querySelector('.text-group');
    textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

    bullets.forEach((bull) => bull.classList.remove('active'));
    this.classList.add('active');
}

bullets.forEach((bullet) => {
    bullet.addEventListener('click', moveSlider);
});


// ===== Sidebar Toggle ===== //
const body = document.querySelector('body'),
    modeToggle = body.querySelector('.mode-toggle');
sidebar = body.querySelector('.sidebar');
sidebarToggle = body.querySelector('.sidebar-toggle');

let getStatus = localStorage.getItem('status');
if (getStatus && getStatus === 'close') {
    sidebar.classList.toggle('close');
}

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('close');
    if (sidebar.classList.contains('close')) {
        localStorage.setItem('status', 'close');
    } else {
        localStorage.setItem('status', 'open');
    }
});


// ===== Sidebar Active Listener  ===== // 



// ===== Dashboard Cards Listener  ===== // 
document.getElementById("tenantsCard").onclick = function () {
    location.href = "tenants.html";
};

document.getElementById("roomsCard").onclick = function () {
    location.href = "rooms.html";
};

document.getElementById("feedbacksCard").onclick = function () {
    location.href = "feedbacks.html";
};


/* ===== Include HTML Script ===== 
$(function () {
    $('#sidebar').load('sidebar.html');
}); */
