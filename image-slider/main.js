const container = document.getElementById('image-container');
const wrapper = document.getElementById('wrapper');

Array.from(document.getElementsByClassName('image')).forEach((item, index) => {
    item.onmouseover = () => {
        wrapper.dataset.activeIndex = index;
    };
});

const handleOnDown = (e) => {
    container.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
    container.dataset.mouseDownAt = '0';
    container.dataset.prevPercentage = container.dataset.percentage;
};

const handleOnMove = (e) => {
    if (container.dataset.mouseDownAt === '0') return;

    const mouseDelta = parseFloat(container.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -60;
    const nextPercentageUnconstrained =
        parseFloat(container.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    container.dataset.percentage = nextPercentage;

    container.animate(
        {
            transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 2000, fill: 'forwards' }
    );

    for (const image of container.getElementsByClassName('image')) {
        image.animate(
            {
                objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 2000, fill: 'forwards' }
        );
    }
};

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);
