let updateCart = []
if (localStorage.getItem('cartItems')) {
    updateCart = JSON.parse(localStorage.getItem('cartItems'), [])
}

const ItemPk = (id) => {
    getItem = document.getElementById(id)

    if (typeof Storage !== undefined) {
        let newItem = {
            id: id,
            name: getItem.children[1].textContent,
            price: getItem.children[2].childNodes[3].children[0].textContent.slice(0, -2).split('.').join(''),
            quantity: 1
        }
        if (JSON.parse(localStorage.getItem('cartItems')) === null) {
            updateCart.push(newItem)
            localStorage.setItem('cartItems', JSON.stringify(updateCart))
            // window.location.reload()
        } else {
            let find;
            updateCart.findIndex((element, index) => {
                if (element.id == id) find = index
            })
            if (find !== undefined) {
                if (updateCart[find].quantity >= 10) {
                    alert('Dat gioi han mua !!!')
                }
                else {
                    updateCart[find].quantity++
                }
            } else {
                updateCart.push(newItem)
            }
            localStorage.setItem('cartItems', JSON.stringify(updateCart))
        }
        // window.location.reload()
    } else {
        alert('Local storage is not working on your browser')
    }
}
