import { AxiosError } from 'axios'
import { useSnackbar } from 'notistack'
import { useLayoutEffect } from 'react'

import { api } from '@/shared/config/api-config'
import { TRANSLATIONS } from '@/shared/config/translations'

const GlobalInterceptors = () => {
    const { enqueueSnackbar } = useSnackbar()

    useLayoutEffect(() => {
        const requestInterceptor = api.interceptors.request.use((config) => {
            const token = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
            const language = 'en'

            config.headers.Authorization = `Bearer ${token}`
            config.headers['Accept-Language'] = language
            return config
        })

        const responseInterceptor = api.interceptors.response.use(undefined, (error: AxiosError) => {
            if (error.response?.status === 404) {
                enqueueSnackbar(TRANSLATIONS.RESOURCE_NOT_FOUND, { variant: 'error' })
            }

            if (error.response?.status === 500) {
                enqueueSnackbar(TRANSLATIONS.SERVER_ERROR, { variant: 'error' })
            }

            if (error.response && error.response.status === 0) {
                enqueueSnackbar(TRANSLATIONS.CONNECTION_ERROR, {
                    variant: 'error',
                })
            }

            return Promise.reject(error)
        })

        return () => {
            api.interceptors.request.eject(requestInterceptor)
            api.interceptors.response.eject(responseInterceptor)
        }
    }, [])

    return null
}

export default GlobalInterceptors
