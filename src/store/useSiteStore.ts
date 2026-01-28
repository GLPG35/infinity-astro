import { persistentAtom } from '@nanostores/persistent'
import { atom } from 'nanostores'

export const $language = persistentAtom<'en'|'es'>('language', 'en')

export const setLanguage = (language: 'en'|'es') => {
	$language.set(language)
}

export const $inView = atom(false)

export const setInView = (inView: boolean) => {
	$inView.set(inView)
}

export const $dark = atom<'home'|'page'|false>(false)

export const setDark = (dark: 'home'|'page'|false) => {
	$dark.set(dark)
}