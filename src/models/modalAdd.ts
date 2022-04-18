import { ModalProps } from 'react-native'

interface ModalAddProps extends ModalProps {
	onSavePassword: (objeto: ModalSaveAtributes) => void
	onUpdatePassword: (objeto: ModalUpdateAtributes) => void
	updateData: ModalUpdateAtributes
}

interface ModalSaveAtributes {
	name: string
	password: string
	observation?: string
}

interface ModalUpdateAtributes {
	id: string
	name: string
	password: string
	observation?: string
}

export {
	ModalAddProps,
	ModalSaveAtributes,
	ModalUpdateAtributes
}