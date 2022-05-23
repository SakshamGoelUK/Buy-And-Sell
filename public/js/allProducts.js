if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
  location.reload(true);
}
const ratingFilter = document.querySelectorAll('.ratingFilter')
for(let i=0;i<ratingFilter.length;i++){
  ratingFilter[i].addEventListener('click',()=>{
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set('rating', ratingFilter[i].name);

    window.location.search = urlParams;
  })
}
let likeForm;
let unlikeForm;
let cards;
let likes;
const priceFilter = document.querySelector('.priceFilter')
priceFilter.addEventListener('change',()=>{
  console.log(priceFilter.value)
  const urlParams = new URLSearchParams(window.location.search);

urlParams.set('price', priceFilter.value);

window.location.search = urlParams;

})
try {
  cards = document.querySelectorAll(".cards");
  likes = document.querySelectorAll(".likesCount");
  likeForm = document.querySelectorAll(".heartBtn");
  unlikeForm = document.querySelectorAll(".unlike");
  for (let i = 0; i < likeForm.length; i++) {
    likeForm[i].addEventListener("click", async () => {
      console.log("like");
      likeForm[i].style = "";
      unlikeForm[i].style = "";
      likes[i].innerText = parseInt(likes[i].innerText) + 1;
      likeForm[i].style.display = "none";
      unlikeForm[i].style.display = "inline";
      const data = await axios.post("/products/like", {
        id: cards[i].id,
      });
    });
    unlikeForm[i].addEventListener("click", async () => {
      likeForm[i].style = "";
      likes[i].innerText = parseInt(likes[i].innerText) - 1;
      unlikeForm[i].style = "";
      unlikeForm[i].style.display = "none";
      likeForm[i].style.display = "inline";
      const data = await axios.post("/products/unlike", {
        id: cards[i].id,
      });
    });
  }
} catch (e) {
  console.log(e);
}
