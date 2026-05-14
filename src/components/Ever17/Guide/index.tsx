import { useEffect } from 'react'
import styles from './styles.module.scss'
import { $language, useSiteStore } from '../../../store/useSiteStore'
import { useSsrStore } from '../../../hooks/useSsrStore'

const Ever17Guide = () => {
	const language = useSsrStore($language)
	const setDark = useSiteStore(state => state.setDark)
	
	useEffect(() => {
		setDark('page')
	}, [])
	
	return (
		<div className={styles.ever17Guide}>
			<a href="/ever17">{language == 'en' ? 'Go back' : 'Volver atrás'}</a>
			<div className={styles.guide}>
				<h2>{language == 'en' ? 'Ever17 Guide' : 'Guía Ever17'}</h2>
				{language == 'en' ?
					<div className={styles.order}>
						<h3>Required route order</h3>
						<ol>
							<li>Tsugumi (Start as Takeshi)</li>
							<li>Sora (Start as Takeshi)</li>
							<li>Yu + Epilogue (Start as Kid)</li>
							<li>Sara + Epilogue (Start as Kid)</li>
							<li>Coco (Start as Kid)</li>
							<li>Tsugumi-Sora Epilogue</li>
							<li>Tsugumi-Sora Bad End</li>
							<li>Yu Bad End</li>
							<li>Sara Bad End</li>
						</ol>
					</div>
				:
					<div className={styles.order}>
						<h3>Orden requerido para las rutas</h3>
						<ol>
							<li>Tsugumi (Empieza como Takeshi)</li>
							<li>Sora (Empieza como Takeshi)</li>
							<li>Yu + Epílogo (Empieza como Kid)</li>
							<li>Sara + Epílogo (Empieza como Kid)</li>
							<li>Coco (Empieza como Kid)</li>
							<li>Tsugumi-Sora Epílogo</li>
							<li>Tsugumi-Sora Bad End</li>
							<li>Yu Bad End</li>
							<li>Sara Bad End</li>
						</ol>
					</div>
				}
				<div className={styles.flowChart}>
					<h3>{language == 'en' ? 'Flowchart' : 'Diagrama de flujo'}</h3>
					<div className={styles.pic}>
						<picture>
							<source srcSet='/flowchart.avif' type='image/avif' />
							<img src="/flowchart.png" alt="" />
						</picture>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Ever17Guide
