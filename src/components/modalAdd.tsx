//Bibliotecas
import React, {
	useState
} from 'react'
import {
	StyleSheet,
	View,
	Text,
	Modal,
	TouchableOpacity,
	KeyboardAvoidingView
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'

//components
import { Input } from './input'
import { BouncingButton } from './bouncingButton'

//hooks

//utils
import { theme } from '../global/theme'
import { normalize } from '../global/utils/normalize'

//interfaces
import { ModalAddProps } from '../models/modalAdd'

//contants
const overlayColors = [
	'rgba(0, 0, 0, 0)',
	'rgba(0, 0, 0, 0.1)',
	'rgba(0, 0, 0, 0.2)',
	'rgba(0, 0, 0, 0.3)',
	'rgba(0, 0, 0, 0.4)'
]

//ModalAdd
export function ModalAdd({
	onSavePassword,
	onRequestClose,
	onUpdatePassword,
	updateData,
	...rest
}: ModalAddProps) {

	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [observation, setObservation] = useState('')

	function handleCloseModal() {
		resetForm()

		if (onRequestClose) {
			onRequestClose()
		}
	}

	function generatePassword() {
		const _password = Math.random().toString(36).slice(-10)

		setPassword(_password)
	}

	function onSaveButtonPress() {
		if (validarForm()) {
			if (updateData.name) {
				updatePassword()
			}
			else {
				savePassword()
			}

			handleCloseModal()
		}
	}

	function validarForm() {
		if (name && password) {
			return true
		}

		else return false
	}

	function savePassword() {
		const objeto = {
			name: name.trim(),
			password: password.trim().toLowerCase(),
			observation: observation.trim()
		}

		onSavePassword(objeto)
		handleCloseModal()
	}

	function updatePassword() {
		const objeto = {
			id: updateData.id,
			name: name.trim(),
			password: password.trim().toLowerCase(),
			observation: observation.trim()
		}

		onUpdatePassword(objeto)
		handleCloseModal()
	}

	function resetForm() {
		setName('')
		setPassword('')
		setObservation('')
	}

	function loadData() {
		if (updateData.name) {
			setName(updateData.name)
			setPassword(updateData.password)
			setObservation(updateData.observation || '')
		}
	}

	return (
		<Modal
			transparent={true}
			statusBarTranslucent={true}
			animationType='slide'
			onRequestClose={handleCloseModal}
			onShow={loadData}
			{...rest}
		>
			<TouchableOpacity
				style={styles.main}
				activeOpacity={1}
				onPress={handleCloseModal}
			>
				<LinearGradient
					style={styles.overlay}
					colors={overlayColors}
				>
				</LinearGradient>
			</TouchableOpacity>

			<KeyboardAvoidingView behavior='padding' style={styles.modalBody}>
				<View style={styles.bar} />

				<View style={styles.form}>
					<Text style={styles.label}>
						{updateData.name ?
							'Deseja atualizar o nome?'
							:
							'Insira o nome da sua nova senha'
						}
					</Text>

					<View style={styles.inputFix}>
						<Input
							value={name}
							onChangeText={setName}
							placeholder='Nome'
							style={styles.inputForm}
						/>
					</View>

					<Text style={styles.label}>
						{updateData.name ?
							'Deseja atualizar a senha?'
							:
							'Insira a senha que devemos guardar'
						}
					</Text>

					<View style={[styles.inputFix, styles.inputForm]}>
						<Input
							value={password}
							onChangeText={setPassword}
							placeholder='Senha'
						/>

						<BouncingButton
							style={styles.randomButton}
							onPress={generatePassword}
						>
							<Icon
								name='dice-multiple'
								style={styles.randomButtonIcon}
							/>
						</BouncingButton>
					</View>

					<Text style={styles.label}>
						{updateData.name ?
							'Deseja atualizar a observação?'
							:
							'Deseja adicionar alguma observação à ela?'
						}
					</Text>

					<View style={styles.inputFix}>
						<Input
							value={observation}
							onChangeText={setObservation}
							placeholder='Observação'
							multiline={true}
							style={styles.inputForm}
						/>
					</View>

					<View style={styles.submitButtons}>
						<BouncingButton
							style={styles.submitButton}
							onPress={onSaveButtonPress}
						>
							<Text style={styles.submitButtonText}>
								Salvar
							</Text>
						</BouncingButton>

						<BouncingButton
							style={styles.cancelButton}
							onPress={handleCloseModal}
						>
							<Text style={styles.cancelButtonText}>
								Cancelar
							</Text>
						</BouncingButton>
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1
	},
	overlay: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	modalBody: {
		backgroundColor: theme.colors.background
	},
	bar: {
		width: normalize(40),
		height: normalize(4),

		borderRadius: 10,

		backgroundColor: theme.colors.secondary,

		alignSelf: 'center',

		marginVertical: 15
	},
	form: {
		paddingHorizontal: 12
	},
	label: {
		fontFamily: theme.fonts.livvic_400,
		color: theme.colors.preto,
		fontSize: normalize(16)
	},
	inputFix: {
		flexDirection: 'row'
	},
	inputForm: {
		marginTop: 5,
		marginBottom: 10
	},
	randomButton: {
		height: normalize(45),
		width: normalize(45),

		justifyContent: 'center',
		alignItems: 'center',

		borderRadius: 4,

		elevation: 4,

		backgroundColor: theme.colors.secondary,

		marginLeft: 6
	},
	randomButtonIcon: {
		fontSize: normalize(24),
		color: theme.colors.preto
	},
	submitButtons: {
		marginVertical: 20
	},
	submitButton: {
		justifyContent: 'center',
		alignItems: 'center',

		backgroundColor: theme.colors.secondary,

		borderRadius: 4,

		paddingVertical: 10,
		marginBottom: 10
	},
	submitButtonText: {
		fontFamily: theme.fonts.livvic_400,
		color: theme.colors.preto,
		fontSize: normalize(18)
	},
	cancelButton: {
		justifyContent: 'center',
		alignItems: 'center',

		borderColor: theme.colors.secondary,
		borderWidth: 1,
		borderRadius: 4,

		paddingVertical: 8
	},
	cancelButtonText: {
		fontFamily: theme.fonts.livvic_400,
		color: theme.colors.preto,
		fontSize: normalize(18)
	}
})