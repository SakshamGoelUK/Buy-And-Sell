

const navBtn = document.querySelector('.navSearch');
const navInput = document.querySelector('.navSearch');

let productData = [];
const auto1 = async (input) => {
  const data1 = await axios.post('/products/item/api', {
    search: input,
  });
  productData = [];
  let data = data1;
  for (let i = 0; i < data.data.length; i++) {
    productData.push(data.data[i].Name);
  }
  return productData;
};
const autoCompleteJS = new autoComplete({
  data: {
    src: auto1(navInput.value),
  },
  cache: true,
  placeHolder: 'Search for Products!',
  resultsList: {
    element: (list, data) => {
      const info = document.createElement('p');
      list.prepend(info);
    },
    noResults: true,
    maxResults: 5,
    tabSelect: true,
  },
  wrapper: false,
  resultItem: {
    element: (item, data) => {
      // Modify Results Item Style
      item.style = 'display: flex; justify-content: space-between;';
      // Modify Results Item Content
      item.innerHTML = `
      <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
        ${data.match}
      </span>`;
    },
    highlight: true,
  },
  events: {
    input: {
      focus: () => {
        if (autoCompleteJS.input.value.length) autoCompleteJS.start();
      },
    },
  },
});
// If the selection is not a valid option, then don't do anything.
autoCompleteJS.input.addEventListener('selection', function (event) {
  const feedback = event.detail;
  autoCompleteJS.input.blur();
  const selection = feedback.selection.value;
  autoCompleteJS.input.value = selection;
});
const action = (action) => {
  const title = document.querySelector('h1');

  const selection = document.querySelector('.selection');
  const footer = document.querySelector('.footer');

};
// Clear the input value after the user has left the input area.
['focus', 'blur'].forEach((eventType) => {
  autoCompleteJS.input.addEventListener(eventType, () => {
    if (eventType === 'blur') {
      action('dim');
    } else if (eventType === 'focus') {
      action('light');
    }
  });
});
const prices = document.querySelectorAll('.price')
const total = document.querySelector('.totalCost')
const cart = document.querySelector('.myCart')
for(let i=0;i<prices.length;i++){
console.log(prices[i].innerHTML)
// console.log(parseFloat(prices[i].innerText) + parseFloat(total.innerText))
  total.innerHTML =(parseFloat(prices[i].innerHTML)+parseFloat(total.innerHTML)).toString()
  console.log(total.innerHTML)
}
const deleteBtns = document.querySelectorAll('.delete')
for(let i=0;i<deleteBtns.length;i++){
  deleteBtns[i].addEventListener('click',async()=>{
console.log(document.querySelector(`#cart${deleteBtns[i].dataset.deleteitem} h6`))
    console.log(parseFloat(total.innerHTML))
    total.innerHTML = (parseFloat(total.innerHTML) - parseFloat(document.querySelector(`#cart${deleteBtns[i].dataset.deleteitem} h6`).innerHTML)).toString()

    const data = await axios.post('/user/cart/deleteItem',{'product':deleteBtns[i].dataset.deleteitem})
cart.removeChild(document.querySelector(`#cart${deleteBtns[i].dataset.deleteitem}`))
  })
}
