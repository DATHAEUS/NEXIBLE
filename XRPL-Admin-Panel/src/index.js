// scroll bar
import 'simplebar/src/simplebar.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import store from './store';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import AlertTemplate from 'react-alert-template-basic';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

root.render(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </BrowserRouter>
    </HelmetProvider>
  </Provider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
