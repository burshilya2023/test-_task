import {bindActionCreators, combineReducers, configureStore} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { notesAPI } from '../api/notesService';


 const rootReducer= combineReducers({
        // ...reducers,
        [notesAPI.reducerPath]:notesAPI.reducer
})

export const setupStore=()=>{
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware)=> 
            getDefaultMiddleware().concat(notesAPI.middleware)
        
    })
}

// get type state
 export type RootState = ReturnType<typeof rootReducer>
// get type Store
 export type AppStore= ReturnType<(typeof setupStore)>
// get type dispatch
 export type AppDispatch = AppStore['dispatch']

// hooks
export const useTypedSelector: TypedUseSelectorHook<RootState>=useSelector

export const useAppDispatch = () => useDispatch<AppDispatch>();

