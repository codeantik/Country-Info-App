// when window is loaded fetch all countries
window.onload = function() {
    let resultContainer = document.querySelector('.result');
    fetch(`https://restcountries.com/v3.1/all`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            let countries = data.map(country => {
                return `<div class='list-item'>
                    <p>${country.name.common}</p>
                    <img alt=${country.flags.png} src=${country.flags.png} height='50px' width='80px' />
                </div>`
            });
            countries.sort();
            resultContainer.innerHTML = countries.join('');
        });
}

// when content is loaded
document.addEventListener('DOMContentLoaded', function() {
    let searchQuery;
    // get search query
    document.querySelector('.search-input').addEventListener('change', function(e) {
        searchQuery = e.target.value;
        console.log(searchQuery);
    })

    // set the result data
    function setResult(data) {
        console.log(data);
        let country = data[0]
        let languages = country.languages && Object.values(country.languages).map(language => language).join(', ');
        console.log(languages) 
        let currencies = country.currencies && Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')
        console.log(currencies)
        let resultContainer = document.querySelector('.result');
        resultContainer.innerHTML = `
            <div class='detail-item'>
                <a href=${country.maps.googleMaps} title='Go to map'>
                    <img alt=${country.maps.googleMaps} src='./google-map-preview.png' height='100px' width='200px' />
                </a>
                <img alt=${country.flags.svg} src=${country.flags.svg} height='80px' width='150px' />
                <p>Name <span>${country.name.common}<span></p>
                <p>Capital <span>${country.capital}</span></p>
                <p>Region <span>${country.region}</span></p>
                <p>Subregion <span>${country.subregion}</span></p>
                <p>Population <span>${country.population}<span></p>
                <p>Area <span>${country.area}</span></p>
                <p>Timezones <span>${country.timezones}</span></p>
                <p>Currencies <span>${currencies}</span></p>
                <p>Languages <span>${languages}</span></p>
                <p>Latitude & Longitude <span>${country.capitalInfo.latlng[0]}, ${country.capitalInfo.latlng[1]}</span></p>
            </div>
        `
    }

    // search for the query
    document.querySelector('.search-btn').addEventListener('click', function(e) {
        e.preventDefault()
        if(!searchQuery) {
            alert('Please enter a country name');
            return;
        }
        document.querySelector('.search-input').innerText = '';
        console.log(searchQuery)
        console.log('clicked');

        fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                if(!data.length) {
                    alert('No country found');
                    return;
                }
                setResult(data);
            });
        
    })

    // search for the query from the list of countries
    document.querySelectorAll('.list-item p').forEach(item => {
        console.log(item)
        item.addEventListener('click', function(e) {
            if(e.target.innerText !== item.innerText) {
                return
            }
            console.log(item.innerText);
            fetch(`https://restcountries.com/v3.1/name/${item.innerText}`)
                .then(response => response.json())
                .then(data => {
                    if(!data.length) {
                        alert('No country found');
                        return;
                    }
                    setResult(data)
                });
                    
        })
    })
})

