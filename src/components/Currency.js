// src/components/Currency.js
import { memo } from "react";

const Currency = ({ currency, isActive, showDetails, hideDetails }) => {
  const { id, name, symbol, logo_url, ...rest } = currency;
  return (
    <div>
      <div>
        {logo_url && <img src={logo_url} alt={`${name} logo`} width="32" />}
        <h2>
          <span>{name}</span> (<small>{symbol}</small>)
        </h2>
        {isActive ? (
          <button onClick={hideDetails}>Hide details</button>
        ) : (
          <button onClick={() => showDetails(id)}>Show details</button>
        )}
      </div>
      {isActive && <pre>{JSON.stringify(rest, null, 2)}</pre>}
    </div>
  );
};
// souvent on met en place memo ici 👇
export default memo(Currency);
