import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("INR");

  const dispatch = useDispatch() // we need only one dispatch to send all our data to store
  const account = useSelector(store => store.account)

  console.log(account);

  function handleDeposit() {
    if (!depositAmount) return
    dispatch(deposit(depositAmount, currency))
    setCurrency("INR")
    setDepositAmount("")
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return
    dispatch(withdraw(withdrawalAmount))
    setWithdrawalAmount("")
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return
    dispatch(requestLoan(loanAmount, loanPurpose))
    setLoanAmount("")
    setLoanPurpose("")
  }

  function handlePayLoan() {
    dispatch(payLoan(account.loan))
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="INR">Rupee</option>
            <option value="USD">US Dollar</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>Deposit {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        <div>
          <span>Pay back ₹{account.loan}</span>
          <button onClick={handlePayLoan} disabled={account.loading}>Pay loan</button>
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
