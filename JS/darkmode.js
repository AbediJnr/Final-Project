// ALGORTITHM
// onclick of the icon(moon),change the page to darkmode
// select the body
// select the icon
// add darkmode function to the button

// DARKMODE
// Dark mode toggle function
const toggleDarkMode = () => {
    document.body.classList.toggle('darkmode');
    const isDarkMode = document.body.classList.contains('darkmode');
    localStorage.setItem('darkMode', isDarkMode);
};

// Check and apply dark mode preference on page load
window.onload = () => {
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'true') {
        document.body.classList.add('darkmode');
    }
};

// Add event listener to the theme toggle button
document.getElementById('themeToggler').addEventListener('click', toggleDarkMode);

