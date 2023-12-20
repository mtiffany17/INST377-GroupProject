document.addEventListener('DOMContentLoaded', function () {
    fetchWeatherData();
});

function fetchWeatherData() {
    fetch('https://api.open-meteo.com/v1/gfs?latitude=38.9807&longitude=-76.9369&daily=temperature_2m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto')
        .then(response => response.json())
        .then(data => {
            updateWeatherChart(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function updateWeatherChart(data) {
    const maxTemperatures = data.daily.temperature_2m_max;
    const currentDayOfWeek = new Date().getDay();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const labels = daysOfWeek.slice(currentDayOfWeek).concat(daysOfWeek.slice(0, currentDayOfWeek));

    var ctx = document.getElementById('weatherChart').getContext('2d');

    var weatherChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Max Daily Temperatures',
                data: maxTemperatures,
                backgroundColor: '#ff6384',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Day of the Week'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Max Temperature (°F)'
                    },
                    max: 70,
                    stepSize: 10
                }
            }
        }
    });
}
