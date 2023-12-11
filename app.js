$(document).ready(function() {
    
    const apiUrl = 'https://restcountries.com/v3.1/all';

    // Fetch data from the API
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            displayCountryInfo(data);
        },
        error: function(error) {
            console.error('Error fetching data:', error);
        }
    });

    function displayCountryInfo(data) {
        const countryInfoContainer = $('#country-info');
        data.slice(0, 5).forEach(country => {
            const countryDiv = $('<div>').addClass('country');
            countryDiv.append(`<h2>${country.name.common}</h2>`);
            countryDiv.append(`<p>Capital: ${country.capital}</p>`);
            countryDiv.append(`<p>Population: ${country.population}</p>`);
            countryDiv.append(`<p>Region: ${country.region}</p>`);
            countryInfoContainer.append(countryDiv);
        });
    }
});



function visualizeData(data) {
    const labels = data.slice(0, 5).map(country => country.name.common);
    const populations = data.slice(0, 5).map(country => country.population);

    const ctx = document.getElementById('population-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Population',
                data: populations,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


visualizeData(data);

