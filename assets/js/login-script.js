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

// ===== Carousel ===== //
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

// ===== Show Password ===== //
const passField = document.querySelector("#password"),
showBtn = document.querySelector(".show-btn")

showBtn.addEventListener('click', () => {
    if (passField.type === 'password') {
        passField.type = 'text';
        showBtn.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passField.type = 'password';
        showBtn.classList.replace('fa-eye-slash', 'fa-eye');
    }
});