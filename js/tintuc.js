let x = 0
const more_news = (evt) => {

    if (x === 0) {
        evt.parentElement.children[0].children[0].style.display = "inline"
        evt.innerText = "Ẩn"
        x = 1
    } else {
        evt.parentElement.children[0].children[0].style.display = "none"
        evt.innerText = "Xem thêm"
        x = 0
    }
}