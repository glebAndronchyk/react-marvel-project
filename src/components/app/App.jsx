import React, {lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const SingleComicPageLayout = lazy(() => import('../pages/singleComicPageLayout/SingleComicPageLayout'));
const SingleCharPageLayout = lazy(() => import('../pages/singleCharPageLayout/SingleCharPageLayout'))
const App = () => {

  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>

          <Suspense fallback={<Spinner />}>
            <Routes>

              <Route index element={<MainPage />} />
              <Route path='/characters/:id' element={<SinglePage Component={SingleCharPageLayout} dataType='character' />} />
              <Route path='comics' element={<ComicsPage />} />
              <Route path='/comics/:id' element={<SinglePage Component={SingleComicPageLayout} dataType='comics' />} />
              <Route path='*' element={<Page404 />} />

            </Routes>
          </Suspense>

        </main>

      </div>
    </Router>
  )
}

export default App;
