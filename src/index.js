import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Conversor from './conversor';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Conversor />
  </React.StrictMode>
);

