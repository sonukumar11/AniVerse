import styles from '../Styles/Components/IconContainer.module.css';


export const IconContainer = ({ icon, altText = "icon" }) => {
    return (
        <div className={styles.iconContainer}>
            <img src={icon} alt={altText} className={styles.iconImage} />
        </div>
    );
};
