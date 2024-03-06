import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    loading: false
}

const accountSlice = createSlice({
    name: "account",
    initialState,

    reducers: {
        deposit(state, action) {
            state.balance += action.payload
            state.loading = false
        },
        withdraw(state, action) {
            state.balance -= action.payload
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose } // and returning these 2 values as an obj
                }
            }, // this is for preparing the multiple args for main action creator func
            reducer(state, action) {
                if (state.loan > 0) return // return nothing in this func cuz its reducer here we mutate shit 
                state.balance += action.payload.amount
                state.loan = action.payload.amount
                state.loanPurpose = action.payload.purpose
            }
        },
        payLoan(state) {
            state.balance -= state.loan
            state.loan = 0
            state.loanPurpose = ""
        },
        convertingCurrency(state){
            state.loading = true
        }
    }
})

console.log(accountSlice);

export function deposit(amount, currency) {
    if (currency === "INR") return { type: "account/deposit", payload: amount }

    // middleware : this is what middleware is getting returned a function
    return async function (dispatch, getState) { // this function will be returned in case of currency change and 
        // via thunks redux will know its async task
        dispatch({type : 'account/convertingCurrency'})

        // API call
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`)
        const data = await res.json()
        console.log(data);
        const convertedAmt = data.rates.INR

        dispatch({ type: "account/deposit", payload: convertedAmt }) // we have 2 dispatches here it should always return an obj
    }
}

export default accountSlice.reducer
export const { payLoan, requestLoan, withdraw } = accountSlice.actions

/*
export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit": return { ...state, balance: state.balance + action.payload, loading : false }
        case "account/withdraw": return { ...state, balance: state.balance - action.payload }
        case "account/requestLoan": if (state.loan > 0) return state;
            // later
            return {
                ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }
        case "account/payLoan": return { ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan }
        case 'account/convertingCurrency' : return {...state, loading : true}
        default: return state;
    }
}

export function deposit(amount, currency) {
    if (currency === "INR") return { type: "account/deposit", payload: amount }

    // middleware : this is what middleware is getting returned a function
    return async function (dispatch, getState) { // this function will be returned in case of currency change and 
        // via thunks redux will know its async task
        dispatch({type : 'account/convertingCurrency'})

        // API call
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`)
        const data = await res.json()
        console.log(data);
        const convertedAmt = data.rates.INR

        dispatch({ type: "account/deposit", payload: convertedAmt }) // we have 2 dispatches here it should always return an obj
    }
}

export function withdraw(amount) {
    return { type: "account/withdraw", payload: amount }
}

export function requestLoan(amount, purpose) {

    return {
        type: "account/requestLoan", payload: { amount, purpose }
    }
}

export function payLoan(amount) {
    return { type: "account/payLoan", payload: amount }
}
*/