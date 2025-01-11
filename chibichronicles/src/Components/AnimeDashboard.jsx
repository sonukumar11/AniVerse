import { useEffect, useState } from 'react';
import AnimeCard from './AnimeCard.jsx';
import { fetchAllAnimeList, fetchTopAnimeList } from '../Query/allQuery.jsx';
import styles from '../Styles/Components/AnimeDashboard.module.css';
import AnimeListSwiper from './AnimeListSwiper.jsx';
import AnimeFilter from './AnimeFilter.jsx';
import { TailSpin , Circles , Hearts , Rings } from 'react-loader-spinner';

export const AnimeDashboard = ({}) => {
    const [animeList, setAnimeList] = useState([]);
    const [topAnimeList, setTopAnimeList] = useState([]);
    const [resetKey, setResetKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [filtersApplied, setFiltersApplied] = useState([]);

    const formatAnimeListResponse = (animeList) => {
        let formattedAnimeList = [];
        for (let animeData of animeList) {
            const anime = animeData;
            formattedAnimeList.push({
                'Title': anime.title_english ? anime.title_english : anime.title,
                'AgeRating': anime.rating,
                'CoverImage': anime.images,
                'Description': anime.synopsis ? anime.synopsis : anime.background,
                'EpisodeCount': anime.episodes,
                'Status': anime.status,
                'StartDate': anime.aired.from,
                'EndDate': anime.aired.to,
            });
        }
        return formattedAnimeList;
    };

    const formatTopAnimeList = (animeList) => {
        let formattedTopAnimeList = [];
        for (let anime of animeList) {
            if (!anime.title_english) {
                continue;
            }
            formattedTopAnimeList.push({
                'Title': anime.title_english,
                'AgeRating': anime.rating,
                'CoverImage': anime.images,
                'Description': anime.synopsis,
                'EpisodeCount': anime.episodes,
                'Trailer': anime.trailer,
                'Genres': anime.genres,
            });
        }
        return formattedTopAnimeList;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const animeData = await fetchAllAnimeList(filtersApplied);
                const fomattedData = formatAnimeListResponse(animeData.data);
                setAnimeList(fomattedData);
            } catch (error) {
                console.log('An Error Occured while getting anime list: ', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [filtersApplied]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topAnimeListData = await fetchTopAnimeList();
                const formattedData = formatTopAnimeList(topAnimeListData.data);
                setTopAnimeList(formattedData);
            } catch (error) {
                console.log('An Error occured while fetching top anime list: ', error);
            }
        };

        fetchData();
    }, []);

    const onFilterChangeCallback = (filters) => {
        setFiltersApplied(filters);
    };

    return (
        <div>
            {loading && (
                <div className={styles.loadingModal}>
                    <Circles color="#8224e3" height={80} width={80} />
                </div>
            )}

            <div className={styles.topAnimeAndFilterContainer}>
                <div className={styles.topAnimeList}>
                    <AnimeListSwiper slides={topAnimeList} />
                </div>
                <div className={styles.animeFilterContainer}>
                    <AnimeFilter filterSearchHandler={onFilterChangeCallback} key={resetKey} setResetKey={setResetKey} />
                </div>
            </div>

            {animeList.length > 0  && (
                <>
                    <div className={styles.popularAnimeTitleContainer}>
                        <span>Popular Anime</span>
                    </div>
                    <div className={styles.content}>
                        {animeList.map((anime, index) => (
                            <AnimeCard key={index} anime={anime} />
                        ))}
                    </div>
                </>
            )}

            { animeList.length === 0 && (
                <div className={styles.noDataContentCard}>
                    No Anime Available As Per The Applied Filter
                </div>
            )}
        </div>
    );
};

export default AnimeDashboard;
