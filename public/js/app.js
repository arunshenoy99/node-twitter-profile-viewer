const userForm = document.querySelector('form')
const userInput = document.querySelector('input')
const resultDiv = document.querySelector('#result-div')

userForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const username = userInput.value
    fetch('http://localhost:3000/profile?username='+username)
    .then((response) => {
        response.text()
        .then((data) => {
            document.write(data)
        })
    })
})