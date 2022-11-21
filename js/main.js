// Nguyen Quoc Trang B2012274
// Nguyen Truong Nhut Truong B2012050

//03-Vi du-CT188.pdf 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript
//https://www.w3schools.com/js/

//Chỉnh sửa định dạng thành VND
const priceItems = () => {
    const prices = document.querySelectorAll('.price')
    prices.forEach(item => {
        item.innerText = Number(item.innerText).toLocaleString('de-DE', { style: 'currency', currency: 'VND' })
    })
}

let updateCart = []
//Lấy Arr Item trên Storage nếu có
if (localStorage.getItem('cartItems')) {
    updateCart = JSON.parse(localStorage.getItem('cartItems'), [])
}

//Thêm vào giỏ hàng trang chủ
const orderHome = () => {
    const orderItem = (evt) => {
        let id = evt.target.parentElement.parentElement.id
        getItem = document.getElementById(id)
        if (typeof Storage !== undefined) {
            let newItem = {
                id: id,
                name: getItem.children[1].children[0].textContent,
                price: getItem.children[1].children[1].textContent.slice(0, -2).split('.').join(''),
                quantity: 1,
                urlImg: getItem.children[0].currentSrc
            }
            if (JSON.parse(localStorage.getItem('cartItems')) === null) {
                updateCart.push(newItem)
                localStorage.setItem('cartItems', JSON.stringify(updateCart))
            } else {
                let find;
                updateCart.findIndex((element, index) => {
                    if (element.id == id) find = index
                })
                if (find !== undefined) {
                    if (updateCart[find].quantity >= 10) {
                        alert('Bạn đã đặt số lượng tối đa cho sản phẩm này!!!')
                    }
                    else {
                        updateCart[find].quantity++
                    }
                } else {
                    updateCart.push(newItem)
                }
                localStorage.setItem('cartItems', JSON.stringify(updateCart))
            }
        } else {
            alert('Local storage không hoạt động trên trình duyệt của bạn')
        }
    }
    const attachingEvent = evt => evt.addEventListener('click', orderItem)
    const btn_addCart = document.getElementsByClassName('add-cart')
    let arrCart = Array.from(btn_addCart);
    arrCart.forEach(attachingEvent)
}

//Thêm vào giỏ hàng trang sản phẩm
const orderProduct = () => {
    const orderItem = (evt) => {
        let id = evt.target.parentElement.parentElement.parentElement.id;
        getItem = document.getElementById(id)
        if (typeof Storage !== undefined) {
            let newItem = {
                id: id,
                name: getItem.children[1].childNodes[1].textContent,
                price: getItem.children[2].childNodes[1].firstChild.data.slice(0, -2).split('.').join(''),
                quantity: 1,
                urlImg: getItem.children[0].currentSrc
            }
            if (JSON.parse(localStorage.getItem('cartItems')) === null) {
                updateCart.push(newItem)
                localStorage.setItem('cartItems', JSON.stringify(updateCart))
            } else {
                let find;
                updateCart.findIndex((element, index) => {
                    if (element.id == id) find = index
                })
                if (find !== undefined) {
                    if (updateCart[find].quantity >= 10) {
                        alert('Bạn đã đặt số lượng tối đa cho sản phẩm này!!!')
                    }
                    else {
                        updateCart[find].quantity++
                    }
                } else {
                    updateCart.push(newItem)
                }
                localStorage.setItem('cartItems', JSON.stringify(updateCart))
            }
        } else {
            alert('Local storage không hoạt động trên trình duyệt của bạn')
        }
    }
    const attachingEvent = evt => evt.addEventListener('click', orderItem)
    const btn_addCart = document.getElementsByClassName('add-cart')
    let arrCart = Array.from(btn_addCart);
    arrCart.forEach(attachingEvent)
}

//Thêm vào giỏ hàng trang phụ kiện
const order_Accessory = () => {
    const orderItem = (evt) => {
        let id = evt.target.parentElement.parentElement.parentElement.parentElement.id;
        getItem = document.getElementById(id)
        if (typeof Storage !== undefined) {
            let newItem = {
                id: id,
                name: getItem.children[1].textContent,
                price: getItem.children[2].childNodes[3].children[0].textContent.slice(0, -2).split('.').join(''),
                quantity: 1,
                urlImg: getItem.children[0].currentSrc
            }
            if (JSON.parse(localStorage.getItem('cartItems')) === null) {
                updateCart.push(newItem)
                localStorage.setItem('cartItems', JSON.stringify(updateCart))
            } else {
                let find;
                updateCart.findIndex((element, index) => {
                    if (element.id == id) find = index
                })
                if (find !== undefined) {
                    if (updateCart[find].quantity >= 10) {
                        alert('Bạn đã đặt số lượng tối đa cho sản phẩm này!!!')
                    }
                    else {
                        updateCart[find].quantity++
                    }
                } else {
                    updateCart.push(newItem)
                }
                localStorage.setItem('cartItems', JSON.stringify(updateCart))
            }
        } else {
            alert('Local storage không hoạt động trên trình duyệt của bạn')
        }
    }
    const attachingEvent = evt => evt.addEventListener('click', orderItem)
    const btn_addCart = document.getElementsByClassName('add-cart')
    let arrCart = Array.from(btn_addCart);
    arrCart.forEach(attachingEvent)
}

//Hiển thị sản phẩm trong giỏ hàng
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
                tblBody.innerHTML += '<tr><td>' + ++no + '</td><td><img class="img_order" src="' + item.urlImg + '" alt=""><p hidden>' + item.id + '</p></td><td colspan="2">' + item.name + '</td><td class="price">' + item.price + '</td><td class="text-center"><a href="#" onclick="deleteCart(this)">-</a></td><td class="text-center">' + item.quantity + '</td><td class="text-center"><a href="#" onclick="addCart(this)">+</a></td></tr>'
                total += Number(item.quantity) * Number(item.price)
            })
        }
        footColumns += '<tr><td colspan="4">Tổng cộng: </td><td class="price">' + total + '</td><td colspan="3" class="deleteAll"><a href="#" onclick="deleteAllCart(this)">Xóa tất cả</a></td></tr>'
        footColumns += '<tr><td colspan="4">Thuế VAT (10%): </td><td class="price">' + Math.floor(total * 0.1) + '</td><td rowspan="2" colspan="3"><button onclick="btn_order()" class="submit-order">Đặt Hàng</button></td></tr>'
        footColumns += '<tr><td colspan="4">Phải trả: </td><td class="price">' + Math.floor(1.1 * total) + '</td></tr>'

        tblFoot.innerHTML = footColumns
        many = total * 1.1
    }
}

//Kiểm tra xem trong Array còn Item nào không
const checkItem = (arr) => {
    let temp = -1
    arr.forEach(item => {
        if (item.quantity > 0) temp = 1
    })
    return temp
}

//Giảm số lượng Item 
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

//Tăng số lượng Item 
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

//Đặt hàng
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

//Xóa tất cả Item trong giỏ hàng
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

//Ẩn hiện thông tin chi tiết khi xem tin tức
const news = () => {
    let x = 0
    const more_news = (evt) => {
        if (x === 0) {
            evt.target.parentElement.children[0].children[0].style.display = "inline"
            evt.target.innerText = "Ẩn"
            x = 1
        } else {
            evt.target.parentElement.children[0].children[0].style.display = "none"
            evt.target.innerText = "Xem thêm"
            x = 0
        }
    }
    const attachingEvent = evt => evt.addEventListener('click', more_news)
    const linkMore = document.getElementsByClassName('link--more')
    let arrMore = Array.from(linkMore);
    arrMore.forEach(attachingEvent)
}

let mobile = document.getElementById('mobile')
let password = document.getElementById('password')
let IscheckMoble = IscheckPass = -1

//Biểu thức chính quy kiểm tra sô điện thoại
const validateMobile = (number) => {
    let vnf_regex = /((0)+([0-9]{9})\b)/g;
    return vnf_regex.test(number)
}

//Kiểm tra số điện thoại
const checkMoble = () => {
    if (!validateMobile(mobile.value)) {
        mobile.style.border = "3px solid red"
        IscheckMoble = -1
    } else {
        mobile.style.border = "3px solid #33cc33"
        IscheckMoble = 1
    }
}

//Kiểm tra mật khẩu
const checkPass = () => {
    if (password.value.length < 6) {
        password.style.border = "3px solid red"
        IscheckPass = -1
    } else {
        password.style.border = "3px solid #33cc33"
        IscheckPass = 1
    }
}

//Submit đăng nhập
let btn_login = () => {
    if (IscheckMoble === 1 && IscheckPass === 1) {
        alert('Đăng Nhập Thành Công')
    } else {
        alert('Số điện thoại hoặc mật khẩu không đúng')
        location.href = "dangnhap.html"
    }
}

//Ẩn hiện mật khẩu
const checkbox = () => {
    let checkbox = document.getElementById('checkbox-hidden')
    let pwd = document.getElementById('password')

    if (checkbox.checked == true) {
        pwd.type = "text"
    } else {
        pwd.type = "password"
    }
}

//slider Ítems
let lists = document.getElementsByClassName('slider-item')

const next = () => {
    document.getElementById('slider').appendChild(lists[0])
    lists[3].style.animation = 'btn-control-animation-show-next  ease-in-out 1s forwards'
    hidden()
}

const prev = () => {
    document.getElementById('slider').prepend(lists[lists.length - 1])
    lists[0].style.animation = 'btn-control-animation-show-prev ease-in-out 1s forwards'
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

//Kiểm tra họ tên
let fname = document.getElementById('fullname')
const validatename = (text) => {
    let name = /^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-V]+)((\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-V]+){1,})/g;
    return name.test(text)
}

const checkfname = () => {
    if (!validatename(fullname.value)) {
        fullname.style.border = "3px solid red"
        Ischeckname = -1
    } else {
        fullname.style.border = "3px solid #33cc33"
        Ischeckname = 1
    }
}

//Kiểm tra mật khẩu
let password1 = document.getElementById('password1')
const checkpassword1 = () => {
    if (password1.value.length < 6) {
        password1.style.border = "3px solid red"
        Ischeckpass1 = -1
    } else {
        password1.style.border = "3px solid #33cc33"
        Ischeckpass1 = 1
    }
}

//kiểm tra nhập lại mật khẩu
let password2 = document.getElementById('password2')
const checkpassword = () => {
    if (password1.value === password2.value) {
        password2.style.border = "3px solid #33cc33"
        Ischeckpass2 = 1
    }
    else {
        password2.style.border = "3px solid red"
        Ischeckpass2 = -1
    }
}

//kiểm tra email
let email = document.getElementById('email')
const validateEmail = (text) => {
    var Email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+/g
    return Email.test(text)
}

const checkemail = () => {
    if (!validateEmail(email.value)) {
        email.style.border = "3px solid red"
        Ischeckemail = -1
    }
    else {
        email.style.border = "3px solid #33cc33"
        Ischeckemail = 1
    }
}

//Submit hỗ trợ
let btn_sp = () => {
    if (Ischeckphone === 1 && Ischeckname === 1) {
        alert('Đã gửi thành công, chúng tôi sẽ phản hồi sớm nhất cho bạn!')
    } else {
        alert('Gửi thất bại. Vui lòng kiểm tra lại!')
        window.location.href = "trogiup.html"
    }
}

//Submit đăng ký
let btn_reg = () => {
    if (IscheckMoble === 1 && Ischeckpass1 === 1 && Ischeckpass2 === 1) {
        alert('Đăng ký tài khoản thành công!')
        window.location.href = "trangchu.html"
    } else {
        alert('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!')
        window.location.href = "dangky.html"
    }
}
