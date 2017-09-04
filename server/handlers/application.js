import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import Root from '../../components/Root';
import Html from '../../components/server/Html';
import configureStore from '../../redux/configureStore';
import getRoutes from '../../routes/routes';

export default (req, res) => {
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const { store, history } = configureStore(memoryHistory);

  match({
    history,
    routes: getRoutes(store),
    location: req.originalUrl,
  }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.send(error);
    } else if (renderProps) {
      const html = ReactDOM.renderToStaticMarkup(
        <Html store={store} >
          <Root isServer={true} store={store} renderProps={renderProps} />
        </Html>,
      );
      res.status(200).type('html').send(`<!DOCTYPE html>${html}`);
    } else {
      res.status(404).send('not found');
    }
  });
};
