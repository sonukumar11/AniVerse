import styles from '../Styles/Components/AnimeCard.module.css';
import { formatDate , formatAnimeDescription } from '../Utils/formatters';
import { useState } from 'react';

const AnimeCard = ({anime}) => {

	const [isFullScreen , setIsFullScreen] = useState(false);

	const handleCardFullScreen = () => {
		console.warn('Card is being clicked...')
	}

	const animeImage = anime.CoverImage ? anime.CoverImage.jpg.large_image_url : 'https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
	return (
		<div className={styles.animeCard} onClick={handleCardFullScreen}>
			<div className={styles.animeCardHeader}>
				<span className={styles.animeTitle}>{anime.Title}</span>
				<span className={styles.animeAgeRating}>{anime.AgeRating}</span>
			</div>
			<div className={styles.animeCoverImage}>
				<img src={animeImage} alt="Anime Image" />
			</div>
			<div>
				<div className={styles.animeDateParent}>
					<span className={styles.animeDate}> <span className={styles.boldParams}>From : </span> {formatDate(anime.StartDate)}</span>
					<span className={styles.animeDate}> <span className={styles.boldParams}>To : </span> {formatDate(anime.EndDate)}</span>
				</div>
				<div className={styles.animeStatus}> <span className={styles.boldParams}>Status : </span> {anime.Status}</div>
				<div className={styles.animeStatus}> <span className={styles.boldParams}>Episodes : </span> {anime.EpisodeCount}</div>
			</div>
			<div className={styles.animeDescriptionParent}>
				<p>{formatAnimeDescription(anime.Description , 150)}</p>
			</div>
		</div>
	);
}


export default AnimeCard;