import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Pressable, SafeAreaView, StatusBar, Text, View, ViewProps } from 'react-native';
import CallsScreen from './calls';
import CommunitiesScreen from './communities';
import IndexChatScreen from './(chats)/chatindex';
import Updates from './(updates)/updateindex';
import PagerView from 'react-native-pager-view';
import { ReactNode, useRef, useState } from 'react';
import {Fontisto, MaterialIcons, MaterialCommunityIcons, AntDesign, Feather} from "@expo/vector-icons"
import SafeAreaViewComp from '@/components/Safeareaviewcomp';
import { useRouter } from 'expo-router';
import ChatboxScreen from './(chats)/chatbox';
import Animated, { AnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import useClickOutside from '@/hooks/useOnClickoutside';
import ThemeView from '@/components/primary/ThemeView';
import ThemeText from '@/components/primary/ThemeText';

const HelperItem = ({children, onPress}: {children: ReactNode, onPress: () => void}) => {
  return (
    <Pressable onPress={onPress} style={{backgroundColor: "green", alignSelf: "flex-start", marginLeft: "auto", marginRight: 15, padding: 13, borderRadius: 10}}>
      {children}
    </Pressable>
  )
}

export default function MainScreen() {
  const [currentPage, setCurrentPage] = useState(0)
  const [openDropdown, setOpendropdown] = useState(false)
  const pageRef = useRef(null)
  const router = useRouter()
  const animateHeight = useDerivedValue(() => {
    return openDropdown ? withTiming(200) : withTiming(0)
  },[openDropdown])
  const animateOpacity = useDerivedValue(() => {
    return currentPage === 2 ? withTiming(0, {duration: 300}) : withTiming(1, {duration: 300})
  },[currentPage])
  const animateTab = useSharedValue(0)


  const closeDropDown = () => {
    setOpendropdown(false)
  }

  const { ref, handleClickOutside } = useClickOutside(() => {
    closeDropDown() // Close dropdown when clicking outside
  });

  console.log(openDropdown)

  const navigateToPage = (pageIndex) => {
    // setCurrentPage(pageIndex); // Update the state
    pageRef?.current?.setPage(pageIndex); // Use the setPage method
  };

  const HeaderText = currentPage === 0 ? "Chat Me" : currentPage === 1 ? "Updates" : currentPage === 2 ? "Communities" : "Calls"

  const dropDownContent = 
    <>
      {currentPage === 0 && 
        <>
          <Pressable>
            <Text style={{color: "white", paddingVertical: 8, paddingHorizontal: 10}}>New Group</Text>
          </Pressable>
          <Pressable>
            <Text style={{color: "white", paddingVertical: 8, paddingHorizontal: 10}}>New Broacast</Text>
          </Pressable>
          <Pressable>
            <Text style={{color: "white", paddingVertical: 8, paddingHorizontal: 10}}>Linked</Text>
          </Pressable>
          <Pressable>
            <Text style={{color: "white", paddingVertical: 8, paddingHorizontal: 10}}>Starred messages</Text>
          </Pressable>
        </>
      }
      {currentPage === 1 && 
        <>
          <Pressable>
            <Text style={{color: "white", paddingVertical: 8, paddingHorizontal: 10}}>Status Privacy</Text>
          </Pressable>
          <Pressable>
            <Text style={{color: "white", paddingVertical: 8, paddingHorizontal: 10}}>Create Channel</Text>
          </Pressable>  
        </>
      }
      {
        currentPage === 3 && 
        <>
           <Pressable>
            <Text style={{color: "white", paddingVertical: 8, paddingHorizontal: 10}}>Clear call log</Text>
          </Pressable>
        </>
      }
      <Pressable onPress={() => (router.push("/(settings)"), closeDropDown())}>
        <Text style={{color: "white", paddingVertical: 8, paddingHorizontal: 10}}>Settings</Text>
      </Pressable>
    </>

    const animatedStyle = useAnimatedStyle(() => {
      return {
        height: animateHeight.value,
      };
    });

    const rHelperStyle = useAnimatedStyle(() => {
      return {
        opacity: animateOpacity.value
      }
    })

    const getTabAnimatedStyle = (isActive: boolean) => {
      return useAnimatedStyle(() => ({
          backgroundColor: isActive
              ? `rgba(0, 180, 0, 1)` // Green with animated opacity
              : 'transparent',
          opacity: 1,
          paddingHorizontal: isActive ? withTiming(10) : 0,
          borderRadius: 10,
      }));
    };

  return (
    <>
      <SafeAreaViewComp style={{backgroundColor: "#0d142b", position: "relative"}}>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={{fontSize: 25, color: "white"}}>{HeaderText}</Text>
          <View style={{position: "relative", flexDirection: "row", justifyContent: "space-between", gap: 20}}>
            <Pressable>
              <AntDesign name="camerao" size={24} color={"white"} />
            </Pressable>
            {(currentPage === 1 || currentPage === 3) && 
              <Pressable>
                <AntDesign name="search1" size={24} color={"white"} />
              </Pressable>
            }
            <Pressable onPress={() => setOpendropdown(prev => !prev)}>
              <Feather name="more-vertical" size={24} color={"white"} />
            </Pressable>
            
            <Animated.View ref={ref} style={[{width: 150, right: 0, overflow: "hidden", zIndex: 2, backgroundColor: "#253242", position: "absolute", marginTop: 40}, animatedStyle]}>
              {dropDownContent}
            </Animated.View>
          </View>
        </View>
      </SafeAreaViewComp>
      
      {/* <Text>Home Page</Text> */}
 
      <PagerView
        ref={pageRef}
        style={{flex: 1}} 
        initialPage={0}
        // onPageSelected={(e) => console.log(e.nativeEvent)}
        onPageSelected={
          (e) => {
            setCurrentPage(e.nativeEvent.position), 
            setOpendropdown(false)
            // animateTab.value = withTiming(1, {duration: 600})
          }
        } // Update current page on swipe
      >
        <Pressable key={"1"} style={{flex: 1}} onPress={handleClickOutside} disabled={!openDropdown}>
          <IndexChatScreen />
        </Pressable>
        <Pressable key={"2"} style={{flex: 1}} onPress={handleClickOutside} disabled={!openDropdown}>
          <Updates />
        </Pressable>
        <Pressable key={"3"} style={{flex: 1}} onPress={handleClickOutside} disabled={!openDropdown}>
          <CommunitiesScreen />
        </Pressable>
        <Pressable key={"4"} style={{flex: 1}} onPress={handleClickOutside} disabled={!openDropdown}>
          <CallsScreen />
        </Pressable>
      </PagerView>
      
      <ThemeView style={{flex: 0, paddingBottom: 10}}>
        <Animated.View style={[{gap: 10}, rHelperStyle]}>
          {currentPage === 0 && 
            <>
              <Pressable style={{backgroundColor: "green", alignSelf: "flex-start", marginLeft: "auto", marginRight: 15, padding: 13, borderRadius: 10}}>
                  <AntDesign name="plussquare" size={25} color={"white"} />
              </Pressable>
              <Pressable onPress={() => router.push("/(app)/contact")} style={{backgroundColor: "green", alignSelf: "flex-start", marginLeft: "auto", marginRight: 15, padding: 13, borderRadius: 10}}>
                  <AntDesign name="circledown" size={25} color={"white"} />
              </Pressable>
            </>
          }
          {currentPage === 1 &&
            <>
              <HelperItem onPress={() => router.push("/(app)/status")}>
                <AntDesign name="edit" size={25} color={"white"} />
              </HelperItem>
              <HelperItem onPress={() => router.push("/(app)/camera")}>
                <AntDesign name="camera" size={25} color={"white"} />
              </HelperItem>
            </>
          }
          {currentPage === 3 && 
            <>
              <HelperItem onPress={() => {}}>
                <AntDesign name="phone" size={25} color={"white"} />
              </HelperItem>            
            </>
          }
        </Animated.View>
      </ThemeView>

      <View style={{flexDirection: "row", backgroundColor: "#0d142b"}}>
        {(['Chats', 'Updates', 'Community', 'Call'].map((item, index) => {
          const isActive = currentPage === index;
          const animatedStyle = getTabAnimatedStyle(isActive);

          return (
            <Pressable android_ripple={{color: "grey"}} onPress={() => navigateToPage(index)} style={{flex: 1, paddingVertical: 12, alignItems: "center"}}>
              <Animated.View style={[animatedStyle]}>
                {index === 0 && <Fontisto name="hipchat" size={24} color="white" />}
                {index === 1 && <MaterialIcons name="update" size={24} color="white" />}
                {index === 2 && (
                    <MaterialCommunityIcons
                        name="google-circles-communities"
                        size={24}
                        color="white"
                    />
                )}
                {index === 3 && <MaterialIcons name="call" size={24} color="white" />}
              </Animated.View>
              <Text style={{color: "white"}}>{item}</Text>
            </Pressable>
          )
        }))}
        {/* <Pressable android_ripple={{color: "grey"}} onPress={() => navigateToPage(0)} style={{flex: 1, paddingVertical: 12, alignItems: "center"}}>
          <Animated.View style={currentPage === 0 && {backgroundColor: "green", paddingHorizontal: 10, borderRadius: 10}}>
            <Fontisto name="hipchat" size={24} color={"white"} />
          </Animated.View>
          <Text style={{color: "white"}}>Chats</Text>
        </Pressable>
        <Pressable android_ripple={{color: "grey"}} onPress={() => navigateToPage(1)} style={{flex: 1, paddingVertical: 12, alignItems: "center"}}>
          <Animated.View style={currentPage === 1 && {backgroundColor: "green", paddingHorizontal: 10, borderRadius: 10}}>
            <MaterialIcons name="update" size={24} color={"white"} />
          </Animated.View>
          <Text style={{color: "white"}}>Updates</Text>
        </Pressable>
        <Pressable android_ripple={{color: "grey"}} onPress={() => navigateToPage(2)} style={{flex: 1, paddingVertical: 12, alignItems: "center"}}>
          <Animated.View style={currentPage === 2 && {backgroundColor: "green", paddingHorizontal: 10, borderRadius: 10, opacity: animateTab.value}}>
            <MaterialCommunityIcons name="google-circles-communities" size={24} color={"white"} />
          </Animated.View>
          <Text style={{color: "white"}}>Community</Text>
        </Pressable>
        <Pressable android_ripple={{color: "grey"}} onPress={() => navigateToPage(3)} style={{flex: 1, paddingVertical: 12, alignItems: "center"}}>
          <Animated.View style={currentPage === 3 && {backgroundColor: "green", paddingHorizontal: 10, borderRadius: 10}}>
            <MaterialIcons name="call" size={24} color={"white"} />
          </Animated.View>
          <Text style={{color: "white"}}>Call</Text>
        </Pressable> */}
      </View>
      {/* <Tab.Navigator>
        <Tab.Screen name='chat' component={IndexChatScreen} />
        <Tab.Screen name='updates' component={Updates} />
        <Tab.Screen name='communities' component={CommunitiesScreen} />
        <Tab.Screen name='calls' component={CallsScreen} />
      </Tab.Navigator> */}
    </>
  );
}
