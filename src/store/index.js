import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace:true}) || compose

const store = createStore(reducer,composeEnhances(applyMiddleware(thunk)))

export default store