import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    fullName: "",
    nationalId: "",
    createdAt: ""
}

const customerSlice = createSlice({
    name: "customer",
    initialState,

    reducers : {
        createUser : {
            prepare(fullName, nationalId){
                return {
                    payload : {fullName, nationalId, createdAt :new Date().toISOString() }
                }
            },
            reducer(state, action){
                state.fullName = action.payload.fullName
                state.nationalId = action.payload.nationalId
                state.createdAt = action.payload.createdAt
            }
        }
    }
})

export default customerSlice.reducer
export const { createUser } = customerSlice.actions
console.log(createUser);

/*
export default function customerReducer(state = initialStateUser, action) {
    switch (action.type) {
        case "customer/createUser": return {
            ...state, fullName: action.payload.fullName,
            nationalId: action.payload.nationalId, createdAt: action.payload.createdAt
        }
        case "account/updateName": return { ...state, fullName: action.payload }
        default: return state;
    }
}

export function createUser(fullName, nationalId) {
    return { type: "customer/createUser", payload: { fullName, nationalId, createdAt: new Date().toISOString() } }
}

export function updateName(fullName) {
    return { type: "account/updateName", payload: fullName }
}
*/
