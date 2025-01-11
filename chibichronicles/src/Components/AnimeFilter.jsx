import CustomFilterList from "../Inputs/dropdown-list";
import styles from '../Styles/Components/animeFilter.module.css';
import { useEffect, useState } from "react";


function getLast20Years() {
    const currentYear = new Date().getFullYear();
    const last20Years = [];
  
    for (let i = 0; i < 20; i++) {
      last20Years.push(currentYear - i);
    }
  
    return last20Years;
  }


const AnimeFilter = ({setResetKey , filterSearchHandler}) => {

    const [allSelectedFilters , setAllSelectedFilter] = useState([]);

    const clearButtonHandler = () => {
        setResetKey(prevKey => prevKey + 1);
    }

    const searchButtonHandler = () => {
        filterSearchHandler(allSelectedFilters);
    }

    const animeTypeFilterList = [ "TV" , "OVA" , "Movie" , "Special" , "ONA"];
    const animeAgeRating = [ "G : All Ages" , "PG : Children" , "PG-13 : Teens 13 or older" , "R : 17+ (violence & profanity)" ];
    const animeReleasedSeason = [, "Winter" , "Spring" , "Summer" , "Fall"];
    const animeStatus = [ "airing" , "complete" , "upcoming"];
    const animeGenre = [ "Action" , "Adventure" , "Fantasy" , "Comedy" , "Drama" , "Slice of Life" , "Romance" , "Sports" , "Sci-Fi" , "Magic" , "School" , "Kids"] 
    // const animeyears = getLast20Years();

    const onChangeCallback = ({Id , Items}) => {
        switch(Id){
            case "ANIME_TYPE":
                setAllSelectedFilter({...allSelectedFilters , [Id] : Items});
                break;
            case "AGE_RATING":
                setAllSelectedFilter({...allSelectedFilters , [Id] : Items});
                break;
            case "RELEASED_SEASON":
                setAllSelectedFilter({...allSelectedFilters , [Id] : Items});
                break;
            case "ANIME_STATUS":
                setAllSelectedFilter({...allSelectedFilters , [Id] : Items});
                break;
            case "ANIME_GENRE":
                setAllSelectedFilter({...allSelectedFilters , [Id] : Items});
                break;
            default:
                break;                    
        }
    }

    return (
        <div>
            <div className={styles.quickFilterTextContainer}>
                Quick Filter
            </div>
            <div className={styles.allFilterContainer}>
                <CustomFilterList id = "ANIME_TYPE"  title = "Anime Type : " items={animeTypeFilterList} onSelectedItemChangeCallback = {onChangeCallback}/>
                <CustomFilterList id = "AGE_RATING" title = "Age Rating : " items={animeAgeRating} onSelectedItemChangeCallback = {onChangeCallback}/>
                <CustomFilterList id = "RELEASED_SEASON" title = "Released Season : " items={animeReleasedSeason} onSelectedItemChangeCallback = {onChangeCallback} />
                <CustomFilterList id = "ANIME_STATUS" title = "Anime Status : " items={animeStatus} onSelectedItemChangeCallback = {onChangeCallback}/>
                <CustomFilterList id = "ANIME_GENRE" title = "Anime Genre : " items={animeGenre} onSelectedItemChangeCallback = {onChangeCallback}/>
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={searchButtonHandler}>Search</button>
                <button onClick={clearButtonHandler}>Clear</button>
            </div>
        </div>
        
    );
}

export default AnimeFilter;