const myCarousel = document.querySelector('.myCarousel')
const carousel = new bootstrap.Carousel(myCarousel)
const productInput = document.querySelector('.productSearch')
ScrollReveal().reveal('.productSearch')
ScrollReveal().reveal('.container-fluid')
let productData=[];
const auto1 = async(input)=>{
	const data1 = await axios.post("/products/item/api", {
		search:input
	});
	productData = []
let data = data1
for(let i=0;i<data.data.length;i++){
productData.push(data.data[i].Name)}
return productData
}
productInput.addEventListener('input',async()=>{
auto1(productInput.value)
})
const autoCompleteJS1 = new autoComplete({
 data: {
        src: auto1(productInput.value),
	},
  cache:true,
	placeHolder: "Search for Products!",
	resultsList: {
		element: (list, data) => {

			const info = document.createElement("p");
			list.prepend(info);
		},
		noResults: true,
		maxResults: 15,
		tabSelect: true
	},
    wrapper: false,
	resultItem: {
		element: (item, data) => {
			// Modify Results Item Style
			item.style = "display: flex; justify-content: space-between;";
			// Modify Results Item Content
			item.innerHTML = `
      <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
        ${data.match}
      </span>`;
		},
		highlight: true
	},
	events: {
		input: {
			focus: () => {
				if (autoCompleteJS1.input.value.length) autoCompleteJS1.start();
			}
		}
	}
});

autoCompleteJS1.input.addEventListener("selection", function (event) {
	const feedback = event.detail;
	autoCompleteJS1.input.blur();
	console.log('hi')
	const selection = feedback.selection.value;
	// Render selected choice to selection div
	document.querySelector(".selection").innerHTML = selection;
	// Replace Input value with the selected value
	autoCompleteJS1.input.value = selection;
});
const action = (action) => {
	const title = document.querySelector("h1");

	const selection = document.querySelector(".selection");
	const footer = document.querySelector(".footer");
	if (action === "dim") {
		title.style.opacity = 1;

		selection.style.opacity = 1;
	} else {

		title.style.opacity = 0.3;

		selection.style.opacity = 0.1;
	}
};

["focus", "blur"].forEach((eventType) => {
	autoCompleteJS1.input.addEventListener(eventType, () => {
        if (eventType === "blur") {
			action("dim");
		} else if (eventType === "focus") {
			action("light");
		}
	});
});
const submit = document.querySelector('.sub')
const join = document.querySelector('.join1')
const email = document.querySelector('#started')
email.addEventListener('click',()=>{
	submit.style.transform = 'translate(180px)'
	submit.style.margin = '10px'

})
submit.addEventListener('click',()=>{
	window.location.href = `http://localhost:3000/user/register?username=${email.value}`
})