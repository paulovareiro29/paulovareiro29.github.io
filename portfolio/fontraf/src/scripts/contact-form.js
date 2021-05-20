

document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault()

    let name = e.target.name.value
    let email = e.target.email.value
    let phone = e.target.phone.value
    let message = e.target.message.value

    let bodyMessage = `Name%0D%0A${name}%0D%0A%0D%0AE-mail%0D%0A${email}%0D%0A%0D%0APhone%0D%0A${phone}%0D%0A%0D%0AMessage%0D%0A${message}`;

    window.open(`mailto:paulovareiro29@gmail.com?subject=Message send by ${name}&body=${bodyMessage}`) 
})