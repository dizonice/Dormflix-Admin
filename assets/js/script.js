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
const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a').forEach((link) => {
    if (link.href.includes(`${activePage}`)) {
        link.classList.add('active');
        console.log(link);
    }
});

// ===== Dashboard Cards Listener  ===== //
document.getElementById('tenantsCard').onclick = function () {
    location.href = 'tenants.html';
};

document.getElementById('roomsCard').onclick = function () {
    location.href = 'rooms.html';
};

document.getElementById('feedbacksCard').onclick = function () {
    location.href = 'feedbacks.html';
};