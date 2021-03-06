// const { createStore, applyMiddleware, combineReducers, compose } = Redux
// const thunk = ReduxThunk.default

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { userReducer } from './reducers/user.reducer.js'
// import { reviewReducer } from './review.reducer'
import { stayReducer } from './reducers/stay.reducers'
import { orderReducer } from './reducers/order-reducers'

const rootReducer = combineReducers({
    userModule: userReducer,
    // reviewModule: reviewReducer,
    stayModule: stayReducer,
    orderModule: orderReducer
})


// export const store = createStore(rootReducer, applyMiddleware(thunk))
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
// Lets wire up thunk and also redux-dev-tools:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// export const store = createStore(rootReducer, applyMiddleware(thunk))


