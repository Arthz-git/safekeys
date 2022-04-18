//Bibliotecas
import React, { useRef } from 'react'
import {
	StyleSheet,
	Pressable,
	Animated
} from 'react-native'

//Componentes

//hooks

//utils

//interfaces
import { BouncingButtonProps } from '../models/boucingButton'

//constants
const BouncingButtonComponent = Animated.createAnimatedComponent(Pressable)

//BouncingButton
export function BouncingButton({
	onPressIn,
	onPress,
	style,
	children
}: BouncingButtonProps) {

	const bouncingAnimation = useRef(new Animated.Value(100))

	function onPressBouncingButton() {
		afterPress()

		if (onPress) {
			onPress({} as any)
		}
	}

	function onPressInBouncingButton() {
		beforePress()

		if (onPressIn) {
			onPressIn({} as any)
		}
	}

	function beforePress() {
		Animated.timing(bouncingAnimation.current, {
			toValue: 0,
			duration: 50,
			useNativeDriver: true
		}).start()
	}

	function afterPress() {
		Animated.spring(bouncingAnimation.current, {
			toValue: 100,
			speed: 12,
			bounciness: 18,
			useNativeDriver: true
		}).start()
	}

	const bouncingStyle = {
		transform: [{
			scale: bouncingAnimation.current.interpolate({
				inputRange: [0, 100],
				outputRange: [0.9, 1]
			})
		}]
	}

	return (
		<BouncingButtonComponent
			style={[style, bouncingStyle]}
			onPress={onPressBouncingButton}
			onPressIn={onPressInBouncingButton}
		>
			{children}
		</BouncingButtonComponent>
	)
}

const styles = StyleSheet.create({
})