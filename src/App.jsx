import { useState, createContext } from 'react'
import './reset.css'
import './App.css'
import Current from './pages/current'
import Detail from './pages/detail'

export const ThemeContext = createContext(null);

function App() {

  const [theme, setTheme] = useState("light");
  const [check, setCheck] = useState(true)
  // const toggleTheme = () => {
  //   setTheme((curr) => (curr === "light" ? "dark" : "light"));
  // };
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      setCheck(false);
    } else {
      setTheme('light');
      setCheck(true);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Current check={check} theme={theme} toggleTheme={toggleTheme}/>
      </div>
    </ThemeContext.Provider>
  );
}

export default App
