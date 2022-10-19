// ===== Login Input ===== //
const inputs = document.querySelectorAll('.input');

function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add('focus');
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == '') {
        parent.classList.remove('focus');
    }
}

inputs.forEach((input) => {
    input.addEventListener('focus', addcl);
    input.addEventListener('blur', remcl);
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

// ===== Include HTML Script ===== //
$(function () {
    $('#sidebar').load('sidebar.html');
});
