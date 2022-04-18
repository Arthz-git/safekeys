//Bibliotecas
import React, {
	useState,
	useRef,
	useEffect
} from 'react'
import {
	StyleSheet,
	View,
	Text,
	Animated,
	TouchableOpacity
} from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'

//Components
import { BouncingButton } from './bouncingButton'

//hooks

//utils
import { theme } from '../global/theme'
import { normalize } from '../global/utils/normalize'

//interfaces
import { CardComponentProps } from '../models/card'

//constants
const AnimatedIcon = Animated.createAnimatedComponent(Icon)
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

//Card
export function Card({
	item: {
		id,
		name,
		password,
		favorite,
		observation,
		created_at
	},
	onMarkAsFavorite,
	onEditButtonPress
}: CardComponentProps) {

	const [visible, setVisible] = useState(false)

	const passwordVisibility = useRef(new Animated.Value(0)) //0 = Não visível | 100 = visível

	function eyeButtonPress() {
		setVisible(!visible)
	}

	function showPassword() {
		Animated.timing(passwordVisibility.current, {
			toValue: 100,
			duration: 500,
			useNativeDriver: false
		}).start()
	}

	function hidePassword() {
		Animated.timing(passwordVisibility.current, {
			toValue: 0,
			duration: 500,
			useNativeDriver: false
		}).start()
	}

	const passwordAnimatedStyle = {
		opacity: passwordVisibility.current.interpolate({
			inputRange: [0, 100],
			outputRange: [0, 1]
		})
	}

	const passwordWrapperAnimatedStyle = {
		backgroundColor: passwordVisibility.current.interpolate({
			inputRange: [0, 100],
			outputRange: [theme.colors.secondary, theme.colors.branco]
		})
	}

	function copyPasswordToClipboard() {
		Clipboard.setString(password)
	}

	useEffect(() => {
		if (visible) {
			showPassword()
		}
		else {
			hidePassword()
		}
	}, [visible])

	return (
		<View style={styles.main}>
			<View style={styles.card}>
				<Text style={styles.cardName}>
					{name}
				</Text>

				<AnimatedTouchableOpacity
					style={[
						styles.cardPasswordWrapper,
						passwordWrapperAnimatedStyle
					]}
					activeOpacity={0.8}
					onPress={copyPasswordToClipboard}
				>
					<Animated.Text
						style={[styles.cardPassword, passwordAnimatedStyle]}
					>
						{password}
					</Animated.Text>

					<AnimatedIcon
						name='copy'
						style={[styles.copyPasswordIcon, passwordAnimatedStyle]}
					/>
				</AnimatedTouchableOpacity>

				{observation !== '' &&
					<Text style={styles.observation}>
						{observation}
					</Text>
				}

				<Text style={styles.details}>
					Criado {created_at}
				</Text>
			</View>

			<View style={styles.actionButtonsWrapper}>
				<BouncingButton
					style={styles.actionButton}
					onPress={() => onEditButtonPress(id)}
				>
					<Icon
						name='edit'
						style={styles.eyeIcon}
					/>
				</BouncingButton>

				<BouncingButton
					style={[
						styles.actionButton,
						favorite && styles.starIconMarked
					]}
					onPress={() => onMarkAsFavorite(id)}
				>
					<Icon
						name='star'
						style={styles.eyeIcon}
					/>
				</BouncingButton>

				<BouncingButton
					style={[
						styles.actionButton,
						styles.actionButtonMargin,
						visible && styles.eyeButtonPressed
					]}
					onPress={eyeButtonPress}
				>
					<Icon
						name={visible ? 'eye-off' : 'eye'}
						style={[
							styles.eyeIcon,
							visible && styles.eyeIconPressed
						]}
					/>
				</BouncingButton>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	card: {
		flex: 1,

		minHeight: normalize(130),

		backgroundColor: theme.colors.branco,

		paddingVertical: 6,
		paddingHorizontal: 12,
		marginRight: 6,

		elevation: 4,

		borderRadius: 6
	},
	cardName: {
		fontFamily: theme.fonts.livvic_400,
		fontSize: normalize(20),
		color: theme.colors.preto,

		marginBottom: 10
	},
	cardPassword: {
		fontFamily: theme.fonts.livvic_500,
		fontSize: normalize(26),
		color: theme.colors.preto
	},
	cardPasswordWrapper: {
		justifyContent: 'center',
		alignItems: 'center',

		borderRadius: 4,

		paddingVertical: 6,
		marginBottom: 10
	},
	copyPasswordIcon: {
		fontSize: normalize(24),
		color: theme.colors.secondary,

		position: 'absolute',
		left: 5
	},
	actionButtonsWrapper: {},
	actionButton: {
		flex: 1,
		width: normalize(70),

		backgroundColor: theme.colors.branco,

		justifyContent: 'center',
		alignItems: 'center',

		borderRadius: 6,

		marginBottom: 6,

		elevation: 4
	},
	eyeIcon: {
		fontSize: normalize(20),
		color: theme.colors.preto
	},
	eyeButtonPressed: {
		backgroundColor: theme.colors.primary
	},
	eyeIconPressed: {
		color: theme.colors.branco
	},
	actionButtonMargin: {
		marginBottom: 0
	},
	starIconMarked: {
		backgroundColor: theme.colors.highlight
	},
	observation: {
		fontFamily: theme.fonts.livvic_300,
		color: theme.colors.preto,
		fontSize: normalize(16),

		marginBottom: 5
	},
	details: {
		fontFamily: theme.fonts.livvic_300,
		color: theme.colors.secondary,
		fontSize: normalize(16)
	}
})