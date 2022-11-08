let lists = document.getElementsByClassName('slider-item')

const next = () => {
    document.getElementById('slider').appendChild(lists[0])
    lists[3].style.animation = 'btn-control-animation-show-next  ease-in-out 0.5s forwards'
    hidden()
}

const prev = () => {
    document.getElementById('slider').prepend(lists[lists.length - 1])
    lists[0].style.animation = 'btn-control-animation-show-prev ease-in-out 0.5s forwards'
    hidden()
}

const hidden = () => {
    for (i = 0; i <= 3; i++) {
        lists[i].style.display = "inline"
    }
    for (i = 4; i < lists.length; i++) {
        lists[i].style.display = "none"
    }
}

hidden()
