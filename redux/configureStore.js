import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default function configureStore(baseHistory, initialState = {}) {
  const routingMiddleware = routerMiddleware(baseHistory);
  const middleware = applyMiddleware(routingMiddleware, thunk);
  let enhancer = middleware;
  if (typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    enhancer = compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(),
    );
  }
  const store = createStore(reducer, initialState, enhancer);
  const history = syncHistoryWithStore(baseHistory, store);
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      return store.replaceReducer(require('./reducer').default); // eslint-disable-line global-require
    });
  }

  return { store, history };
}
