import { QueryFunctionContext } from '@tanstack/react-query'

import { api } from '@/shared/config/api-config'

import { SchoolboyItem, TSchoolboy } from './model/types'

const schoolboyQueryKey = 'schoolboy'

export const schoolboyListQuery = (limit: number) => ({
    queryKey: [schoolboyQueryKey],
    queryFn: ({ pageParam }: QueryFunctionContext) => {
        return api
            .get<TSchoolboy>(`/Schoolboy`, {
                params: {
                    page: pageParam,
                    limit: limit,
                },
            })
            .then((res) => res.data)
    },
})

export const schoolboyById = ({ id }: { id: number | string }) => ({
    queryKey: [schoolboyQueryKey, id],
    queryFn: () => {
        return api
            .get<SchoolboyItem>(`/Schoolboy`, {
                params: {
                    id: id,
                },
            })
            .then((res) => {
                //@todo API не предоставляет возможность получить одного ученика
                if ('Items' in res.data) {
                    return (
                        ((res.data as unknown as TSchoolboy).Items.find((item) => item.Id === id) as SchoolboyItem) ?? ({} as SchoolboyItem)
                    )
                }

                return res.data
            })
    },
})
