import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #f8f9fa;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Navigate to="/dashboard/nova" replace />} />
          <Route path="/dashboard/:botId" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;