import { persistentAtom } from '@nanostores/persistent'
import { create } from 'zustand'

export const $language = persistentAtom<'en'|'es'>('language', 'en')

export const setLanguage = (language: 'en'|'es') => {
	$language.set(language)
}

interface State {
	inView: boolean,
	setInView: (inView: boolean) => void,
	dark: 'home'|'page'|false,
	setDark: (dark: 'home'|'page'|false) => void
}

export const useSiteStore = create<State>()((set) => ({
	inView: false,
	dark: false,
	setInView: (inView) => {
		set({ inView })
	},
	setDark: (dark) => {
		set({ dark })
	}
}))