import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Applications from './pages/Application/index.jsx';
import Environment from './pages/Environment/index.jsx';
import Setting from './pages/Setting';
import Release from './pages/Release';

import BaseLayout from './layout/BaseLayout';
import './app.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        cssVar: { key: 'app' },
        token: {
          colorPrimary: '#0070cd',
          borderRadius: 2,
        },
      }}
    >
      <BrowserRouter>
        <BaseLayout>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/application" element={<Applications />} />
            <Route path="/environment" element={<Environment />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/release" element={<Release />} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
