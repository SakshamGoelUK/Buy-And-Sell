const deleteBtnAll = document.querySelectorAll('#upload_widget')
const confirmBtn = document.querySelector('.confirm')
const deleteFormsAll = document.querySelectorAll('.deleteForm')
const cancel = document.querySelector('.cancel')
const modal = document.querySelector('.modal')

for(let i=0;i<deleteBtnAll.length;i++){
    deleteBtnAll[i].addEventListener('click',(e)=>{
        e.preventDefault()
        confirmBtn.setAttribute('id',deleteBtnAll[i].classList.value)
        removeEventListener('click',confirmBtn)
        confirmBtn.addEventListener('click',()=>{
        document.getElementById(confirmBtn.id).submit()
            })
    })
}

