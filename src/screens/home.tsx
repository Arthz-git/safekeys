//Bibliotecas
import React, {
	useState,
	useEffect
} from 'react'
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	ActivityIndicator
} from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Feather as Icon } from '@expo/vector-icons'

//assets
import LockSvg from '../assets/images/lock-icon.svg'

//Components
import { BouncingButton } from '../components/bouncingButton'
import { Input } from '../components/input'
import { Card } from '../components/card'
import { ModalAdd } from '../components/modalAdd'

//hooks

//utils
import { theme } from '../global/theme'
import { normalize } from '../global/utils/normalize'
import * as database from '../database'

//constants

//interfaces
import { CardAtributes } from '../models/card'
import { ModalSaveAtributes, ModalUpdateAtributes } from '../models/modalAdd'

//screens
export function Home() {

	const [search, setSearch] = useState('')
	const [listaCards, setListaCards] = useState<CardAtributes[]>([])
	const [showModalAdd, setShowModalAdd] = useState(false)
	const [isListLoading, setListLoading] = useState(true)
	const [updateData, setUpdateData] = useState<ModalUpdateAtributes>({} as ModalUpdateAtributes)

	function onAddButtonPress() {
		setUpdateData({} as ModalUpdateAtributes)
		setShowModalAdd(true)
	}

	async function savePassword(objeto: ModalSaveAtributes) {
		try {
			await database.insertNewPassword(objeto)

			getAllPasswords()
		}
		catch (err) {
			console.log(err)
		}
	}

	async function getAllPasswords() {
		try {
			const lista = await database.getAllPasswords()

			setListaCards(lista.sort(ordenarFavoritos))
		}
		catch (err) {
			console.log(err)
		}
		finally {
			setListLoading(false)
		}
	}

	function ordenarFavoritos(a: CardAtributes, b: CardAtributes) {
		const _a = a.favorite ? 0 : 1
		const _b = b.favorite ? 0 : 1

		return _a - _b
	}

	function editButtonPress(id: string) {
		const objeto = listaCards.find(item => item.id === id)

		if (objeto) {
			setUpdateData(objeto)
			setShowModalAdd(true)
		}
	}

	async function markAsFavorite(id: string) {
		await database.markAsFavorite(id)

		getAllPasswords()
	}

	async function updatePassword(objeto: ModalUpdateAtributes) {
		await database.updatePassword(objeto)

		getAllPasswords()
	}

	function getAllPasswordsFiltered() {
		const lista = listaCards.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

		setListaCards(lista)
	}

	useEffect(() => {
		getAllPasswords()
	}, [])

	useEffect(() => {
		if (!search) {
			getAllPasswords()
		}
		else {
			getAllPasswordsFiltered()
		}
	}, [search])

	return (
		<View style={styles.main}>
			<ModalAdd
				visible={showModalAdd}
				onRequestClose={() => setShowModalAdd(false)}
				//save
				onSavePassword={objeto => savePassword(objeto)}
				//update
				onUpdatePassword={objeto => updatePassword(objeto)}
				updateData={updateData}
			/>

			<View style={styles.header}>
				<View style={styles.titleContainer}>
					<View style={styles.titleWrapper}>
						<View style={styles.titleIconWrapper}>
							<LockSvg
								height={normalize(28)}
								width={normalize(28)}
							/>
						</View>

						<Text style={styles.title}>
							Safekeys
						</Text>
					</View>

					<View style={styles.accountWrapper}>
						<Text style={styles.accountText}>
							Você 😊
						</Text>

						<Icon
							name='user'
							style={styles.accountIcon}
						/>
					</View>
				</View>

				<View style={styles.inputWrapper}>
					<Input
						value={search}
						onChangeText={setSearch}
						placeholder='Procurar'
					/>
				</View>
			</View>

			<View style={styles.listHeader}>
				<BouncingButton
					style={styles.addButton}
					onPress={onAddButtonPress}
				>
					<Text style={styles.addButtonText}>
						Nova senha
					</Text>

					<Icon
						name='plus-square'
						style={styles.addButtonIcon}
					/>
				</BouncingButton>

				{search === '' ?
					<Text style={styles.totalText}>
						Total de {listaCards.length} {listaCards.length === 1 ? 'senha' : 'senhas'}
					</Text>
					:
					<Text style={styles.totalText}>
						Encontrados {listaCards.length} {listaCards.length === 1 ? 'senha' : 'senhas'}
					</Text>
				}
			</View>

			{isListLoading ?
				<ActivityIndicator
					size='large'
					color={theme.colors.primary}
				/>
				:
				<FlatList
					data={listaCards}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.listContainer}
					keyExtractor={item => item.id}
					ItemSeparatorComponent={() => <View style={styles.cardDivider} />}
					renderItem={({ item }) => (
						<Card
							item={item}
							onMarkAsFavorite={id => markAsFavorite(id)}
							onEditButtonPress={id => editButtonPress(id)}
						/>
					)}
				/>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		flex: 1,

		backgroundColor: theme.colors.background,

		marginTop: getStatusBarHeight()
	},
	header: {
		backgroundColor: theme.colors.primary,

		justifyContent: 'space-around',

		height: normalize(175)
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		paddingHorizontal: 12
	},
	titleWrapper: {
		flexDirection: 'row',
	},
	titleIconWrapper: {
		justifyContent: 'center',
		alignItems: 'center',

		height: normalize(35),
		width: normalize(35),

		backgroundColor: theme.colors.secondary_opac_50,

		borderRadius: 999,

		marginRight: 6,
		padding: 6,
		paddingTop: 9
	},
	title: {
		fontFamily: theme.fonts.livvic_500,
		fontSize: normalize(22),
		color: theme.colors.background
	},
	accountWrapper: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	accountText: {
		fontFamily: theme.fonts.livvic_500,
		fontSize: normalize(16),
		color: theme.colors.background
	},
	accountIcon: {
		fontSize: normalize(16),
		color: theme.colors.background,

		backgroundColor: theme.colors.secondary_opac_50,

		borderRadius: 999,

		marginLeft: 6,
		padding: 6
	},
	inputWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		paddingHorizontal: 12
	},
	cardDivider: {
		marginVertical: 10
	},
	listContainer: {
		padding: 12
	},
	listHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		paddingHorizontal: 12,
		marginVertical: 12
	},
	addButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		backgroundColor: theme.colors.secondary,

		paddingVertical: 10,
		paddingHorizontal: 24,

		borderRadius: 4,

		elevation: 4
	},
	addButtonIcon: {
		color: theme.colors.preto,
		fontSize: normalize(20),

		marginLeft: 10
	},
	addButtonText: {
		fontSize: normalize(16),
		color: theme.colors.preto,
		fontFamily: theme.fonts.livvic_400
	},
	totalText: {
		fontFamily: theme.fonts.livvic_300,
		fontSize: normalize(16),
		color: theme.colors.preto
	}
})