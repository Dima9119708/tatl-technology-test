import { useNavigate, useParams } from 'react-router'

import { useQuery } from '@tanstack/react-query'

import { Button, Typography } from '@mui/material'

import { schoolboyById } from '@/entities/schoolboy'

import LoadingOverlay from '@/shared/ui/ui-loading-overlay'

const SchoolboyDetails = () => {
    const params = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { data, isLoading } = useQuery({
        ...schoolboyById({ id: params.id ? +params.id : 0 }),
        enabled: params.id !== undefined && typeof +params.id === 'number',
    })

    return (
        <div className="relative">
            <Button
                className="!mb-6"
                variant="outlined"
                onClick={() => navigate(-1)}
            >
                Назад
            </Button>

            <Typography variant="h4">
                {data?.FirstName} {data?.SecondName} {data?.LastName}
            </Typography>

            {isLoading && <LoadingOverlay />}
        </div>
    )
}

export default SchoolboyDetails
