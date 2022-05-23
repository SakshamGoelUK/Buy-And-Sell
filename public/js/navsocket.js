try{

    const socket = io('http://localhost:3000');
    console.log('test')
    const notificationBadge = document.querySelector('#badge')
    socket.emit('isActive')
    socket.on('increase1',(data)=>{
        console.log('increase1')
        console.log('hi')
    })
    socket.on('increase',(data)=>{
        console.log(data.seller)
        console.log(navUser.email)
if(navUser.email === data.seller){
    console.log('hi1')
    if(notificationBadge.innerText != ''){
console.log('hi2')
        notificationBadge.innerText = parseInt(notificationBadge.innerText) +1
        notificationBadge.getElementsByClassName.display = 'block'
    }else{
        notificationBadge.innerText = 1
        notificationBadge.getElementsByClassName.display = 'block'

    }
}})

    window.addEventListener('beforeunload',()=>{
        socket.emit('disconnect')
    }

    )
}catch(e){console.log(e)}
