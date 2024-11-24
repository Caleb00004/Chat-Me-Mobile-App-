import ScreenContainer from "@/components/primary/ScreenContainer"
import ThemeText from "@/components/primary/ThemeText"
import React from "react"

const SelectcontactScreen = React.memo(() => {
    return (
        <ScreenContainer>
            <ThemeText>New Group</ThemeText>
            <ThemeText>New Contact</ThemeText>
        </ScreenContainer>
    )
})

export default SelectcontactScreen