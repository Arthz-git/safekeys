//Bibliotecas
import React, { useRef } from 'react'
import {
	StyleSheet,
	TextInput,
	Animated
} from 'react-native'

//Componentes

//hooks

//utils
import { theme } from '../global/theme'
import { normalize } from '../global/utils/normalize'

//interfaces
import { InputProps } from '../models/input'

//constants
const AnimatedInput = Animated.createAnimatedComponent(TextInput)

//Input
export function Input({
	onBlur,
	onFocus,
	style,
	...rest
}: InputProps) {

	const focusAnimation = useRef(new Animated.Value(0))

	function customOnBlur() {
		onBlurAnimation()

		if (onBlur) {
			onBlur({} as any)
		}
	}

	function customOnFocus() {
		onFocusAnimation()

		if (onFocus) {
			onFocus({} as any)
		}
	}

	function onFocusAnimation() {
		Animated.timing(focusAnimation.current, {
			toValue: 100,
			duration: 500,
			useNativeDriver: false
		}).start()
	}

	function onBlurAnimation() {
		Animated.timing(focusAnimation.current, {
			toValue: 0,
			duration: 500,
			useNativeDriver: false
		}).start()
	}

	const focusAnimatedStyle = {
		borderWidth: focusAnimation.current.interpolate({
			inputRange: [0, 100],
			outputRange: [0, 3]
		})
	}

	return (
		<AnimatedInput
			style={[
				styles.input,
				style,
				focusAnimatedStyle
			]}
			onFocus={customOnFocus}
			onBlur={customOnBlur}
			{...rest}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		flex: 1,

		minHeight: normalize(45),

		backgroundColor: theme.colors.branco,

		fontFamily: theme.fonts.livvic_400,
		color: theme.colors.preto,
		fontSize: normalize(18),

		paddingHorizontal: 12,

		borderColor: theme.colors.highlight,
		borderRadius: 4,

		elevation: 4
	}
})