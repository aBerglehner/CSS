const menu = document.getElementById('menu');

Array.from(document.getElementsByClassName('menu-item')).forEach((item, index) => {
    item.onmouseover = () => {
        menu.dataset.activeIndex = index;
        console.log(menu.dataset);
    };
});
