// let updateCart = []
if (localStorage.getItem('cartItems')) {
    updateCart = JSON.parse(localStorage.getItem('cartItems'), [])
}

let many
const showCart = () => {
    if (localStorage.cartItems == undefined) {
        alert('Giỏ của bạn trống trơn. Vui lòng quay lại trang sản phẩm để đặt hàng.')
        location.href = "sanpham.html"
    } else {
        let custommerCart = JSON.parse(localStorage.getItem('cartItems'))

        const tblHead = document.getElementsByTagName('thead')[0]
        const tblBody = document.getElementsByTagName('tbody')[0]
        const tblFoot = document.getElementsByTagName('tfoot')[0]

        let headColumns = footColumns = ''

        headColumns += '<tr><th>STT</th><th>Hình</th><th colspan="2">Tên</th><th>Giá</th><th colspan="3">Số lượng</th></tr>'
        tblHead.innerHTML = headColumns

        let total = amountPaid = 0
        let no = 0

        if (checkItem(custommerCart) === -1) {
            tblBody.innerHTML += '<tr><td class="no-item" colspan="6">Không tìm thấy sản phẩm</td></tr>'
        } else {
            custommerCart.forEach(item => {
                tblBody.innerHTML += '<tr><td>' + ++no + '</td><td><img class="img_order" src="' + item.urlImg + '" alt=""><p hidden>' + item.id + '</p></td><td colspan="2">' + item.name + '</td><td class="VND">' + item.price + '</td><td class="text-center"><a href="#" onclick="deleteCart(this)">-</a></td><td class="text-center">' + item.quantity + '</td><td class="text-center"><a href="#" onclick="addCart(this)">+</a></td></tr>'
                total += Number(item.quantity) * Number(item.price)
            })
        }

        footColumns += '<tr><td colspan="4">Tổng cộng: </td><td class="VND">' + total + '</td><td colspan="3" class="deleteAll"><a href="#" onclick="deleteAllCart(this)">Xóa tất cả</a></td></tr>'
        footColumns += '<tr><td colspan="4">Thuế VAT (10%): </td><td class="VND">' + Math.floor(total * 0.1) + '</td><td rowspan="2" colspan="3"><button onclick="btn_order()" class="submit-order">Đặt Hàng</button></td></tr>'
        footColumns += '<tr><td colspan="4">Phải trả: </td><td class="VND">' + Math.floor(1.1 * total) + '</td></tr>'

        tblFoot.innerHTML = footColumns
        many = total * 1.1

        const itemVND = document.querySelectorAll('.VND')
        itemVND.forEach(item => {
            item.innerText = Number(item.innerText).toLocaleString('de-DE', { style: 'currency', currency: 'VND' })
        })
    }
}

const checkItem = (arr) => {
    let temp = -1
    arr.forEach(item => {
        if (item.quantity > 0) temp = 1
    })
    return temp
}

const deleteCart = (evt) => {
    let id = evt.parentElement.parentElement.children[1].textContent
    let find;
    updateCart.findIndex((element, index) => {
        if (element.id == id) find = index
    })
    if (find !== undefined) {
        if (updateCart[find].quantity > 1) {
            updateCart[find].quantity--
        } else {
            updateCart = updateCart.filter(item => {
                return item.id !== id
            })
        }
    }
    localStorage.setItem('cartItems', JSON.stringify(updateCart))
    window.location.reload()
}

const addCart = (evt) => {
    let id = evt.parentElement.parentElement.children[1].textContent
    console.log(id);
    let find;
    updateCart.findIndex((element, index) => {
        if (element.id == id) find = index
    })
    if (find !== undefined) {
        if (updateCart[find].quantity < 10) {
            updateCart[find].quantity++
        } else {
            alert('Bạn đã đặt số lượng tối đa cho sản phẩm này!!!')
        }
    }
    localStorage.setItem('cartItems', JSON.stringify(updateCart))
    window.location.reload()
}

const btn_order = () => {
    let Cart = JSON.parse(localStorage.getItem('cartItems'), [])

    if (checkItem(Cart) !== -1) {
        let says = confirm('Đặt Hàng?')
        if (says) {
            many = Number(many).toLocaleString('de-DE', { style: 'currency', currency: 'VND' })

            alert('Đặt hàng thành công, Số tiền phải trả là: ' + many)
            Cart = Cart.filter(item => {
                return item.quantity < 0
            })
            localStorage.setItem('cartItems', JSON.stringify(Cart))
            window.location.reload()
        }
    } else {
        alert('Bạn chưa có sản phẩm trong giỏ hàng!')
        location.href = "sanpham.html"
    }
}

const deleteAllCart = () => {
    let Cart = JSON.parse(localStorage.getItem('cartItems'), [])
    if (checkItem(Cart) !== -1) {
        let says = confirm('Bạn muốn xóa tất cả??')
        if (says) {
            Cart = Cart.filter(item => {
                return item.quantity < 0
            })
            localStorage.setItem('cartItems', JSON.stringify(Cart))
            window.location.reload()
        }
    }
}