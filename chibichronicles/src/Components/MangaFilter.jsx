import CustomFilterList from "../Inputs/dropdown-list";
import styles from '../Styles/Components/MangaFilter.module.css';
import { useEffect, useState } from "react";
import SliderInput from "../Inputs/slider-input";



const MangaFilter = ({setResetKey , filterSearchHandler}) => {

    const [allSelectedFilters , setAllSelectedFilter] = useState([]);

    const clearButtonHandler = () => {
        setResetKey(prevKey => prevKey + 1);
    }

    const searchButtonHandler = () => {
        filterSearchHandler(allSelectedFilters);
    }

    const mangaType = ["manga" , "novel" , "lightnovel" , "oneshot" , "doujin" , "manhwa" , "manhua"];
    const mangaStatus = ["publishing" , "complete" , "hiatus" , "discontinued" , "upcoming"];
    const mangaGenre = [ "Action" , "Adventure" , "Fantasy" , "Comedy" , "Drama" , "Slice of Life" , "Romance" , "Sports" , "Sci-Fi" , "Magic" , "School" , "Kids"] 


    const onChangeCallback = ({Id , Items}) => {
        switch(Id){
            case "MANGA_TYPE":
                setAllSelectedFilter({...allSelectedFilters , [Id] : Items});
                break;
            case "MANGA_STATUS":
                setAllSelectedFilter({...allSelectedFilters , [Id] : Items});
                break;
            case "MANGA_GENRE":
                setAllSelectedFilter({...allSelectedFilters , [Id] : Items});
                break;
            case "MANGA_SCORE":
                setAllSelectedFilter({...allSelectedFilters , [Id]: Items});    
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
                <SliderInput id="MANGA_SCORE" title="Manga Score : " onSelectedItemChangeCallback={onChangeCallback} />
                <CustomFilterList id = "MANGA_TYPE"  title = "Manga Type : " items={mangaType} onSelectedItemChangeCallback = {onChangeCallback}/>
                <CustomFilterList id = "MANGA_STATUS" title = "Manga Status : " items={mangaStatus} onSelectedItemChangeCallback = {onChangeCallback}/>
                <CustomFilterList id = "MANGA_GENRE" title = "Manga Genre : " items={mangaGenre} onSelectedItemChangeCallback = {onChangeCallback}/>
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={searchButtonHandler}>Search</button>
                <button onClick={clearButtonHandler}>Clear</button>
            </div>
        </div>
        
    );
}

export default MangaFilter;