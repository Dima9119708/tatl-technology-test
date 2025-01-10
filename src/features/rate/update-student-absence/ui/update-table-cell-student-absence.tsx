import { useSnackbar } from 'notistack'
import { memo, useRef, useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TRateItem, rateByIdQuery } from '@/entities/rate'

import { api } from '@/shared/config/api-config'
import { TRANSLATIONS } from '@/shared/config/translations'
import { TableCell } from '@/shared/ui/ui-table'

interface MarkAndRemoveAbsenceProps {
    schoolboyId: number
    columnId: number
    rateTitle?: string
}

const useMarkStudentAbsenceMutation = (props: { schoolboyId: number }) => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar()

    const queryKey = rateByIdQuery({ id: props.schoolboyId }).queryKey

    return useMutation({
        mutationFn: ({ Title, SchoolboyId, ColumnId }: { Title: string; SchoolboyId: number; ColumnId: number }) =>
            api.post('/Rate', {
                Title,
                SchoolboyId,
                ColumnId,
            }),
        onMutate: (variables) => {
            const oldData = queryClient.getQueryData<TRateItem>(queryKey)

            queryClient.setQueryData(queryKey, (old: TRateItem) => {
                return {
                    ...old,
                    ...variables,
                }
            })

            return oldData
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(rateByIdQuery({ id: props.schoolboyId }))
            enqueueSnackbar(TRANSLATIONS.RECORD_EDITED, { variant: 'success' })
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(queryKey, context)
        },
    })
}

const useRemoveStudentAbsenceMutation = (props: { schoolboyId: number }) => {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar()

    const queryKey = rateByIdQuery({ id: props.schoolboyId }).queryKey

    return useMutation({
        mutationFn: ({ SchoolboyId, ColumnId }: { SchoolboyId: number; ColumnId: number }) =>
            api.post('/UnRate', {
                SchoolboyId,
                ColumnId,
            }),
        onMutate: (variables) => {
            const oldData = queryClient.getQueryData<TRateItem>(queryKey)

            queryClient.setQueryData(queryKey, (old: TRateItem) => {
                return {
                    ...old,
                    ...variables,
                }
            })

            return oldData
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(rateByIdQuery({ id: props.schoolboyId }))
            enqueueSnackbar(TRANSLATIONS.RECORD_DELETED, { variant: 'success' })
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(queryKey, context)
        },
    })
}

const UpdateTableCellStudentAbsence = (props: MarkAndRemoveAbsenceProps) => {
    const { schoolboyId, columnId, rateTitle } = props
    const prevEditValueStateRef = useRef(rateTitle ?? '')
    const [editValue, setValue] = useState(rateTitle ?? '')
    const { enqueueSnackbar } = useSnackbar()

    const markStudentAbsence = useMarkStudentAbsenceMutation({ schoolboyId })

    const removeStudentAbsence = useRemoveStudentAbsenceMutation({ schoolboyId })

    const onEditCell = (value: string) => {
        if (prevEditValueStateRef.current === value) return

        if (value === 'H') {
            markStudentAbsence.mutate(
                {
                    Title: value,
                    SchoolboyId: schoolboyId,
                    ColumnId: columnId,
                },
                {
                    onSuccess: () => {
                        prevEditValueStateRef.current = value
                    },
                    onError: () => {
                        setValue(prevEditValueStateRef.current)
                    },
                }
            )
            return
        }

        if (value === '') {
            removeStudentAbsence.mutate(
                { SchoolboyId: schoolboyId, ColumnId: columnId },
                {
                    onSuccess: () => {
                        prevEditValueStateRef.current = value
                    },
                    onError: () => {
                        setValue(prevEditValueStateRef.current)
                    },
                }
            )

            return
        }

        enqueueSnackbar(TRANSLATIONS.INVALID_FIELD, { variant: 'error' })
        setValue(prevEditValueStateRef.current)
    }

    return (
        <TableCell
            editValue={editValue}
            onChangeInput={(value) => setValue(value)}
            onEditCell={onEditCell}
        >
            {rateTitle}
        </TableCell>
    )
}

export default memo(UpdateTableCellStudentAbsence)
