import styles from '../Styles/Inputs/Slider-Input.module.css';
import React, { useEffect, useState } from 'react';
import { Range } from 'react-range';

const SliderInput = ({id , title , onSelectedItemChangeCallback}) => {
  const [values, setValues] = useState([0, 10]); // min and max values


  useEffect(() => {
    onSelectedItemChangeCallback({
        "Id" : id,
        "Items" : values
    });

    console.warn('Change in values happened' , values);
  } , [values])

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderTitle}>{title}</div>  
      <div className={styles.RangeSliderContainer}>
        <Range
            values={values}
            step={1}
            min={0}
            max={10}
            onChange={(values) => setValues(values)}
            renderTrack={({ props, children }) => (
            <div
                {...props}
                style={{
                ...props.style,
                height: '10px',
                width: '100%',
                backgroundColor: 'grey',
                borderRadius: '10px'
                }}
            >
                {children}
            </div>
            )}
            renderThumb={({ props }) => (
            <div
                {...props}
                style={{
                ...props.style,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#8B5DFF',
                cursor: 'pointer',
                }}
            />
            )}
        />
      </div>  
      <div className={styles.minMaxScoreContainer}>
        <span>Min Score : {values[0]}</span>
        <span>Max Score : {values[1]}</span>
      </div>
    </div>
  );
};

export default SliderInput;
