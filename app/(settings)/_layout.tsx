import CustomHeader from "@/components/primary/CustomHeader"
import { Stack } from "expo-router"

const SettingsLayout = () => {
    return (
        <Stack
            screenOptions={{header: CustomHeader, animation: "slide_from_right"}}
        >
            <Stack.Screen 
                name="index" 
                options={{ title: "Settings", header: (props) => <CustomHeader {...props} title="Settings"  />}}
             />
            <Stack.Screen name="account" options={{animation: "slide_from_right"}} />
            <Stack.Screen name="privacy" />
            <Stack.Screen name="avatar" />
            <Stack.Screen name="lists" />
        </Stack>
    )
}

export default SettingsLayout