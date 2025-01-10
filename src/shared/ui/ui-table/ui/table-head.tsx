import { memo } from 'react'

import MUITableHead, { TableHeadProps } from '@mui/material/TableHead'
import MUITableRow from '@mui/material/TableRow'

const TableHead = (props: TableHeadProps) => {
    const { children } = props

    return (
        <MUITableHead>
            <MUITableRow>{children}</MUITableRow>
        </MUITableHead>
    )
}

export default memo(TableHead)
