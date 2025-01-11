import styles from '../Styles/Components/LikedPosts.module.css';

export const LikedPosts = ({articles}) => {
    return (
        <div className={styles.LikedPostsContainer}>
            <div className={styles.LikedPostsHeader}>Liked Articles</div>
            <div>
                {articles.map((article) => <div className={styles.LikedPostsItemsContainer}>{article} </div>) }
            </div>
        </div>
    );
};

export default LikedPosts;