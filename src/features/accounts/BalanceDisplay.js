import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "INR",
  }).format(value);
}


function BalanceDisplay() {
  const value = useSelector(store=>store.account)

  return <div className="balance">{value.loading ? "loading..." : formatCurrency(value.balance)}</div>;
}

export default BalanceDisplay;
