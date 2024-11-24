import ScreenContainer from "@/components/primary/ScreenContainer"
import ThemeText from "@/components/primary/ThemeText"
import React from "react"
import { View } from "react-native"

const CallsScreen = React.memo(() => {
    return (
        <ScreenContainer>
            <ThemeText>Calls Screen</ThemeText>
        </ScreenContainer>
    )
})

export default CallsScreen