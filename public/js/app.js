// console.log('Client Side  Javascript File is Loaded ! ')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault();

    const location = search.value

    messageOne.textContent ='Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) => { //http://localhost:3000/weather?address='+location  // for local host only so we change it to be for all local and heroku 
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            }
        })
   })
})



// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//      response.json().then((data) => {
//          console.log(data)
//      })
// })