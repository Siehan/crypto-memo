import { useState } from "react";
import List from "./components/List";
import { CurrenciesContextProvider } from "./context/CurrenciesContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "bg-dark text-light" : ""}>
      <button onClick={() => setDarkMode(!darkMode)}>change</button>
      <CurrenciesContextProvider>
        <header>
          <h1>
            Crypto Currencies with{" "}
            <a className="text-reset" href="https://nomics.com/docs/">
              nomics API
            </a>
          </h1>
        </header>
        <List />
      </CurrenciesContextProvider>
    </div>
  );
}

export default App;
