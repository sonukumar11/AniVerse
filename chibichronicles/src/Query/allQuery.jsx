import axios, { Axios } from "axios"

export const fetchAllAnimeList = async (filtersApplied) => {
    const queryParams = [];

    if (filtersApplied.ANIME_TYPE && filtersApplied.ANIME_TYPE.length > 0) {
        queryParams.push(`type=${filtersApplied.ANIME_TYPE.join(',')}`);
    }

    if (filtersApplied.ANIME_GENRE && filtersApplied.ANIME_GENRE.length > 0) {
        queryParams.push(`genres=${filtersApplied.ANIME_GENRE.join(',')}`);
    }

    if (filtersApplied.AGE_RATING && filtersApplied.AGE_RATING.length > 0) {
        queryParams.push(`rating=${filtersApplied.AGE_RATING.join(',')}`);
    }

    if (filtersApplied.RELEASED_SEASON && filtersApplied.RELEASED_SEASON.length > 0) {
        queryParams.push(`season=${filtersApplied.RELEASED_SEASON.join(',')}`);
    }

    if (filtersApplied.ANIME_STATUS && filtersApplied.ANIME_STATUS.length > 0) {
        queryParams.push(`status=${filtersApplied.ANIME_STATUS.join(',')}`);
    }

    queryParams.push(`order_by=popularity`);
    queryParams.push(`sort=asc`);
    queryParams.push('limit=25');

    // Build the final query string
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

    // Fetch data from the API with the query string
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime${queryString}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching anime data:', error);
        throw error;
    }
};




export const fetchTopAnimeList = async () => {
    const response = await axios.get('https://api.jikan.moe/v4/top/anime');
    return response.data;
}

export const fetchTopMangaList = async () => {
    const response = await axios.get('https://api.jikan.moe/v4/top/manga');
    return response.data;
}


export const fetchAllMangaList = async (filtersApplied) => {

    const queryParams = [];

    if(filtersApplied.MANGA_TYPE && filtersApplied.MANGA_TYPE.length > 0){
        queryParams.push(`type=${filtersApplied.MANGA_TYPE.join(',')}`);
    }

    if(filtersApplied.MANGA_STATUS && filtersApplied.MANGA_STATUS.length > 0){
        queryParams.push(`status=${filtersApplied.MANGA_STATUS.join(',')}`);
    }

    if(filtersApplied.MANGA_GENRE && filtersApplied.MANGA_GENRE.length > 0){
        queryParams.push(`genres=${filtersApplied.MANGA_GENRE.join(',')}`);
    }

    if(filtersApplied.MANGA_SCORE && filtersApplied.MANGA_SCORE.length > 0){
        queryParams.push(`min_score=${filtersApplied.MANGA_SCORE[0]}`);
        queryParams.push(`max_score=${filtersApplied.MANGA_SCORE[1]}`);
    }

    queryParams.push(`order_by=popularity`);
    queryParams.push(`sort=asc`);
    queryParams.push('limit=25');

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

    try{
        const response = await axios.get(`https://api.jikan.moe/v4/manga${queryString}`);
        return response.data;
    }
    catch(error){
        console.error('Error fetching managa data , ' , error);
    }
}


