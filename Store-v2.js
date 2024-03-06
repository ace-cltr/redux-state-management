import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";


const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) // blud don't forget to add thunk to applyMiddleware function

export default store;


