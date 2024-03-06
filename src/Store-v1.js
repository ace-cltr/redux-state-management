import { combineReducers, createStore } from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
}

const initialStateUser = {
    fullName: "",
    nationalId: "",
    createdAt: ""
}

function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit": return { ...state, balance: state.balance + action.payload }
        case "account/withdraw": return { ...state, balance: state.balance - action.payload }
        case "account/requestLoan": if (state.loan > 0) return state;
            // later
            return {
                ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }
        case "account/payLoan": return { ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan }
        default: return state;
    }
}


function customerReducer(state = initialStateUser, action) {
    switch (action.type) {
        case "customer/createUser": return {
            ...state, fullName: action.payload.fullName,
            nationalId: action.payload.nationalId, createdAt: action.payload.createdAt
        }
        case "account/updateName": return { ...state, fullName: action.payload }
        default: return state;
    }
}

const rootReducer = combineReducers({account : accountReducer, customer : customerReducer})

const store = createStore(rootReducer)


// store.dispatch({ type: "account/deposit", payload: 500 })

// console.log(store.getState());

// store.dispatch({ type: "account/requestLoan", payload: { amount: 3000, purpose: "Headphone" } })
// console.log(store.getState());

function deposit(amount) {
    return { type: "account/deposit", payload: amount }
}

function withdraw(amount) {
    return { type: "account/withdraw", payload: amount }
}

function requestLoan(amount, purpose) {

    return {
        type: "account/requestLoan", payload: { amount, purpose }
    }
}

function payLoan(amount) {
    return { type: "account/payLoan", payload: amount }
}

store.dispatch(deposit(4000))

console.log(store.getState());


// for new customer

function createUser(fullName, nationalId) {
    return { type: "customer/createUser", payload: { fullName, nationalId, createdAt: new Date().toISOString() } }
}

function updateName(fullName) {
    return { type: "account/updateName", payload: fullName }
}

store.dispatch(createUser("nigga yadav", 420))

console.log(store.getState());

