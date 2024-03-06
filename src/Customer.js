import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector(store => store.customer) // useSelector to subscribe to the redux store

  return <h2>👋 Welcome, {customer.fullName}</h2>;
}

export default Customer;
