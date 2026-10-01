/// Setup a variables to hold dynamic elements
const searchForm = document.querySelector('#searchForm')
const mainContent = document.querySelector('#content')

// listen for form submission
searchForm.addEventListener("submit", event => {

  // By default, JavaScript sends form data to the server, thus reloading the page. However, since we have already processed the form on the client side, there is no need to reload the page. Let's therefore prevent a reload from happening:
  event.preventDefault()

  // get the contexts of the search input box.
  let searchText = document.querySelector('#searchText').value

  // let's build a URL with all the necessary query parameters (searchParams)
  // PUTTING IN MY CHOSEN API 
  let url = new URL('https://api.riftcodex.com/cards/name')
  url.searchParams.set('fuzzy', searchText)

  // log the above generated URL to the console
  console.log(url.href)

  fetch(url.href)
    .then(response => response.json())
    .then(response => {
      // log the response to help understand how it is structured.
      console.log(response)
      // Gemini helped me understand that the response will be an object with properties called "items" instead of "results" 
      displayResults(response.items)
    })
    .catch(err => console.error(err));


});


// For each search result, display some HTML
const displayResults = (results) => {
  // reset the contents of the page to remove previous results. 
  mainContent.innerHTML = '';
  if (results) {
    results.forEach(result => {
      // create a div to contain the movie.
      let div = document.createElement('div');
      div.classList.add('result');
      // If no image is provided, set a default image.
      // I'm using a conditional operator here.

      // It's like a single-line if-statement.

      // See also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
      // Gemini helped fix this line to grab the image from the media object instead of the result object.
      let imageURL = (result.media && result.media.image_url) ? result.media.image_url : 'placeholder.svg'

      // Make a simple template for the movie and add it to the page
      div.innerHTML =
        `<img src="${imageURL}">
        <p class="name">${result.name}</p>`
      mainContent.appendChild(div)
    })
  }
  else {
    // in case there are no results, show the user some helpful feedback.
    mainContent.innerHTML = 'No Results Found';
  }
}


let navigation = document.createElement('nav')
fetch('../examples.json')
  .then(data => data.json())
  .then(json => {
    let template = json.map(example => `<a href="..${example.url}">${example.name}</a>`).join('')
    navigation.innerHTML = `<a href="..">Home</a> ${template}`
  })
document.querySelector('footer').appendChild(navigation)