import { Stack, Tabs } from 'expo-router';
import React, { FC } from 'react';
import { Platform, Pressable, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import SafeAreaViewComp from '@/components/Safeareaviewcomp';
import type {NativeStackHeaderProps} from "@react-navigation/native-stack"
import { AntDesign } from '@expo/vector-icons';
import CustomHeader from '@/components/primary/CustomHeader';

export default function MainLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{
      header: CustomHeader
    }}>
      <Stack.Screen name='index' options={{headerShown: false}} />
      <Stack.Screen name='(chats)' options={{headerShown: false, animation: "none"}}  />
      <Stack.Screen name='(updates)' options={{headerShown: false}} />
      <Stack.Screen name='contact' options={{animation: "none"}} />
      <Stack.Screen name='status' options={{animation: "slide_from_right"}} />
      <Stack.Screen name='camera' options={{animation: "slide_from_right"}} />
    </Stack>
  );
}
// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }
