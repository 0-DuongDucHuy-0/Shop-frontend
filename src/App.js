import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { router } from './routers'
import HeaderComponents from './components/HeaderComponents/HeaderComponents';
import DefaultComponents from './components/DefaultComponet/DefaultComponents';

function App() {
  return (
    <div>
        <Router>
          <Routes>
            {router.map((route) => {
              const Layout = route.isShowHeader ? DefaultComponents : Fragment;
              const Page = route.page;
              return (
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              );
            })}
          </Routes>
        </Router>
    </div>
  )
}

export default App