import { useCallback, useEffect } from 'react'
import never7Horizontal from '/never7_banner_horizontal.webp?url'
import never7HorizontalAvif from '/never7_banner_horizontal.avif?url'
import never7Vertical from '/never7_banner_vertical.webp?url'
import never7VerticalAvif from '/never7_banner_vertical.avif?url'
import ever17Horizontal from '/ever17_banner_horizontal.webp?url'
import ever17HorizontalAvif from '/ever17_banner_horizontal.avif?url'
import ever17Vertical from '/ever17_banner_vertical.webp?url'
import ever17VerticalAvif from '/ever17_banner_vertical.avif?url'
import remember11Horizontal from '/remember11_banner_horizontal.webp?url'
import remember11HorizontalAvif from '/remember11_banner_horizontal.avif?url'
import remember11Vertical from '/remember11_banner_vertical.webp?url'
import remember11VerticalAvif from '/remember11_banner_vertical.avif?url'
import styles from './styles.module.scss'
import type { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useSiteStore } from '../../store/useSiteStore'
import { getLangFromUrl, useTranslatedPath } from '../../i18n/utils'

const HomeSlider = ({ url }: { url: URL }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnInteraction: false })])
	const setDark = useSiteStore(state => state.setDark)
	const setInView = useSiteStore(state => state.setInView)
	const currentLang = getLangFromUrl(url)
	const translatePath = useTranslatedPath(currentLang)
	const images = [
		{
			horizontal: never7Horizontal,
			horizontalAvif: never7HorizontalAvif,
			vertical: never7Vertical,
			verticalAvif: never7VerticalAvif,
			link: 'never7'
		},
		{
			horizontal: ever17Horizontal,
			horizontalAvif: ever17HorizontalAvif,
			vertical: ever17Vertical,
			verticalAvif: ever17VerticalAvif,
			link: 'ever17'
		},
		{
			horizontal: remember11Horizontal,
			horizontalAvif: remember11HorizontalAvif,
			vertical: remember11Vertical,
			verticalAvif: remember11VerticalAvif,
			link: 'remember11'
		}
	]

	const handleSlide = useCallback((emblaApi: EmblaCarouselType) => {
		if (emblaApi.selectedScrollSnap() == 1) {
			return setDark('home')
		}

		setDark(false)
	}, [])

	useEffect(() => {
		setDark(false)
	}, [])

	useEffect(() => {
		if (emblaApi) emblaApi.on('select', handleSlide)
	}, [emblaApi, handleSlide])

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY
			const height = window.innerHeight

			const threshold = scrollY > (height / 10) * 8

			setInView(threshold)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)

			setInView(false)
		}
	}, [])
	
	return (
		<div className={`${styles.gamesWrapper} embla`} ref={emblaRef}>
			<div className={`${styles.games} embla__container`}>
				{images.map(({ horizontal, horizontalAvif, vertical, verticalAvif, link }) => (
					<div key={link} className={`${styles.game} embla__slide`} onClick={() => window.location.href = translatePath(`/${link}`, currentLang)}>
						<div className={styles.banner}>
							<picture>
								<source srcSet={horizontalAvif} type='image/avif' media='(width >= 950px)' />
								<source srcSet={horizontal} type='image/webp' media='(width >= 950px)' />
								<source srcSet={verticalAvif} type='image/avif' media='(width >= 950px)' />
								<img src={vertical} style={{ objectPosition: link == 'never7' ? 'center top' : 'center bottom' }} alt="" />
							</picture>
						</div>
					</div>
				))}
			</div>
		</div>
	)
};

export default HomeSlider;
