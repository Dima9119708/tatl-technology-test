import { CircularProgress, CircularProgressProps } from '@mui/material'

const LoadingOverlay = (props: CircularProgressProps) => {
    return (
        <div className="absolute inset-0 flex items-center z-20 justify-center bg-white">
            <CircularProgress
                size="2rem"
                {...props}
            />
        </div>
    )
}

export default LoadingOverlay
