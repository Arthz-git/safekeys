//Bibliotecas
import { format } from 'date-fns'
import uuid from 'react-native-uuid'
import pt from 'date-fns/locale/pt-BR'
import AsyncStorage from '@react-native-async-storage/async-storage'

//interfaces
import { ModalSaveAtributes, ModalUpdateAtributes } from '../models/modalAdd'
import { CardAtributes } from '../models/card'

const safeKEY = '@safekeys'

async function insertNewPassword(objeto: ModalSaveAtributes) {
	try {
		const newObjeto = {
			...objeto,
			id: uuid.v4(),
			favorite: false,
			created_at: format(new Date(), "dd/MM/yyyy 'às' hh:mm:ss", { locale: pt }),
			updated_at: 'never updated'
		}

		const store = await AsyncStorage.getItem(`${safeKEY}/keys`)
		const JSONStore = store ? JSON.parse(store) : []

		JSONStore.push(newObjeto)

		await AsyncStorage.setItem(`${safeKEY}/keys`, JSON.stringify(JSONStore))
	}
	catch (err) {
		throw {
			erro: err,
			message: 'Não foi possível salvar os dados'
		}
	}
}

async function getAllPasswords() {
	try {
		const store = await AsyncStorage.getItem(`${safeKEY}/keys`)
		const JSONStore = store ? JSON.parse(store) : []

		return JSONStore as CardAtributes[]
	}
	catch (err) {
		throw {
			erro: err,
			message: 'Não foi possível carregar os dados'
		}
	}
}

async function updatePassword(newData: ModalUpdateAtributes) {
	try {
		const store = await getAllPasswords()

		const newLista = store.map(item => {
			if (item.id === newData.id) {
				return {
					...item,
					name: newData.name,
					password: newData.password,
					observation: newData.observation,
					updated_at: format(new Date(), "dd/MM/yyyy 'às' hh:mm:ss", { locale: pt })
				}
			}
			else {
				return item
			}
		})

		await AsyncStorage.setItem(`${safeKEY}/keys`, JSON.stringify(newLista))
	}
	catch (err) {
		throw {
			erro: err,
			message: 'Não foi possível atualizar os dados'
		}
	}
}

async function markAsFavorite(id: string) {
	try {
		const store = await getAllPasswords()

		const newLista = store.map(item => {
			if (item.id === id) {
				return {
					...item,
					favorite: !item.favorite
				}
			}
			else {
				return item
			}
		})

		await AsyncStorage.setItem(`${safeKEY}/keys`, JSON.stringify(newLista))
	}
	catch (err) {
		throw {
			erro: err,
			message: 'Não foi possível atualizar os dados'
		}
	}
}

export {
	insertNewPassword,
	getAllPasswords,
	updatePassword,
	markAsFavorite
}