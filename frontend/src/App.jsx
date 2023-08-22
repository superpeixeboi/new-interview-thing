import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import ContentListPage from './pages/Content/ContentListPage/ContentListPage'
import ContentFormPage from './pages/Content/ContentFormPage/ContentFormPage'
import __ from './i18n'

import './App.css'

function App() {
  return (
    <div className="App">
      <div className="navbar bg-red-50 mb-16">
        <div className="container mx-auto">
          <div className="flex-1">
            <a className="text-xl text-red-400 font-bold">{__('APOIA.se')}</a>
          </div>
          <div className="flex-none">
            <label className="btn btn-sm btn-ghost">{__('Modalidades')}</label>
            <label className="btn btn-sm btn-ghost">{__('Recursos')}</label>
            <label className="btn btn-sm btn-ghost">{__('Buscar campanhas')}</label>
            <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={PIC} />
              </div>
            </label>
          </div>
        </div>
      </div>
      <Router>
        <Routes>
          <Route path="/content/new" element={<ContentFormPage />} />
          <Route path="/content/edit/:contentId" element={<ContentFormPage />} />
          <Route path="/content" element={<ContentListPage />} />
        </Routes>
      </Router>
      <footer className="footer p-10 mt-16 bg-neutral text-neutral-content">
        <div className="mx-auto">
          <span className="font-bold text-xl">{__('APOIA.se')}</span>
        </div>
      </footer>
    </div>
  );
}

export default App

const PIC = "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
