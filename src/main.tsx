/**
 * Application entry point.
 *
 * Provider hierarchy (outermost → innermost):
 *  1. StrictMode — catches side-effect bugs during development.
 *  2. LanguageProvider — wraps the entire tree so every component
 *     (including the router) can read/set the current locale.
 *  3. App — contains BrowserRouter + route definitions.
 *
 * LanguageProvider is placed above the router intentionally so that
 * route-level components can call `t()` immediately on mount without
 * waiting for a context re-render.
 */
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
