// src/components/List.js
import { matchSorter } from "match-sorter";
// import { useCurrencies } from "../hooks/useCurrencies"; // useCurrencies est un custom hook avec useEffect et useReducer
import Currency from "./Currency";
import { useState, useCallback, useMemo, memo } from "react";
import { useCurrenciesContext } from "../context/CurrenciesContext";

const List = () => {
  const { loading, error, currencies } = useCurrenciesContext();
  const [filter, setFilter] = useState("");

  const displayedCurrencies = useMemo(() => {
    // ce n'est pas une bonne idée d'afficher 16k+ résultats
    const filteredCurrencies = filter ? matchSorter(currencies, filter, { keys: ["name", "symbol"] }) : currencies;
    return filteredCurrencies.slice(0, 500);
  }, [currencies, filter]);

  // active est null ou égale à currency id
  // currency active affiche tous les détails
  const [active, setActive] = useState(null);
  const hideDetails = useCallback(() => setActive(null), []);
  const showDetails = useCallback((id) => setActive(id), []);

  return (
    <div>
      {loading ? (
        <p>loading... it can take a while...</p>
      ) : (
        <>
          <div>
            <label htmlFor="filter">Filter currencies</label>
            <input id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} />
          </div>
          <p>
            {displayedCurrencies.length} first results / {currencies.length}
          </p>
          {displayedCurrencies.map((el) => {
            return (
              <Currency
                key={el.id}
                currency={el}
                isActive={el.id === active}
                showDetails={showDetails}
                hideDetails={hideDetails}
              />
            );
          })}
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default memo(List);
