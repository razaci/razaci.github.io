// Get the form and input elements
const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results-container');

// Function to fetch data from API and display results
async function fetchData(searchTerm) {
  const url = `https://api.wehaul.com/loads?min_value=${searchTerm}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    // Clear the previous results
    resultsContainer.innerHTML = '';
    
    // Display the results
    data.forEach(load => {
      const loadCard = `
        <div class="load-card">
          <h2>${load.title}</h2>
          <p>Origin: ${load.origin}</p>
          <p>Destination: ${load.destination}</p>
          <p>Price: $${load.price}</p>
          <a href="${load.link}" target="_blank">More Info</a>
        </div>
      `;
      resultsContainer.insertAdjacentHTML('beforeend', loadCard);
    });
  } catch (error) {
    console.error(error);
  }
}

// Event listener for the form submission
form.addEventListener('submit', event => {
  event.preventDefault();
  const searchTerm = searchInput.value;
  fetchData(searchTerm);
});
