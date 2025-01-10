import { FC, PropsWithChildren, memo } from 'react'

import { Paper, Table, TableContainer, TableContainerProps } from '@mui/material'

import { cn } from '@/shared/lib/cn'
import LoadingOverlay from '@/shared/ui/ui-loading-overlay'

const TableRoot: FC<PropsWithChildren<{ isLoading?: boolean } & TableContainerProps>> = (props) => {
    const { children, className, isLoading } = props

    return (
        <TableContainer
            className={cn('relative', className)}
            component={Paper}
        >
            <Table
                className="w-full"
                stickyHeader
            >
                {children}
            </Table>

            {isLoading && <LoadingOverlay />}
        </TableContainer>
    )
}

export default memo(TableRoot)
