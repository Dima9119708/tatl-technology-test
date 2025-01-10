import { Outlet } from 'react-router'

import GlobalInterceptors from '@/app/global-interceptors/global-interceptors'

import { Layout } from '@/shared/ui/ui-layout'

const AppInit = () => {
    return (
        <Layout>
            <GlobalInterceptors />

            <Outlet />
        </Layout>
    )
}

export default AppInit
