import { FC, PropsWithChildren } from 'react'

const Layout: FC<Required<PropsWithChildren>> = (props) => {
    return <div className="p-8">{props.children}</div>
}

export default Layout
