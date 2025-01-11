import React, { useEffect, useState } from 'react';
import styles from '../Styles/Inputs/customFilterList.module.css';

const getGenreId = (genre) => {
    switch(genre){
        case 'Action':
            return 1;
        case 'Adventure':
            return 2;
        case 'Fantasy':
            return 10;
        case 'Comedy':
            return 4;
        case 'Drama':
            return 8;
        case 'Slice of Life':
            return 12;
        case 'Romance':
            return 22;
        case 'Sports':
            return 13;
        case 'Sci-Fi':
            return 24;
        case 'Magic':
            return 16;
        case 'School':
            return 28;
        case 'Kids':
            return 29;
        default:
            return 1;                             
    }
}

const CustomFilterList = ({ items, title , id , onSelectedItemChangeCallback }) => {
    // State to track selected items
    const [selectedItems, setSelectedItems] = useState([]);

    const selectedItemsLength = selectedItems.length;

    const handleCheckboxChange = (event) => {
        let { value, checked } = event.target;

        let selectedValue =  id === 'AGE_RATING' ? event.target.value.split(':')[0].trim() :  id === 'ANIME_GENRE' || id === 'MANGA_GENRE' ? getGenreId(event.target.value)  : event.target.value

        setSelectedItems((prevSelectedItems) => {
            if (checked) {
                return [...prevSelectedItems, selectedValue]; // create a new array
            } else {
                return prevSelectedItems.filter(item => item !== selectedValue); // create a new array
            }
        });

    };


    useEffect(() => {
        onSelectedItemChangeCallback({
            "Id" : id,
            "Items" : selectedItems
        })
    } , [selectedItemsLength])

    return (
        <div className={styles.CustomFilterListContainer}>
            <div className={styles.allFilterTitle}>{title}</div>
            <div className={styles.customFilterListItems}>
                {items.map((item) => (
                    <div key={item} className={styles.checkboxAndLabelContainer}>
                        <input
                            type="checkbox"
                            id={item}
                            name={item}
                            value={item}
                            className={styles.checkboxInput}
                            onChange={handleCheckboxChange}
                            // checked={id === 'AGE_RATING' ? selectedItems.includes(item.split(':')[0].trim()) : id === 'ANIME_GENREA' ? selectedItems.includes(getGenreId(item))  : selectedItems.includes(item) } // mark as checked if it's in the selectedItems array
                        />
                        <label htmlFor={item}>{item}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomFilterList;
