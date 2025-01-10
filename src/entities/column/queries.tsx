import { TColumn } from '@/entities/column/model/types'

import { api } from '@/shared/config/api-config'

const columnQueryKey = 'column'

export const columnListQuery = () => ({
    queryKey: [columnQueryKey],
    queryFn: () => api.get<TColumn>('/Column').then((res) => res.data),
})
