let hiddens = document.getElementsByClassName('slider__item')

const next = () => {
    let lists = document.querySelectorAll('.slider__item')
    document.getElementById('slider-list').appendChild(lists[0])
    hiddens[3].style.animation = 'btn-control-animation-show-next  ease-in-out 0.8s forwards'
    hidden()
}

const prev = () => {
    let lists = document.querySelectorAll('.slider__item')
    document.getElementById('slider-list').prepend(lists[lists.length - 1])
    hiddens[0].style.animation = 'btn-control-animation-show-prev ease-in-out 0.8s forwards'
    hidden()
}

const hidden = () => {
    for (i = 0; i <= 3; i++) {
        hiddens[i].style.display = "inline"
    }
    for (i = 4; i <= hiddens.length - 1; i++) {
        hiddens[i].style.display = "none"
        // hiddens[1].style.animation = 'btn-control-animation-show  ease-in-out 0.8s forwards'
    }
}

hidden()
