// let updateCart = []
if (localStorage.getItem('cartItems')) {
    updateCart = JSON.parse(localStorage.getItem('cartItems'), [])
}

let many
const showCart = () => {
    if (localStorage.cartItems == undefined) {
        alert('Your cart is empty. Please go back homepage to order items.')
        location.href = "sanpham.html"
    } else {
        let custommerCart = JSON.parse(localStorage.getItem('cartItems'))

        const tblHead = document.getElementsByTagName('thead')[0]
        const tblBody = document.getElementsByTagName('tbody')[0]
        const tblFoot = document.getElementsByTagName('tfoot')[0]

        let headColumns = footColumns = ''

        headColumns += '<tr><th>STT</th><th>ID</th><th>Tên</th><th>Số lượng</th><th>Giá</th><th>Xóa</th></tr>'
        tblHead.innerHTML = headColumns

        let total = amountPaid = 0
        let no = 0

        let temp = -1;
        custommerCart.forEach(item => {
            if (item.quantity > 0) temp = 1
        })
        if (temp === -1) {
            tblBody.innerHTML += '<tr><td colspan="6">No Items Found</td></tr>'
        } else {
            custommerCart.forEach(item => {
                tblBody.innerHTML += '<tr><td>' + ++no + '</td><td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.quantity + '</td><td class="VND">' + item.price + '</td><td><a href="#" onclick="deleteCart(this)">Delete</a></td></tr>'
                total += Number(item.quantity) * Number(item.price)
            })
        }

        footColumns += '<tr><td colspan="4">Tổng cộng: </td><td class="VND">' + total + '</td><td rowspan="2"><button onclick="btn_order()" class="submit-order">Đặt Hàng</button></td></tr>'
        footColumns += '<tr><td colspan="4">Thuế VAT (10%): </td><td class="VND">' + Math.floor(total * 0.1) + '</td></tr>'
        footColumns += '<tr><td colspan="4">Phải trả: </td><td class="VND">' + Math.floor(1.1 * total) + '</td><td><a href="#" onclick="deleteAllCart(this)">Xóa tất cả</a></td></tr>'

        tblFoot.innerHTML = footColumns
        many = total


        const itemVND = document.querySelectorAll('.VND')
        itemVND.forEach(item => {
            item.innerText = Number(item.innerText).toLocaleString('de-DE', { style: 'currency', currency: 'VND' })
        })
    }
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

const btn_order = () => {
    many = Number(many).toLocaleString('de-DE', { style: 'currency', currency: 'VND' })
    alert('Đặt hàng thành công, Số tiền phải trả là: ' + many)
}

const deleteAllCart = () => {
    let Cart = JSON.parse(localStorage.getItem('cartItems'), [])
    Cart = Cart.filter(item => {
        return item.quantity < 0
    })
    localStorage.setItem('cartItems', JSON.stringify(Cart))
    window.location.reload()
}