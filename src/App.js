import React, { memo, Suspense } from 'react'

import { renderRoutes } from 'react-router-config'

import { HashRouter } from 'react-router-dom'

import routes from './router'

import store from './store'

import { Provider } from 'react-redux'

import CJLAppHeader from 'components/appheader'
import CJLAppFooter from 'components/appfooter'
import CJLAppPlayerBar from '@/pages/player/app-player-bar'


export default memo(function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <CJLAppHeader />
                <Suspense fallback={<div>Page Loading</div>}>
                    {renderRoutes(routes)}
                </Suspense>
                <CJLAppFooter />
                <CJLAppPlayerBar />
            </HashRouter>
        </Provider>
    )
})
