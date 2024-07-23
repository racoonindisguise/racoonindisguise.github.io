document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    const closeBtn = document.getElementById('closeBtn');

    menuBtn.addEventListener('click', () => {
        menu.classList.add('open');
        menuBtn.style.display = 'none';
        closeBtn.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        menu.classList.remove('open');
        closeBtn.style.display = 'none';
        menuBtn.style.display = 'block';
    });

    // Close menu when clicking on a menu item
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('open');
            closeBtn.style.display = 'none';
            menuBtn.style.display = 'block';
        });
    });
});
