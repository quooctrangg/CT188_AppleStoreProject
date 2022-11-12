let mobile = document.getElementById('mobile')
let check = document.getElementById('check')

const validateMobile = (number) => {
    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return vnf_regex.test(number)
}

const checkMoble = () => {
    if (!validateMobile(mobile.value)) {
        check.innerHTML = 'Invalid <i class="fa-solid fa-x invalid"></i></i>'
        check.style.color = 'red'
    } else {
        check.innerHTML = 'Valid <i class="fa-solid fa-check valid"></i>'
        check.style.color = '#33cc33'
    }
}
