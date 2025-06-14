// Mood Tracker Functionality
document.addEventListener('DOMContentLoaded', function() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    const moodNote = document.getElementById('mood-note');
    const saveMoodBtn = document.getElementById('save-mood');
    const moodChart = document.getElementById('mood-chart');
    
    let selectedMood = null;
    let moodData = JSON.parse(localStorage.getItem('moodData')) || [];

    // Initialize chart
    const ctx = moodChart.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Mood Trend',
                data: [],
                borderColor: '#4a90e2',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });

    // Update chart
    function updateChart() {
        const labels = moodData.map(entry => entry.date);
        const data = moodData.map(entry => entry.mood);
        
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
    }

    // Select mood
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            selectedMood = this.dataset.mood;
        });
    });

    // Save mood record
    saveMoodBtn.addEventListener('click', function() {
        if (!selectedMood) {
            alert('Please select your mood');
            return;
        }

        const moodValue = {
            'very-happy': 5,
            'happy': 4,
            'neutral': 3,
            'sad': 2,
            'very-sad': 1
        }[selectedMood];

        const newEntry = {
            date: new Date().toLocaleDateString(),
            mood: moodValue,
            note: moodNote.value
        };

        moodData.push(newEntry);
        localStorage.setItem('moodData', JSON.stringify(moodData));
        
        updateChart();
        
        // Reset form
        moodButtons.forEach(btn => btn.classList.remove('selected'));
        moodNote.value = '';
        selectedMood = null;
        
        alert('Mood record saved!');
    });

    // Update chart on initialization
    updateChart();
}); 