import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ // its that easy with RTK bruh! middleware devtools everything got setup automatically
    reducer : {
        account : accountReducer,
        customer : customerReducer 
    }
})

export default store;


