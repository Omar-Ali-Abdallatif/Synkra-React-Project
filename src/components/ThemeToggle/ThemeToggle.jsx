
import './ThemeToggle.css'
import Sun from './Sun.svg?react';
import Moon from './Moon.svg?react';
import { useTheme } from '../../Context/ThemeContext';


function ThemeToggle() {
    const { isDark, setIsDark } = useTheme();

    const ToggleChange = (e) => {
        setIsDark(e.target.checked);
    };


    return (
        <div className="dark_mode">

            <input
                className="dark_mode_input"
                type="checkbox"
                id="darkmode-toggle"
                onChange={ToggleChange}
                checked={isDark}
            />

            <label
                className="dark_mode_label"
                htmlFor="darkmode-toggle"
            >
               <Sun />
               <Moon />
            </label>

        </div>
    );
}

export default ThemeToggle;