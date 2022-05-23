

console.log(performance.getEntriesByType("navigation")[0].type);
if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
  location.reload(true);
}
const wordCount = document.querySelector(".length");
const area = document.querySelector("textarea");
const characterCount = () => {
  wordCount.innerText = area.value.length;
};
let data2= {

};
const countryInp = document.querySelector(".country");
document.addEventListener("DOMContentLoaded", function () {
  instances = M.Autocomplete.init(countryInp, {
    limit: 5,
    data:data2,
  });
});
countryInp.addEventListener('keyup',async()=>{
  try{
    if(countryInp.value.length >= 1){
    const data1 = await axios.get(`https://app.geocodeapi.io/api/v1/autocomplete?apikey=d0687a30-aec1-11ec-b05b-875b85ea61d2&text=${countryInp.value}&size=5`)
    console.log(data1)
    data1.data.features.map((item)=>{
   data2[`${item.properties.locality}`] = null
   instances.updateData(data2)
  })}}catch(e){

  }
})
let ulOption, liCountry;
area.addEventListener("keyup", characterCount);

