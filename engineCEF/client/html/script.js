let errorSpan = document.getElementById('errorSpan')

function upgradeEngine() {
    let upgradeLevel = document.getElementById("upgradeLevel").value
        setMessageFor('')
        if(upgradeLevel < 0 || upgradeLevel > 4) {
            return setMessageFor('Такого двигателя не существует.')
             
        }
        if(isNaN(upgradeLevel)) {
            return setMessageFor('Укажите число в диапозоне от 0 до 4')
            
        }
        return alt.emit('upgradeEngine:Wait', JSON.stringify({ upgradeLevel }))
}

function setMessageFor(message) {
    errorSpan.innerHTML = message
	errorSpan.style.color = '#ff0000'
}
