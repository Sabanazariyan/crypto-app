import { RotatingLines } from "react-loader-spinner";

import { marketChart } from "../../services/cryptoApi";
import chartUp from "../../assests/chart-up.svg";
import chartDown from "../../assests/chart-down.svg";

import styles from "./TableCoin.module.css";

function TableCoin({ coins, isLoading, currency, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          strokeColor="#3874ff"
          strokeWidth="2"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                coin={coin}
                key={coin.id}
                currency={currency}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({ coin, currency, setChart }) => {
  const {
    id,
    image,
    symbol,
    name,
    price_change_percentage_24h,
    current_price,
    total_volume,
  } = coin;
  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({ ...json, coin: coin });
    } catch (error) {
      setChart(null);
    }
  };
  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt="" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {" "}
        {currency === "usd" ? (
          <span>$</span>
        ) : currency === "eur" ? (
          <span>€</span>
        ) : (
          <span>¥</span>
        )}{" "}
        {current_price.toLocaleString()}
      </td>
      <td
        className={
          price_change_percentage_24h > 0 ? styles.success : styles.error
        }
      >
        {price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img
          src={price_change_percentage_24h > 0 ? chartUp : chartDown}
          alt={name}
        />
      </td>
    </tr>
  );
};
