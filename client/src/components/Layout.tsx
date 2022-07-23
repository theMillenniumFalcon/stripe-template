import React from "react"
import { Wrapper, WrapperVariant } from "./Wrapper"
import { Navbar } from "./Navbar"

interface LayoutProps {
    children: any
    variant?: WrapperVariant
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
    return (
        <>
            <Navbar />
            <Wrapper variant={variant}>{children}</Wrapper>
        </>
    )
}