import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);