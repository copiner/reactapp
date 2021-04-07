import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';

import appReducer from '../reducer';
import rootSaga from '../sagas';


export default function configureStore(initialState={}) {

    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [ sagaMiddleware ];

    const middlewareEnhancer = applyMiddleware(...middlewares);

    // const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    // const composedEnhancers = compose(...enhancers)
    // const store = createStore(rootReducer, preloadedState, composedEnhancers)

    const store = createStore(appReducer,initialState,middlewareEnhancer);

    sagaMiddleware.run(rootSaga);
    // console.log(process.env.NODE_ENV)
    // console.log(module.hot)
    if (process.env.NODE_ENV !== 'production' && module.hot) {
       module.hot.accept('../reducer', () => store.replaceReducer(rootReducer))
     }

    return store;
}
