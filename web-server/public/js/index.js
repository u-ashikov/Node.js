var formElement = document.querySelector('#weather-form');

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    var address = document.querySelector('#weather-form #address').value;
    var errorElement = document.querySelector('#error');
    var locationElement = document.querySelector('#location');
    var foreastElement = document.querySelector('#forecast');

    fetch('http://localhost:3000/weather?address=' + address)
        .then(response => {
            response.json()
                .then(data => {
                    if (data.error) {
                        errorElement.className = 'my-3 ml-3 text-danger d-block';
                        locationElement.className = 'd-none';
                        foreastElement.className = 'd-none';

                        errorElement.textContent = data.error;
                    } else {
                        errorElement.className = 'd-none';
                        locationElement.className = 'd-block my-3 ml-3';
                        foreastElement.className = 'd-block my-3 ml-3';
                        
                        locationElement.textContent = 'Location: ' + data.address;
                        foreastElement.textContent = 'Forecast: ' + data.forecast;
                    }
                });
        });
});