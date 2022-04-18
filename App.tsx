import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import AppLoading from 'expo-app-loading'
import { setBackgroundColorAsync } from 'expo-navigation-bar'

import {
	useFonts,
	Livvic_300Light,
	Livvic_400Regular,
	Livvic_500Medium,
	Livvic_700Bold
} from '@expo-google-fonts/livvic'

import { theme } from './src/global/theme'
import { Home } from './src/screens/home'

export default function App() {

	const [fontsLoaded] = useFonts({
		Livvic_300Light,
		Livvic_400Regular,
		Livvic_500Medium,
		Livvic_700Bold
	})

	if (!fontsLoaded) {
		return <AppLoading />
	}

	async function lockScreen() {
		await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
	}

	async function navigationBarColor() {
		await setBackgroundColorAsync(theme.colors.primary)
	}

	lockScreen()
	navigationBarColor()

	return (
		<>
			<StatusBar
				translucent
				barStyle='light-content'
				backgroundColor={theme.colors.primary}
			/>

			<Home />
		</>
	)
}
