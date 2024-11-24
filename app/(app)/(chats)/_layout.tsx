import CustomHeader from "@/components/primary/CustomHeader"
import { Stack } from "expo-router"

const ChatsLayout = () => {
    return (
        <Stack screenOptions={{
            header: CustomHeader, 
        }}>
            <Stack.Screen name="chatindex" /> 
            <Stack.Screen name="chatbox"/>
        </Stack>
    )
}

export default ChatsLayout