// // Query for the toggle that is used to change between themes
// const toggle = document.querySelector('#themeToggle');

// // Listen for the toggle check/uncheck to toggle the dark class on the <body>
// toggle.addEventListener('ionChange', (ev) => {
//   document.body.classList.toggle('dark', ev.detail.checked);
// });

// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// // Listen for changes to the prefers-color-scheme media query
// prefersDark.addListener((e) => checkToggle(e.matches));

// // Called when the app loads
// const loadApp = () => {
//   checkToggle(prefersDark.matches);
// }

// // Called by the media query to check/uncheck the toggle
// const checkToggle = (shouldCheck) => {
//   toggle.checked = shouldCheck;
// }

import { useState, useEffect } from 'react';

export const DarkMode = () => {
    const [theme, setTheme] = useState('light');
    
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);


    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };


    return (
        <div className={`App ${theme}`}>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <h1>Hello, world!</h1>
        </div>
    );
}