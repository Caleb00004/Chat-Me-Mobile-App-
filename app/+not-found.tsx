import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from 'expo-router';
export default function NotFoundScreen() {
  const router = useRouter()
  const navigation = useNavigation()

  console.log(navigation)
  console.log(router)

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text >Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
