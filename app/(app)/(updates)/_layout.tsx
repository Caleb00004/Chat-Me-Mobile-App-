import { Stack } from "expo-router"

const UpdatesLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="updateindex" options={{headerShown: false}} />
            <Stack.Screen name="muted" />
            <Stack.Screen name="statusprivacy" />
        </Stack>
    )
}

export default UpdatesLayout

