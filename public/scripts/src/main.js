let itemInfoIndex = 0;

function scrollToSelector(selector) {
    // alert("okla");

    var workSection = document.querySelector(selector);
    workSection.scrollIntoView({ behavior: "smooth" });
}

function onClickWork() {
    scrollToSelector(".main-section");
}

function onClickInfo() {
    scrollToSelector(".info-section");
}

function onClickContact() {
    scrollToSelector(".contact-section");
}

function scrollToTop() {
    scrollToSelector(".main-section");
}

function onclickExplore() {
    anime({
        targets: '.info-section',
        top: ['100vh', 0],
        borderTopRightRadius:['50vw', 0],
        borderTopLeftRadius:['50vw', 0],
            easing: 'easeOutExpo',
    }) 
    initGame();
}

function moveInfoItem(isNext) {
    const durationAnimation = 700;
    const listItem = document.getElementsByClassName('information-item');
    if (listItem.length === 1) {
        return;
    }
    const currentItem = listItem[itemInfoIndex];
    const prevItem = itemInfoIndex == 0 ? listItem[listItem.length - 1] : listItem[itemInfoIndex - 1];
    const nextItem = itemInfoIndex == listItem.length - 1 ? listItem[0] : listItem[itemInfoIndex + 1];
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');

    const targetBtn = isNext ? nextButton : prevButton;
    const idleBtn = isNext ? prevButton : nextButton;
    anime({
        targets: [currentItem, targetBtn, idleBtn],
        translateX: (el, i) => {
            if (el == idleBtn) {
                return [0, isNext ? innerWidth : -innerWidth]
            } else {
                return [0, isNext ? -innerWidth : innerWidth]
            }
        },
        duration: durationAnimation,
        easing: 'easeInOutQuad'
    });

    setTimeout(() => {
        currentItem.classList.add('hidden');
        nextItem.classList.remove('hidden');
        anime({
            targets: [currentItem, nextItem, targetBtn, idleBtn],
            translateX: (el, i) => {
                if (el != idleBtn) {
                    return [isNext ? innerWidth : -innerWidth, 0]
                } else {
                    return [isNext ? -innerWidth : innerWidth, 0]
                }
            },
            duration: durationAnimation,
            easing: 'easeInOutQuad'
        });
    }, durationAnimation);

    if (isNext) {
        itemInfoIndex = itemInfoIndex == listItem.length - 1 ? 0 : itemInfoIndex + 1;
    } else {
        itemInfoIndex = itemInfoIndex == 0 ? listItem.length - 1 : itemInfoIndex - 1;
    }
}



// anime({
//   targets: ".trung",
//   translateY: 250,
//   rotate: "1turn"
// });
// alert("c");.

scrollOverHello = false;

function showNav(show) {
    const nav = document.getElementById('nav')
    if (show) {
        nav.classList.add('nav-enabled');
    } else {
        nav.classList.remove('nav-enabled');
    }
}

function showScrollToTop(show) {
    const nav = document.getElementById('scrollTop')
    if (show) {
        nav.classList.remove('hide');
    } else {
        nav.classList.add('hide');
    }
}

// init();
let perspectiveWrapper = document.querySelector('.perspective-wrapper');
perspectiveWrapper.addEventListener('scroll', function(e) {
    if (perspectiveWrapper.scrollTop > perspectiveWrapper.offsetHeight / 3 && scrollOverHello === false) {
        scrollOverHello = true;
        showNav(true);
        showScrollToTop(true);
    }

    if (perspectiveWrapper.scrollTop <= perspectiveWrapper.offsetHeight / 3 && scrollOverHello === true) {
        scrollOverHello = false;
        showNav(false);
        showScrollToTop(false);
    }
});

function hideGame() {
    const a = document.getElementById('gameContainer');
    a.classList.add('hidden');
    // anime({
    //     targets: ['#gameContainer'],
    //     opacity: 0,
    //     width: 0,
    //     height: 0,
    // });
}

function showWork() {

}

function init() {
    anime({
        targets: ['#trung'],
        marginTop: [900, 0],
    });
}
init();