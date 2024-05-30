document.addEventListener("DOMContentLoaded", ()=> {
   
  const searchInput = document.querySelector('.search-container input');
  const themeChanger = document.querySelector('.theme-changer');
  const countriesContainer = document.querySelector('.countries-container');
  const filterByRegion = document.querySelector('.filter-by-region');
  const countryClick = document.querySelector('.country-click');

  let allCountriesData;
  
  fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) => {
      renderCountries(data);
      allCountriesData = data;
    });
  
  filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
      .then((res) => res.json())
      .then(renderCountries)
  });
  
  
  function renderCountries(data) {
    countriesContainer.innerHTML = '';
    data.forEach((country) => {
      const countryCard = document.createElement('a');
      countryCard.classList.add('country-card');
      countryCard.href = `/detail.html?name=${country.name.common}`;
      countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common} flag" />
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString(
                  'EN'
                )}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital?.[0]}</p>
                
            </div>
            <div> </div>
    `;
      countriesContainer.append(countryCard);
    });
  }
  
  
  searchInput.addEventListener('input',  (e) => {

    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountries(filteredCountries);
  });
  
  themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    
  })
  
  
  countriesContainer.addEventListener('click', (e) => {
      console.log(e);
  
  });
  });