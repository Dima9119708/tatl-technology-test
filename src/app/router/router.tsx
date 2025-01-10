import { Navigate, createBrowserRouter } from 'react-router'

import AppInit from '@/app/app-init/app-init'

import { ROUTES } from '@/shared/config/routes'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: AppInit,
        children: [
            {
                path: '/',
                lazy: async () => {
                    const { AttendancePage } = await import('@/pages/attendance')

                    return {
                        Component: AttendancePage,
                    }
                },
            },
            {
                path: '/schoolboy/:id',
                lazy: async () => {
                    const { SchoolboyDetails } = await import('@/pages/schoolboy-details')

                    return {
                        Component: SchoolboyDetails,
                    }
                },
            },
            {
                path: '*',
                element: (
                    <Navigate
                        to={{
                            pathname: ROUTES.ATTENDANCE,
                        }}
                    />
                ),
            },
        ],
    },
])
