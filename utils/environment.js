import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default function getEnvironment() {
  if (typeof window !== 'undefined') {
    return window.ENV;
  }

  return process.env.NODE_ENV;
}

export function getTheme(userAgent) {
  return getMuiTheme({
    fontFamily: 'ffpronarrow, sans-serif',
    palette: {
      textColor: '#02b875',
      primary1Color: '#02b875',
    },
    userAgent,
  });
}