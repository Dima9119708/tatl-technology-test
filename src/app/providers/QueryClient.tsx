import { FC, PropsWithChildren } from 'react'
import { QueryClientProvider as TanstackQueryClientProvider,  QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

const QueryClientProvider: FC<Required<PropsWithChildren>> = (props) => {
    const { children } = props

    return (
        <TanstackQueryClientProvider client={queryClient}>
            {children}
        </TanstackQueryClientProvider>
    );
};

export default QueryClientProvider;
