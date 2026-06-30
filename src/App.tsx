import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/language-context';
import { ActiveSectionContextProvider } from './context/active-section-context';
import { ThemeContextProvider } from './context/theme-context';
import { ToastProvider } from './context/toast-context';
import Home from './pages/Home';
import CV from './pages/CV';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeSwitch from './components/ThemeSwitch';
import LanguageSwitch from './components/LanguageSwitch';
import ToastContainer from './components/Toast';
import LoginModal from './components/LoginModal';
import AppShell from './components/AppShell';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  return (
    <LanguageProvider>
      <ThemeContextProvider>
        <ActiveSectionContextProvider>
          <ToastProvider>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <AppShell>
                      <Header />
                      <Home onLoginClick={() => setShowLogin(true)} />
                      <Footer />
                      <ThemeSwitch />
                      <LanguageSwitch />
                      <ToastContainer />
                      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
                    </AppShell>
                  }
                />
                <Route path="/cv" element={<AppShell><CV /></AppShell>} />
                <Route path="/dashboard" element={<AppShell><Layout><Dashboard /></Layout></AppShell>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </ToastProvider>
        </ActiveSectionContextProvider>
      </ThemeContextProvider>
    </LanguageProvider>
  );
}

export default App;
