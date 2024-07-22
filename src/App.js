import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { router } from './routers'
import HeaderComponents from './components/HeaderComponents/HeaderComponents';

function App() {
  return (
    <div>
      <HeaderComponents />
        <Router>
          <Routes>
            {router.map((route) => {
              const Page = route.page;
              return (
                <Route key={route.path} path={route.path} element={<Page />} />
              );
            })}
          </Routes>
        </Router>
    </div>
  )
}

export default App