let mobile = document.getElementById('mobile')
let checkMb = document.getElementById('checkMb')

let password = document.getElementById('password')
let checkPs = document.getElementById('checkPs')

let IscheckMoble = IscheckPass = -1

const validateMobile = (number) => {
    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return vnf_regex.test(number)
}

const checkMoble = () => {
    if (!validateMobile(mobile.value)) {
        checkMb.innerHTML = 'Invalid <i class="fa-solid fa-x invalid"></i></i>'
        checkMb.style.color = 'red'
        IscheckMoble = -1
    } else {
        checkMb.innerHTML = 'Valid <i class="fa-solid fa-check valid"></i>'
        checkMb.style.color = '#33cc33'
        IscheckMoble = 1
    }
}

const checkPass = () => {
    if (password.value.length < 6) {
        checkPs.innerHTML = 'Invalid <i class="fa-solid fa-x invalid"></i></i>'
        checkPs.style.color = 'red'
        IscheckPass = -1
    } else {
        checkPs.innerHTML = 'Valid <i class="fa-solid fa-check valid"></i>'
        checkPs.style.color = '#33cc33'
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
