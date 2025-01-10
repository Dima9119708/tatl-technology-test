import { TableBody, TableCell, TableHead, TableRoot } from '@/shared/ui/ui-table'

import { useFetchAttendanceData } from '@/pages/attendance/api/use-fetch-attendance-data'
import RenderCell from '@/pages/attendance/ui/render-cell'

const AttendancePage = () => {
    const { data, isLoading, onLoadMore, isFetchingNextPage } = useFetchAttendanceData()

    return (
        <TableRoot
            isLoading={isLoading}
            className="max-h-[50vh] min-h-[50vh] overflow-y-auto"
        >
            <TableHead>
                <TableCell>№</TableCell>
                <TableCell>Ім’я учня</TableCell>
                {data?.columns.map((column) => <TableCell key={column.Id}>{column.Title}</TableCell>)}
            </TableHead>
            <TableBody
                isLoading={isFetchingNextPage}
                onTableEnd={onLoadMore}
            >
                {!isLoading &&
                    data?.schoolboys.Items.map((schoolboy) => (
                        <RenderCell
                            key={schoolboy.Id}
                            schoolboyId={schoolboy.Id}
                            rateItems={schoolboy?.Rate.Items}
                            firstName={schoolboy.FirstName}
                            secondName={schoolboy.SecondName}
                            lastName={schoolboy.LastName}
                            columns={data?.columns}
                        />
                    ))}
            </TableBody>
        </TableRoot>
    )
}

export default AttendancePage
