import { memo } from 'react'

import MUITableRow from '@mui/material/TableRow'

import TableBody from './ui/table-body'
import TableCell from './ui/table-cell'
import TableHead from './ui/table-head'
import TableRoot from './ui/table-root'

const TableRow = memo(MUITableRow)

export { TableCell, TableRoot, TableHead, TableBody, TableRow }
