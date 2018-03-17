import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App.js'

const renderFn = (Component) => (props) => (<Component
  {...props}
/>);

const Root = () => (
  <Router>
    <div>
      <Route exact path="/" render={renderFn(App)} />
    </div>
  </Router>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
