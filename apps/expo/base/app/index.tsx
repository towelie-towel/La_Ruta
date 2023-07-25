import {
    Image,
    Dimensions,
    ActivityIndicator,
    Pressable,
    Animated,
    Keyboard,
} from "react-native";

import {
    DrawerContentScrollView,
    DrawerItem,
    createDrawerNavigator
} from '@react-navigation/drawer';

import { useUser } from '@clerk/clerk-expo';
import SignIn from "../components/Sign-in";

import { View, Text } from '../styles/Themed';
import { AntDesign, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../styles/Colors';

import { PressBtn } from '../styles/PressBtn';
import usePressIn from '../hooks/usePressIn';

import MapViewScreen from '../components/MapView';
import HistoryScreen from '../components/History';
import ConfigScreen from '../components/Config';
import CustomServiceScreen from '../components/CustomService';
import DeviceScreen from "../components/Device";
import PaymentScreen from '../components/Payment';
import NetworkScreen from "../components/Network";
import AdminScreen from "../components/Admin";

import { useColorScheme } from 'nativewind';
import SignUp from "../components/Sign-up";

import NetInfo from '@react-native-community/netinfo';

import { useAtom } from 'jotai'
import { profileRoleAtom, profileStateAtom } from "../hooks/useMapConnection";
import { signMethodAtom } from "../components/Sign-up";

void Image.prefetch("https://lh3.googleusercontent.com/a/AAcHTtfPgVic8qF8hDw_WPE80JpGOkKASohxkUA8y272Ow=s1000-c")

const { width } = Dimensions.get("window");

/* 

    wtf AIzaSyB-7B_Jh6ZXK9jWiY-VjXbvxhx-4QeXbJU

    wtf AIzaSyBVW-J8k9X8Y0gL5CK2Lhwz-w7Q2K5Yjn4

*/

const isAdmin = true;

export type DrawerParamList = {
    "Sign-In": undefined;
    "Sign-Up": undefined;
    "Map": undefined;
    "History": undefined;
    "Config": undefined;
    "Network": undefined;
    "Admin": undefined;
    "Device": undefined;
    "Service": undefined;
    "Payment": undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();


export default function Home() {

    const isLargeScreen = width >= 768;

    const { user, isLoaded, isSignedIn } = useUser();

    const { isConnected, isInternetReachable, type: connectionType } = NetInfo.useNetInfo()

    const [profileRole, setProfileRole] = useAtom(profileRoleAtom)
    const [profileState, _setProfileState] = useAtom(profileStateAtom)
    const [signMethod, _setSignMethod] = useAtom(signMethodAtom)

    const { colorScheme } = useColorScheme();

    const { animatedValue: pressMenuAnim, handlePressIn: pressInMenu, handlePressOut: pressOutMenu, isPressed: _isMenuPressed } = usePressIn()

    return (
        <Drawer.Navigator
            screenOptions={{

                drawerStyle: [{
                    width: isLargeScreen ? width - (width / 4) : width - (width / 2),
                    /* borderRightColor: colorScheme === 'dark' ? '#333333' : '#888888',
                    borderRightWidth: 2, */
                }],
                drawerType: isLargeScreen ? 'permanent' : 'back',
                overlayColor: 'transparent',
                header({ navigation }) {
                    return (
                        <Animated.View
                            className={'absolute top-9 left-10 max-[367px]:left-6'}
                            style={[
                                {
                                    transform: [
                                        {
                                            scale: pressMenuAnim
                                        }
                                    ]
                                },
                            ]}
                        >
                            <Pressable
                                onPressIn={() => {
                                    pressInMenu();
                                }}
                                onPressOut={() => {
                                    pressOutMenu();
                                }}
                                onPress={() => {
                                    navigation.openDrawer();
                                    Keyboard.dismiss()
                                }}
                                className={'p-3 rounded-full bg-transparent'}
                            >
                                <AntDesign
                                    name={'menuunfold'}
                                    size={30}
                                    color={Colors[colorScheme ?? 'light'].text}
                                />
                            </Pressable>
                        </Animated.View>
                    )
                },

            }}
            drawerContent={(props) => {
                const { navigation } = props;
                return (
                    <DrawerContentScrollView
                        contentContainerStyle={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
                        }} {...props}
                    >

                        <DrawerItem style={{
                            width: '100%',
                            marginHorizontal: 0,
                            marginVertical: 0,
                            borderRadius: 0
                        }} labelStyle={{
                            width: '100%',
                        }} pressColor={colorScheme === 'dark' ? 'white' : 'black'} icon={() => {

                            if (!isLoaded) {
                                return (
                                    <View className={'w-full flex-row justify-start items-center bg-transparent px-5 max-[376px]:px-3 max-[376px]:my-0'}>
                                        <ActivityIndicator
                                            size={'large'}
                                            animating
                                            color={colorScheme === 'dark' ? 'white' : 'black'}
                                        />
                                    </View>
                                )
                            }

                            if (!isSignedIn) {
                                return (
                                    <View className={'w-full flex-row justify-start items-center bg-transparent px-5 max-[376px]:px-3 max-[376px]:my-0'}>
                                        <FontAwesome
                                            name={colorScheme === 'light' ? 'user-circle' : 'user-circle-o'}
                                            size={30}
                                            color={Colors[colorScheme ?? 'light'].text}
                                        />
                                        <PressBtn onPress={() => {
                                            console.log(signMethod)
                                            navigation.navigate(signMethod !== 'undefined' ? "Sign-In" : "Sign-Up")
                                        }} className={`w-[60px] max-w-[120px] ml-5 bg-slate-500 dark:bg-slate-700 rounded h-8 justify-center items-center`} >
                                            <Text className={`text-white`}>{signMethod !== 'undefined' ? "Sign In" : "Sign Up"}</Text>
                                        </PressBtn>
                                    </View>
                                )
                            }

                            return (
                                <View className={`w-full justify-between flex-row items-center bg-transparent px-5 max-[376px]:px-3 max-[376px]:my-0`}>

                                    <View className="w-full bg-transparent flex-row items-center">
                                        <Image
                                            source={{
                                                uri: "https://lh3.googleusercontent.com/a/AAcHTtfPgVic8qF8hDw_WPE80JpGOkKASohxkUA8y272Ow=s1000-c"
                                            }}
                                            alt="Profile Image"
                                            className={`w-8 h-8 rounded-full`}
                                        />
                                        <Text className="ml-5">{`${user.firstName} ${user.lastName}`}</Text>
                                    </View>
                                    <View className="absolute items-center justify-center bg-transparent top-0 right-1 flex-row gap-2">
                                        <View style={{
                                            backgroundColor: isConnected && isInternetReachable ? 'rgb(74 222 128)' : 'rgb(248 113 113)'
                                        }} className="w-2 h-2 rounded-full"></View>
                                        {
                                            connectionType.includes('wifi')
                                                ? (
                                                    <MaterialIcons
                                                        name='wifi'
                                                        size={10}
                                                        color={Colors[colorScheme ?? 'light'].text}
                                                    />
                                                )
                                                : (
                                                    <MaterialIcons
                                                        name='network-cell'
                                                        size={10}
                                                        color={Colors[colorScheme ?? 'light'].text}
                                                    />
                                                )
                                        }
                                    </View>

                                </View>

                            )

                        }} label={'Sign-In'} onPress={() => { console.log(signMethod) }} />

                        <DrawerItem style={{
                            width: '100%',
                            marginHorizontal: 0,
                            marginVertical: 0,
                            borderRadius: 0
                        }} pressColor={colorScheme === 'dark' ? 'white' : 'black'} icon={() => {
                            return (
                                <View className={`w-full my-2 flex-row justify-start items-center bg-transparent px-5 max-[376px]:px-3 max-[376px]:my-0`}>
                                    <Ionicons
                                        name={colorScheme === 'light' ? 'md-map-outline' : 'md-map'}
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                    />
                                    <Text className="ml-5">Mapa</Text>
                                </View>
                            )
                        }} label={'Mapa'} onPress={() => { navigation.navigate('Map') }} />

                        <DrawerItem style={{
                            width: '100%',
                            marginHorizontal: 0,
                            marginVertical: 0,
                            borderRadius: 0,
                        }} pressColor={colorScheme === 'dark' ? 'white' : 'black'} icon={() => {
                            return (
                                <View className={`w-full my-2 flex-row justify-start items-center bg-transparent px-5 max-[376px]:px-3 max-[376px]:my-0`}>
                                    <MaterialIcons
                                        name='history'
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                    />
                                    <Text className="ml-5">History</Text>
                                </View>
                            )
                        }} label={'History'} onPress={() => { navigation.navigate('History') }} />

                        <DrawerItem style={{
                            width: '100%',
                            marginHorizontal: 0,
                            marginVertical: 0,
                            borderRadius: 0
                        }} pressColor={colorScheme === 'dark' ? 'white' : 'black'} icon={() => {
                            return (
                                <View className={`w-full my-2 flex-row justify-start items-center bg-transparent px-5 max-[376px]:px-3 max-[376px]:my-0`}>
                                    <FontAwesome
                                        name='gear'
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                    />
                                    <Text className="ml-6">Config</Text>
                                </View>
                            )
                        }} label={'Config'} onPress={() => { navigation.navigate('Config') }} />

                        <DrawerItem style={{
                            width: '100%',
                            marginHorizontal: 0,
                            marginVertical: 0,
                            borderRadius: 0
                        }} pressColor={colorScheme === 'dark' ? 'white' : 'black'} icon={() => {
                            return (
                                <View className={`w-full my-2 flex-row justify-start items-center bg-transparent px-5 max-[376px]:px-3 max-[376px]:my-0`}>
                                    <AntDesign
                                        name='customerservice'
                                        size={30}
                                        color={Colors[colorScheme ?? 'light'].text}
                                    />
                                    <Text className="ml-5">Service</Text>
                                </View>
                            )
                        }} label={'Service'} onPress={() => { navigation.navigate('Service') }} />

                        <DrawerItem style={{
                            width: '100%',
                            marginHorizontal: 0,
                            marginVertical: 0,
                            borderRadius: 0
                        }} pressColor={colorScheme === 'dark' ? 'white' : 'black'} icon={() => {
                            return (
                                <View className={`w-full my-2 flex-row justify-start items-center bg-transparent px-5 max-[376px]:px-3 max-[376px]:my-0`}>
                                    <FontAwesome5
                                        name='money-check'
                                        size={24}
                                        color={Colors[colorScheme ?? 'light'].text}
                                    />
                                    <Text className="ml-5">Payment</Text>
                                </View>
                            )
                        }} label={'Payment'} onPress={() => { navigation.navigate('Payment') }} />

                        {
                            isAdmin &&
                            <>
                                <DrawerItem style={{
                                    width: '100%',
                                    marginHorizontal: 0,
                                    marginVertical: 0,
                                    borderRadius: 0
                                }} pressColor={colorScheme === 'dark' ? 'white' : 'black'} icon={() => {
                                    return (
                                        <View className={`w-full my-2 flex-row justify-start items-center bg-transparent px-5 max-[376px]:px-3 max-[376px]:my-0`}>
                                            <MaterialIcons
                                                name='admin-panel-settings'
                                                size={30}
                                                color={Colors[colorScheme ?? 'light'].text}
                                            />
                                            <Text className="ml-5">Admin Info</Text>
                                        </View>
                                    )
                                }} label={'Admin'} onPress={() => { navigation.navigate('Admin') }} />

                                <DrawerItem style={{
                                    width: '100%',
                                    marginHorizontal: 0,
                                    marginVertical: 0,
                                    borderRadius: 0
                                }} pressColor={colorScheme === 'dark' ? 'white' : 'black'} icon={() => {
                                    return (
                                        <View className={`w-full my-2 flex-row justify-start items-center bg-transparent px-5 max-[376px]:px-3 max-[376px]:my-0`}>
                                            <MaterialIcons
                                                name='perm-device-information'
                                                size={30}
                                                color={Colors[colorScheme ?? 'light'].text}
                                            />
                                            <Text className="ml-5">Device Info</Text>
                                        </View>
                                    )
                                }} label={'Device'} onPress={() => { navigation.navigate('Device') }} />

                                <DrawerItem style={{
                                    width: '100%',
                                    marginHorizontal: 0,
                                    marginVertical: 0,
                                    borderRadius: 0
                                }} pressColor={colorScheme === 'dark' ? 'white' : 'black'} icon={() => {
                                    return (
                                        <View className={`w-full my-2 flex-row justify-start items-center bg-transparent px-5 max-[376px]:px-3 max-[376px]:my-0`}>
                                            <MaterialIcons
                                                name='network-cell'
                                                size={30}
                                                color={Colors[colorScheme ?? 'light'].text}
                                            />
                                            <Text className="ml-5">Network</Text>
                                        </View>
                                    )
                                }} label={'Network'} onPress={() => { navigation.navigate('Network') }} />
                            </>
                        }


                        <DrawerItem style={{
                            width: '100%',
                            marginHorizontal: 0,
                            marginVertical: 0,
                            position: 'absolute',
                            bottom: 0,
                            borderRadius: 0
                        }} pressColor={colorScheme === 'dark' ? 'white' : 'black'} icon={() => (
                            <View className="w-full flex-row justify-around items-center bg-transparent">
                                <PressBtn onPress={() => {
                                    void setProfileRole('client')
                                }}  >
                                    <AntDesign
                                        name='instagram'
                                        size={25}
                                        color={Colors[colorScheme ?? 'light'].text}
                                    />
                                </PressBtn><PressBtn onPress={() => {
                                    void setProfileRole('taxi')
                                }}  >
                                    <AntDesign
                                        name='facebook-square'
                                        size={25}
                                        color={Colors[colorScheme ?? 'light'].text}
                                    />
                                </PressBtn><PressBtn onPress={() => {
                                    console.log("profileRole", { profileRole, profileState })
                                }}  >
                                    <AntDesign
                                        name='twitter'
                                        size={25}
                                        color={Colors[colorScheme ?? 'light'].text}
                                    />
                                </PressBtn>
                            </View>
                        )} label={'Social Networks'} onPress={() => { console.log("Social Networks") }} />

                    </DrawerContentScrollView>
                )
            }}
            initialRouteName="Map"
        >

            <Drawer.Screen name="Sign-In" component={SignIn} />
            <Drawer.Screen name="Sign-Up" component={SignUp} />
            <Drawer.Screen name="Map" component={MapViewScreen} />
            <Drawer.Screen name="History" component={HistoryScreen} />
            <Drawer.Screen name="Config" component={ConfigScreen} />
            <Drawer.Screen name="Network" component={NetworkScreen} />
            <Drawer.Screen name="Admin" component={AdminScreen} />
            <Drawer.Screen name="Device" component={DeviceScreen} />
            <Drawer.Screen name="Service" component={CustomServiceScreen} />
            <Drawer.Screen name="Payment" component={PaymentScreen} />

        </Drawer.Navigator>
    );
}
