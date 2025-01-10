import { SnackbarProvider } from 'notistack'
import { RouterProvider } from 'react-router'

import QueryClientProvider from '@/app/providers/QueryClient'
import { router } from '@/app/router/router'

function App() {
    return (
        <QueryClientProvider>
            <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <RouterProvider router={router} />
            </SnackbarProvider>
        </QueryClientProvider>
    )
}

export default App
