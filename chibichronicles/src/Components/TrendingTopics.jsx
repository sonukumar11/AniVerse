import styles from '../Styles/Components/TrendingTopics.module.css';

export const TrendingTopics = ({topics}) => {
    return (
        <div className={styles.trendingTopicsContainer}>
            <div className={styles.TrendingTopicsHeader}>Trending Topics</div>
            <div>
                {topics.map((topic) => <div className={styles.TrendingTopicsItemsContainer}>{topic} </div>) }
            </div>
        </div>
    );
};

export default TrendingTopics;