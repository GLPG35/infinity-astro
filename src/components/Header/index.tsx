import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { motion, AnimatePresence } from 'motion/react'
import { useSiteStore } from '../../store/useSiteStore'
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx'
import { languages } from '../../i18n/ui'
import { getLangFromUrl, useTranslatedPath, useTranslations } from '../../i18n/utils'

const Header = ({ url, location }: { url: URL, location: string }) => {
	const dark = useSiteStore(state => state.dark)
	const inView = useSiteStore(state => state.inView)
	const setDark = useSiteStore(state => state.setDark)
	const [viewLanguage, setViewLanguage] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)
	const currentLang = getLangFromUrl(url)
	const t = useTranslations(currentLang)
	const translatePath = useTranslatedPath(currentLang)
	const trimLocation = location.replace(`/${currentLang}`, '')

	useEffect(() => {
		if (location !== '/') {
			setDark('page')
		}
	}, [])
	
	return (
		<div className={`${styles.header} ${!dark ? '' : dark == 'home' ? styles.dark : styles.darkPage} ${trimLocation === '/' && inView ? styles.opacity : ''}`}>
			<div className={styles.headerWrapper}>
				<motion.div className={styles.headerBackground}></motion.div>
				<button className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
					{menuOpen ? <RxCross1 /> : <RxHamburgerMenu />}
				</button>
				<nav className={menuOpen ? styles.active : ''}>
					<ul>
						<li><a href={translatePath('/', currentLang)} onClick={() => menuOpen && setMenuOpen(false)}>{t('nav.home')}</a></li>
						<li><a href={translatePath('/never7', currentLang)} onClick={() => menuOpen && setMenuOpen(false)}>Never7</a></li>
						<li><a href={translatePath('/ever17', currentLang)} onClick={() => menuOpen && setMenuOpen(false)}>Ever17</a></li>
						<li><a href={translatePath('/remember11', currentLang)} onClick={() => menuOpen && setMenuOpen(false)}>Remember11</a></li>
						<li><a href={translatePath('/more', currentLang)} onClick={() => menuOpen && setMenuOpen(false)}>{t('nav.more')}</a></li>
					</ul>
				</nav>
				<div className={styles.languageWrapper}>
					<div className={styles.language} onClick={() => setViewLanguage(!viewLanguage)}>
						{currentLang}
					</div>
					<AnimatePresence>
						{viewLanguage &&
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.list}>
								{Object.entries(languages).map(([lang, label]) => (
									<li className={lang === currentLang ? styles.active : ''}>
										<a href={`${translatePath(trimLocation, lang)}`}>{label}</a>
									</li>
								))}
							</motion.div>
						}
					</AnimatePresence>
				</div>
			</div>
		</div>
	)
}

export default Header
