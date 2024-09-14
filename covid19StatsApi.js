// Fetch global COVID-19 statistics
fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
        // Data for the chart
        const labels = ['Cases', 'Deaths', 'Recovered'];
        const chartData = [data.cases, data.deaths, data.recovered];

        // Create the chart
        const ctx = document.getElementById('covidChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',  // You can also use 'line', 'pie', etc.
            data: {
                labels: labels,  // The labels for the X-axis
                datasets: [{
                    label: 'Global COVID-19 Statistics',
                    data: chartData,  // The data for each label
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
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
    })
    .catch(error => console.error('Error fetching COVID-19 data:', error));
