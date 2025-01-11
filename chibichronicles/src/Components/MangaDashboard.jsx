import {fetchTopMangaList , fetchAllMangaList} from '../Query/allQuery';
import { use, useEffect, useState } from 'react';
import { TailSpin , Circles , Hearts , Rings } from 'react-loader-spinner';
import styles from '../Styles/Components/MangaDashboard.module.css';
import MangaListSwiper from './MangaListSwiper'; 
import MangaCard from './MangaCard';
import MangaFilter from './MangaFilter';




const MangaDashboard = ({}) => {

    const [loading, setLoading] = useState(false);
    const [resetKey , setResetKey] = useState(0);

    const [topMangaList , setTopMangaList] = useState([]);
    const [mangaList , setAllMangaList] = useState([]);
    const [filtersApplied , setFiltersApplied] = useState([]);

    const formatTopMangaList = (mangaList) => {
        let formattedTopMangaList = [];
        for (let manga of mangaList) {
            if (!manga.title_english) {
                continue;
            }
            formattedTopMangaList.push({
                'Title': manga.title_english,
                'AgeRating': manga.rating,
                'CoverImage': manga.images,
                'Description': manga.synopsis ? manga.synopsis : manga.background ? manga.background : 'No Description Available',
                'EpisodeCount': manga.episodes,
                'know_more_url': manga.url,
                'Genres': manga.genres,
            });
        }

        return formattedTopMangaList;
    };

    const formatMangaListResponse = (mangaList) => {
        let formattedMangaList = [];
        for (let mangaData of mangaList) {
            const manga = mangaData;
            formattedMangaList.push({
                'Title': manga.title_english ? manga.title_english : manga.title,
                'Author': manga.authors && manga.authors.length > 0 ? manga.authors[0].name : '',
                'CoverImage': manga.images,
                'Description': manga.synopsis ? manga.synopsis : manga.background ? manga.background : 'No Description Available',
                'Chapters': manga.chapters ? manga.chapters : manga.volumes ? manga.volumes : '_',
                'Status': manga.status,
                'StartDate': manga.published.from,
                'EndDate': manga.published.to,
                'HasVolumes' : manga.volumes,
                'HasChapters' : manga.chapters
            });
        }
        return formattedMangaList;
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try{
                const mangaListResponse = await fetchTopMangaList();
                const formattedData = formatTopMangaList(mangaListResponse.data);
                setTopMangaList(formattedData);
            }
            catch(error){
                console.warn('An Error occured while fetching top manga list ' , error);
            }
            finally{
                setLoading(false);
            }
        };

        fetchData();
    } , []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try{
                const mangaListResponse = await fetchAllMangaList(filtersApplied);
                const formattedData = formatMangaListResponse(mangaListResponse.data);
                setAllMangaList(formattedData);
            }
            catch(error){
                console.warn('An Error occured while fetching the managa list : ' , error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchData();
    } , [filtersApplied])


    const onFilterChangeCallback = (appliedFilters) => {
        setFiltersApplied(appliedFilters);
    }

    return (
        <div>
            {loading && (
                <div className={styles.loadingModal}>
                    <Circles color="#8224e3" height={80} width={80} />
                </div>
            )}

            <div className={styles.topMangaAndFilterContainer}>
                <div className={styles.topMangaList}>
                    <MangaListSwiper slides={topMangaList} />
                </div>
                <div className={styles.mangaFilterContainer}>
                    <MangaFilter filterSearchHandler={onFilterChangeCallback} key={resetKey} setResetKey={setResetKey} />
                </div>
            </div>

            {mangaList.length > 0  && (
                <>
                    <div className={styles.popularMangaTitleContainer}>
                        <span>Popular Manga</span>
                    </div>
                    <div className={styles.content}>
                        {mangaList.map((manga, index) => (
                            <MangaCard key={index} anime={manga} />
                        ))}
                    </div>
                </>
            )}

            { mangaList.length === 0 && (
                <div className={styles.noDataContentCard}>
                    No Manga Available As Per The Applied Filter
                </div>
            )}
        </div>
    );
}


export default MangaDashboard;