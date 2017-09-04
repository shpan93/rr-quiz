import React from 'react';
import ReactDOM from 'react-dom/server';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

function renderJs() {
  return (
    <script type="text/javascript" src={'/public/js/default-main.js'} />
  );
}
function renderCss() {
  if (process.env.NODE_ENV === 'production') {
    return (
      <link rel="stylesheet" type="text/css" href="/public/js/style.css" />
    );
  }

  return null;
}

export default class Html extends React.PureComponent {
  static propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.element,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const htmlContent = ReactDOM.renderToString(this.props.children);
    return (
      <html lang="en">
        <head>
          <title>Universal React boilerplate</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          {renderCss()}
        </head>
        <body>
          <main id="app" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.App = ${serialize(this.props.store.getState())}`,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = '${process.env.NODE_ENV}'`,
            }}
          />
          {renderJs()}
        </body>
      </html>
    );
  }
}
