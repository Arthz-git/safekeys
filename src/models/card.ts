interface CardAtributes {
	id: string
	name: string
	password: string
	favorite: boolean
	observation?: string
	created_at: string
	updated_at?: string
}

interface CardComponentProps {
	item: CardAtributes
	onMarkAsFavorite: (id: string) => void
	onEditButtonPress: (id: string) => void
}

export {
	CardAtributes,
	CardComponentProps
}