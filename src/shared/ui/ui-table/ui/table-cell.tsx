import { memo, useState } from 'react'

import { TextField } from '@mui/material'
import MUITableCell, { TableCellProps } from '@mui/material/TableCell'

import { cn } from '@/shared/lib/cn'

const TableCell = (
    props: {
        editValue?: string
        onEditCell?: (currenValue: string) => void
        onChangeInput?: (value: string) => void
    } & TableCellProps
) => {
    const { onEditCell, editValue, onChangeInput, ...rest } = props
    const [isEdit, setIsEdit] = useState(false)

    return (
        <MUITableCell
            {...rest}
            className={cn('relative', props.className)}
            onClick={editValue !== undefined ? () => setIsEdit(true) : undefined}
        >
            {props.children}
            {isEdit && (
                <div className="absolute inset-0 bg-white h-full outline-none p-4 flex items-center justify-center">
                    <TextField
                        autoFocus
                        value={editValue}
                        variant="standard"
                        size="small"
                        spellCheck={false}
                        onChange={(event) => onChangeInput?.(event.target.value)}
                        onBlur={(event) => {
                            onEditCell?.(event.target.value)
                            setIsEdit(false)
                        }}
                    />
                </div>
            )}
        </MUITableCell>
    )
}

export default memo(TableCell)
