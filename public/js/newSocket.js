try{
    const socket = io('http://localhost:3000');
    const submitBtn = document.querySelector('.submitBtn')
    const newForm = document.querySelector('#submission')
    submitBtn.addEventListener('click',(e)=>{
        e.preventDefault()
        socket.emit('notification','hi')
        newForm.submit()
    })
}catch(e){
console.log(e)
}