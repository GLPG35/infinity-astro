import { useState, type ChangeEvent } from 'react'
import styles from './styles.module.scss'
import { motion, AnimatePresence } from 'motion/react'
import { $language, setLanguage, useSiteStore } from '../../store/useSiteStore'
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx'
import { useSsrStore } from '../../hooks/useSsrStore'

const Header = ({ location }: { location: string }) => {
	const dark = useSiteStore(state => state.dark)
	const inView = useSiteStore(state => state.inView)
	const language = useSsrStore($language)
	const [viewLanguage, setViewLanguage] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)
	
	const handleLanguage = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget
		setLanguage(value as 'es'|'en')

		setViewLanguage(false)
	}
	
	return (
		<div className={`${styles.header} ${!dark ? '' : dark == 'home' ? styles.dark : styles.darkPage} ${location === '/' && inView ? styles.opacity : ''}`}>
			<div className={styles.headerWrapper}>
				<motion.div className={styles.headerBackground}></motion.div>
				<button className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
					{menuOpen ? <RxCross1 /> : <RxHamburgerMenu />}
				</button>
				<nav className={menuOpen ? styles.active : ''}>
					<ul>
						<li><a href='/' onClick={() => menuOpen && setMenuOpen(false)}>{language == 'en' ? 'Home' : language == 'es' && 'Inicio'}</a></li>
						<li><a href='/never7' onClick={() => menuOpen && setMenuOpen(false)}>Never7</a></li>
						<li><a href='/ever17' onClick={() => menuOpen && setMenuOpen(false)}>Ever17</a></li>
						<li><a href='/remember11' onClick={() => menuOpen && setMenuOpen(false)}>Remember11</a></li>
					</ul>
				</nav>
				<div className={styles.languageWrapper}>
					<div className={styles.language} onClick={() => setViewLanguage(!viewLanguage)}>
						{language}
					</div>
					<AnimatePresence>
						{viewLanguage &&
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.list}>
								<fieldset>
									<input type="radio" name='language' id="en" value='en' defaultChecked={language == 'en'} onChange={handleLanguage} />
									<label htmlFor="en">English</label>
								</fieldset>
								<fieldset>
									<input type="radio" name='language' id="es" value='es' defaultChecked={language == 'es'} onChange={handleLanguage} />
									<label htmlFor="es">Español</label>
								</fieldset>
							</motion.div>
						}
					</AnimatePresence>
				</div>
			</div>
		</div>
	)
}

export default Header