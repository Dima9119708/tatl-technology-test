import React, { memo, useEffect, useRef } from 'react'

import MUITableBody, { TableBodyProps } from '@mui/material/TableBody'

import { TRANSLATIONS } from '@/shared/config/translations'
import { cn } from '@/shared/lib/cn'

const TableBody = (props: { isLoading?: boolean; onTableEnd?: () => void } & TableBodyProps) => {
    const { children, onTableEnd, isLoading, ...rest } = props
    const intersectionObserverElementRef = useRef<HTMLTableRowElement>(null)

    const isMoreThanOneChild = React.Children.toArray(children).length > 1

    useEffect(() => {
        if (onTableEnd === undefined || !isMoreThanOneChild) return

        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (onTableEnd) {
                    onTableEnd()
                }
            }
        })

        if (intersectionObserverElementRef.current) {
            intersectionObserver.observe(intersectionObserverElementRef.current)
        }

        return () => {
            intersectionObserver.disconnect()
        }
    }, [onTableEnd, isMoreThanOneChild])

    return (
        <MUITableBody
            {...rest}
            className={cn('relative', rest.className)}
        >
            {children}

            <tr
                ref={intersectionObserverElementRef}
                className="h-[3rem]"
            >
                {isLoading && (
                    <td
                        colSpan={100}
                        className="text-center"
                    >
                        {TRANSLATIONS.LOADING}
                    </td>
                )}
            </tr>
        </MUITableBody>
    )
}

export default memo(TableBody)
