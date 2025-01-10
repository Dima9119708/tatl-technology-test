import { TRate } from '@/entities/rate/model/types'

import { api } from '@/shared/config/api-config'

const rateQueryKey = 'rate'

export const rateByIdQuery = ({ id }: { id: string | number }) => ({
    queryKey: [rateQueryKey, id],
    queryFn: () =>
        api
            .get<TRate>('/Rate', {
                params: {
                    SchoolboyId: id,
                },
            })
            .then((res) => res.data),
})
