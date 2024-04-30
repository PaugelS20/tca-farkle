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
import { IonButton, IonIcon } from '@ionic/react';
import { invertModeOutline } from 'ionicons/icons';
import "../Master.css";

export const DarkMode = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const toggleTheme = () => theme == 'light' ? setTheme('dark') : setTheme('light'); 
    

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
        }, [theme]);

    return (
        <div className={`App ${theme}`}>
            <IonButton size="small" color="medium" 
                className={`${theme}`} 
                onClick={toggleTheme}
            >
            <IonIcon icon={invertModeOutline} ></IonIcon>
                Toggle Dark Mode
            </IonButton>
        </div>
    );
}