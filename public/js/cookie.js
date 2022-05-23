try{

    const cookieBtn = document.querySelector('.cookieBtn')
    const cookie = document.querySelector('.cookie')
    cookieBtn.addEventListener('click',async()=>{
        console.log('hi')
        cookie.style.display = 'none'
        try{
            const data = await axios.post("/products/cookiesAccept",  {
                withCredentials: true,
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
            }});
        }catch(e){
            console.log(e)
        }
    })
}catch(e){}