let mobile = document.getElementById('mobile')
let password = document.getElementById('password')

let IscheckMoble = IscheckPass = -1

const validateMobile = (number) => {
    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return vnf_regex.test(number)
}

const checkMoble = () => {
    if (!validateMobile(mobile.value)) {
        mobile.style.border = "1px solid red"
        IscheckMoble = -1
    } else {
        mobile.style.border = "1px solid #33cc33"
        IscheckMoble = 1
    }
}

const checkPass = () => {
    if (password.value.length < 6) {
        password.style.border = "1px solid red"
        IscheckPass = -1
    } else {
        password.style.border = "1px solid #33cc33"
        IscheckPass = 1
    }
}

let btn_login = () => {
    if (IscheckMoble === 1 && IscheckPass === 1) {
        alert('Đăng Nhập Thành Công')
    } else {
        alert('Số điện thoại hoặc mật khẩu không đúng')
        location.href = "dangnhap.html"
    }
}


const checkbox = () => {
    let checkbox = document.getElementById('checkbox-hidden')
    let pwd = document.getElementById('password')

    if (checkbox.checked == true) {
        pwd.type = "text"
    } else {
        pwd.type = "password"
    }
}