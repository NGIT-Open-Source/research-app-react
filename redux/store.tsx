import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import login from './Login/reducer'

const combinedReducer = combineReducers({
  login,
})

const initStore = () => {
  return createStore(combinedReducer, composeWithDevTools(applyMiddleware()))
}

export const wrapper = createWrapper(initStore)
