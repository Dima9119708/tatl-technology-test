import { useCallback, useMemo } from 'react'

import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query'

import { columnListQuery } from '@/entities/column'
import { rateByIdQuery } from '@/entities/rate'
import { schoolboyListQuery } from '@/entities/schoolboy'

export const useFetchAttendanceData = () => {
    const columnListQueryData = useQuery({
        ...columnListQuery(),
        initialData: {
            Items: [],
            Quantity: 0,
        },
    })

    const limit = 10

    const schoolboyInfiniteList = useInfiniteQuery({
        ...schoolboyListQuery(limit),
        initialPageParam: 1,
        initialData: {
            pages: [],
            pageParams: [],
        },
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            if (!lastPage.Items.length) return null
            return lastPageParam + 1
        },
    })

    const schoolboyFlatList = useMemo(() => {
        return schoolboyInfiniteList.data?.pages.flatMap((page) => page.Items) ?? []
    }, [schoolboyInfiniteList.data])

    const schoolboyIds = useMemo(() => {
        return schoolboyFlatList.map((schoolboy) => rateByIdQuery({ id: schoolboy.Id }))
    }, [schoolboyFlatList])

    const rateListQueries = useQueries({
        queries: schoolboyIds,
    })

    const isLoading = useMemo(() => {
        return columnListQueryData.isLoading || schoolboyInfiniteList.isLoading || rateListQueries.some((query) => query.isLoading)
    }, [columnListQueryData.isLoading, schoolboyInfiniteList.isLoading, rateListQueries])

    const onLoadMore = useCallback(() => {
        if (schoolboyInfiniteList.isFetchingNextPage || !schoolboyInfiniteList.hasNextPage) return

        schoolboyInfiniteList.fetchNextPage()
    }, [schoolboyInfiniteList])

    return {
        isLoading,
        isFetchingNextPage: schoolboyInfiniteList.isFetchingNextPage,
        onLoadMore,
        data: useMemo(() => {
            if (!columnListQueryData.data.Items.length || !schoolboyFlatList.length) {
                return {
                    columns: [],
                    schoolboys: {
                        Items: [],
                    },
                }
            }

            const rateList = rateListQueries.map((rateList) => rateList.data).filter(Boolean)

            return {
                columns: columnListQueryData.data.Items,
                schoolboys: {
                    Items: schoolboyFlatList.map((schoolboy, idx) => ({
                        ...schoolboy,
                        Rate: rateList[idx] ?? { Items: [] },
                    })),
                },
            }
        }, [columnListQueryData.data, schoolboyFlatList, rateListQueries]),
    }
}
