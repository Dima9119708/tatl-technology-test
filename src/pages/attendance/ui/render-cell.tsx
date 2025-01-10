import { memo } from 'react'
import { Link, generatePath } from 'react-router'

import { UpdateTableCellStudentAbsence } from '@/features/rate/update-student-absence'

import { TColumn } from '@/entities/column'
import { TRate } from '@/entities/rate'
import { SchoolboyItem, fullName } from '@/entities/schoolboy'

import { ROUTES } from '@/shared/config/routes'
import { TableCell, TableRow } from '@/shared/ui/ui-table'

const RenderCell = memo(
    (props: {
        schoolboyId: SchoolboyItem['Id']
        rateItems: TRate['Items']
        firstName: SchoolboyItem['FirstName']
        secondName: SchoolboyItem['SecondName']
        lastName: SchoolboyItem['LastName']
        columns: TColumn['Items']
    }) => {
        const { schoolboyId, lastName, secondName, firstName, rateItems, columns } = props

        return (
            <TableRow>
                <TableCell>{schoolboyId}</TableCell>
                <TableCell>
                    <Link
                        to={{ pathname: generatePath(ROUTES.SCHOOLBOY, { id: `${schoolboyId}` }) }}
                        className="hover:underline"
                    >
                        {fullName({ lastName, firstName, secondName })}
                    </Link>
                </TableCell>
                {columns.map((column) => {
                    const rate = rateItems.find((item) => item.ColumnId === column.Id)

                    return (
                        <UpdateTableCellStudentAbsence
                            key={column.Id}
                            columnId={column.Id}
                            rateTitle={rate?.Title}
                            schoolboyId={schoolboyId}
                        />
                    )
                })}
            </TableRow>
        )
    }
)

export default memo(RenderCell)
