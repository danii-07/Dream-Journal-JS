// --- Existing Renderer.js code ---
const dreamDescriptionInput = document.getElementById('dreamDescription');
const dreamEmotionInput = document.getElementById('dreamEmotion');
const dreamKeywordsInput = document.getElementById('dreamKeywords');
const saveDreamBtn = document.getElementById('saveDreamBtn');
const analyzeDreamBtn = document.getElementById('analyzeDreamBtn'); // For the form button
const aiAnalysisResultDiv = document.getElementById('aiAnalysisResult');
const analysisTextSpan = document.getElementById('analysisText');
const welcomeScreen = document.getElementById('welcomeScreen');
const enterAppBtn = document.getElementById('enterAppBtn');
const appContainer = document.getElementById('appContainer'); // Get appContainer here

// --- NEW/MODIFIED Screen Elements ---
const mainRecordScreen = document.getElementById('mainRecordScreen'); // Your primary screen
const allDreamsGridScreen = document.getElementById('allDreamsGridScreen'); // Your new grid screen

// --- NEW/MODIFIED Navigation Buttons (now in header) ---
const goToViewDreamsBtn = document.getElementById('goToViewDreamsBtn');
const backToRecordBtn = document.getElementById('backToRecordBtn');

// --- Calendar Variables ---
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let allDreams = []; // All loaded dreams
let selectedDate = null; // The date selected on the calendar (still YYYY-MM-DD for consistency with dream.date)

// --- Calendar DOM Elements ---
const currentMonthYearSpan = document.getElementById('currentMonthYear');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const calendarGrid = document.getElementById('calendar-grid');

// --- Dream List Elements ---
const filteredDreamsList = document.getElementById('filteredDreamsList'); // For calendar-filtered dreams
const filteredDreamsDateSpan = document.getElementById('filteredDreamsDate'); // To show selected date
const allDreamsGrid = document.getElementById('allDreamsGrid'); // For the grid display

// --- Helper: Format Date for Calendar (YYYY-MM-DD) ---
// This function remains as is because your dream objects store 'date' in YYYY-MM-DD format
// for easy filtering by day. The full date/time formatting happens at display.
function formatDateForCalendar(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// --- Function to Render Calendar Grid ---
async function renderCalendar() {
    // Current month/year display: only show month and year, not time here
    currentMonthYearSpan.textContent = new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    calendarGrid.innerHTML = '';

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Ensure allDreams is loaded for calendar marking
    if (allDreams.length === 0 || allDreams.needsRefresh) {
        allDreams = await window.electronAPI.loadDreams();
        allDreams.needsRefresh = false; // Reset flag
    }
    // We still use YYYY-MM-DD for checking which days HAVE dreams
    const dreamDates = new Set(allDreams.map(dream => dream.date));

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        calendarGrid.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dateString = formatDateForCalendar(date); // YYYY-MM-DD format

        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;
        dayElement.dataset.date = dateString; // Store YYYY-MM-DD

        if (dreamDates.has(dateString)) {
            dayElement.classList.add('has-dreams');
        }

        // Apply 'selected' class if this day matches the selectedDate
        if (selectedDate && selectedDate === dateString) {
            dayElement.classList.add('selected');
        }

        dayElement.addEventListener('click', () => {
            const previouslySelected = document.querySelector('.calendar-day.selected');
            if (previouslySelected) {
                previouslySelected.classList.remove('selected');
            }
            dayElement.classList.add('selected');
            selectedDate = dateString; // Update selectedDate on click (still YYYY-MM-DD)
            displayDreamsForSelectedDay(selectedDate); // Display dreams only for this day
        });
        calendarGrid.appendChild(dayElement);
    }

    displayDreamsForSelectedDay(selectedDate);
}

// --- Function to Display Dreams for Selected Day (Calendar Sidebar) ---
function displayDreamsForSelectedDay(dateToFilter) {
    filteredDreamsList.innerHTML = ''; // Clear the list every time

    if (dateToFilter) {
        const dreamsOnDay = allDreams.filter(dream => dream.date === dateToFilter);

        // MODIFIED: Format the displayed date using toLocaleDateString for the span
        const displayDate = new Date(dateToFilter + 'T00:00:00'); // Create a Date object for formatting, assumes midnight
        filteredDreamsDateSpan.textContent = displayDate.toLocaleDateString('en-US', {
            weekday: 'long', // "Monday"
            year: 'numeric',
            month: 'long',   // "July"
            day: 'numeric'   // "3"
        });


        if (dreamsOnDay.length === 0) {
            const p = document.createElement('p');
            p.textContent = `No dreams recorded for ${displayDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`;
            filteredDreamsList.appendChild(p);
        } else {
            // Sort dreams by ID (which is timestamp), so most recent appears first for the selected day
            dreamsOnDay.sort((a, b) => b.id - a.id);
            dreamsOnDay.forEach(dream => {
                const dreamItem = createDreamItem(dream); // Re-use helper to create HTML
                filteredDreamsList.appendChild(dreamItem);
            });
        }
    } else {
        // If no date is selected, display the empty message
        filteredDreamsDateSpan.textContent = "Selected Day"; // Reset display text
        const p = document.createElement('p');
        p.textContent = 'Click a day on the calendar to see dreams for that day.';
        filteredDreamsList.appendChild(p);
    }
}

// --- Function to Display ALL Dreams in Grid ---
async function displayAllDreamsInGrid() {
    allDreamsGrid.innerHTML = ''; // Clear the grid

    // Ensure allDreams is loaded for grid display
    if (allDreams.length === 0 || allDreams.needsRefresh) {
        allDreams = await window.electronAPI.loadDreams();
        allDreams.needsRefresh = false;
    }

    if (allDreams.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'No dreams saved yet. Record some dreams!';
        allDreamsGrid.appendChild(p);
    } else {
        // Sort by most recent for the "All Dreams" view
        allDreams.sort((a, b) => b.id - a.id);
        allDreams.forEach(dream => {
            const dreamItem = createDreamItem(dream); // Re-use helper
            allDreamsGrid.appendChild(dreamItem);
        });
    }
}

// --- Helper to Create a Dream Item HTML Element (re-usable for both lists/grids) ---
function createDreamItem(dream) {
    const dreamItem = document.createElement('div');
    dreamItem.className = 'dream-item';

    // MODIFIED: Format the date in the dream item heading using toLocaleString
    const dreamDate = new Date(dream.id); // Use dream.id as it's a timestamp
    const formattedDateTime = dreamDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // e.g., "July 3, 2025, 11:36 AM"
    });

    dreamItem.innerHTML = `
        <h3>${formattedDateTime}</h3>
        <p><strong>Emotion:</strong> ${dream.emotion || 'N/A'}</p>
        <p><strong>Keywords:</strong> ${dream.keywords ? dream.keywords.join(', ') : 'N/A'}</p>
        <details>
            <summary>Read Full Dream</summary>
            <p><strong>Description:</strong> ${dream.description}</p>
        </details>
        <button class="analyze-btn"
                data-description="${escapeHtml(dream.description)}"
                data-emotion="${escapeHtml(dream.emotion || '')}"
                data-keywords="${escapeHtml(dream.keywords ? dream.keywords.join(', ') : '')}"
        >Analyze Dream</button>
        <p class="analysis-result"></p>`; // Placeholder for analysis result for this specific dream item
    return dreamItem;
}

// --- Helper to escape HTML for data attributes ---
function escapeHtml(text) {
    if (typeof text !== 'string') {
        text = String(text);
    }
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// --- Event Delegation for Analyze Dream Buttons (Both lists/grids) ---
document.body.addEventListener('click', async (event) => {
    const targetButton = event.target.closest('.analyze-btn');

    if (targetButton) {
        const dreamDescription = targetButton.dataset.description;
        const dreamEmotion = targetButton.dataset.emotion;
        const dreamKeywords = targetButton.dataset.keywords.split(',').map(k => k.trim()).filter(k => k);

        const analysisResultParagraph = targetButton.nextElementSibling; // Get the <p class="analysis-result"></p> next to the button

        if (dreamDescription) {
            analysisResultParagraph.textContent = "Simulating analysis...";
            analysisResultParagraph.style.display = 'block';

            const dreamContext = { description: dreamDescription, emotion: dreamEmotion, keywords: dreamKeywords };
            const analysis = await window.electronAPI.analyzeDream(dreamContext);
            analysisResultParagraph.textContent = analysis;
        } else {
            analysisResultParagraph.textContent = 'No description to analyze.';
            analysisResultParagraph.style.display = 'block';
        }
    }
});

// --- Screen Switching Logic ---
function showScreen(screenToShow) {
    // Hide all main content screens
    mainRecordScreen.classList.add('hidden');
    allDreamsGridScreen.classList.add('hidden');

    // Hide both navigation buttons initially
    goToViewDreamsBtn.classList.add('hidden');
    backToRecordBtn.classList.add('hidden');

    // Show the desired screen
    screenToShow.classList.remove('hidden');

    // Manage navigation button visibility based on the active screen
    if (screenToShow === mainRecordScreen) {
        goToViewDreamsBtn.classList.remove('hidden'); // Show "View All Dreams"
        backToRecordBtn.classList.add('hidden'); // Hide "Back to Record Dream"
        selectedDate = null; // Clear selected date on return
        renderCalendar(); // Re-render calendar with default view (empty filtered list)
    } else if (screenToShow === allDreamsGridScreen) {
        goToViewDreamsBtn.classList.add('hidden'); // Hide "View All Dreams"
        backToRecordBtn.classList.remove('hidden'); // Show "Back to Record Dream"
        // Load all dreams and display them in the grid
        allDreams.needsRefresh = true; // Set flag to force reload of latest data
        displayAllDreamsInGrid(); // This will trigger the load
    }
}

// --- Event Listeners ---
saveDreamBtn.addEventListener('click', async () => {
    const description = dreamDescriptionInput.value.trim();
    const emotion = dreamEmotionInput.value.trim();
    const keywordsRaw = dreamKeywordsInput.value.trim();
    const keywords = keywordsRaw ? keywordsRaw.split(',').map(k => k.trim()).filter(k => k) : [];

    if (description) {
        const now = new Date(); // Get current date and time for the ID
        const dreamData = {
            id: now.getTime(), // Use timestamp for unique ID and sorting
            date: formatDateForCalendar(now), // Still YYYY-MM-DD for calendar filtering
            description: description,
            emotion: emotion,
            keywords: keywords,
            analysis: ''
        };
        const result = await window.electronAPI.saveDream(dreamData);
        if (result.success) {
            dreamDescriptionInput.value = '';
            dreamEmotionInput.value = '';
            dreamKeywordsInput.value = '';
            alert('Dream saved successfully!');
            allDreams.needsRefresh = true; // Mark allDreams for refresh
            selectedDate = dreamData.date; // Automatically select the day the dream was saved
            showScreen(mainRecordScreen); // Stay on the main screen, which will trigger calendar refresh
        } else {
            alert('Error saving dream: ' + result.message);
        }
    } else {
        alert('Please enter a dream description!');
    }
});

analyzeDreamBtn.addEventListener('click', async () => { // This is the button for the current input form
    const description = dreamDescriptionInput.value.trim();
    const emotion = dreamEmotionInput.value.trim();
    const keywordsRaw = dreamKeywordsInput.value.trim();
    const keywords = keywordsRaw ? keywordsRaw.split(',').map(k => k.trim()).filter(k => k) : [];

    if (description) {
        analysisTextSpan.textContent = "Simulating analysis...";
        aiAnalysisResultDiv.style.display = 'block';

        const dreamContext = { description, emotion, keywords };
        const analysis = await window.electronAPI.analyzeDream(dreamContext);
        analysisTextSpan.textContent = analysis;
    } else {
        alert('Please enter a dream description to analyze!');
        aiAnalysisResultDiv.style.display = 'none';
    }
});

// --- Calendar Navigation Event Listeners ---
prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    selectedDate = null; // Clear selected date when navigating months
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    selectedDate = null; // Clear selected date when navigating months
    renderCalendar();
});

// --- NEW Navigation Button Event Listeners ---
goToViewDreamsBtn.addEventListener('click', () => {
    showScreen(allDreamsGridScreen);
});

backToRecordBtn.addEventListener('click', () => {
    showScreen(mainRecordScreen);
});

// --- Initial Application Load ---
document.addEventListener('DOMContentLoaded', () => {
    enterAppBtn.addEventListener('click', async () => {
        welcomeScreen.classList.add('hidden');
        appContainer.classList.remove('hidden');
        appContainer.classList.add('visible');

        // Initially show the "Record Dream" screen (main screen)
        showScreen(mainRecordScreen);
    });
});