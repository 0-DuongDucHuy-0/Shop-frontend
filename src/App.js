import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { router } from './routers'
import DefaultComponents from './components/DefaultComponet/DefaultComponents';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function App() {
  // useEffect(() => {
  //   fetchApi()
  // }, [])

  const fetchApi = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
    // const res = await axios.get('http://localhost:3001/api/product/get-all');
    return res.data
  }

  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })

  console.log('query' ,query)

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