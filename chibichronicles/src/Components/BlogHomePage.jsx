import styles from '../Styles/Components/BlogHomePage.module.css';
import BlogCard from './BlogCard';
import {blogData} from '../Utils/dummyData';
import { IconContainer } from './IconContainer';
import Pen from '../Static/Images/fountain-pen-close-up.png';
import {TrendingTopics} from '../Components/TrendingTopics';
import LikedPosts from './LikedPostsCard';
import { useSelector } from 'react-redux';
import LoginAndSignUpPage from './LoginAndSignupPage';
  


export const BlogHomePage = ({}) => {

    const isUserAuthenticated = useSelector((state) => state.auth.isUserLoggedIn);

    const trendingTopics = [
        'AI in Daily Life',
        'Eco-Friendly Hacks',
        'Mental Health Tips',
        'Crypto Basics',
        'Work From Anywhere'
      ];

    return (
        <>
            {!isUserAuthenticated && <LoginAndSignUpPage />}
            <div className={styles.blogHomePageParentContainer}>
                <div className={styles.AllBlogsContainer}>
                    {blogData.map((blog) => 
                        <BlogCard 
                            AuthorName={blog.AuthorName}
                            PublishedDate={blog.PublishedDate}
                            LikesCount={blog.LikesCount}
                            BlogTitle={blog.BlogTitle}
                            BlogBody={blog.BlogBody}
                        />    
                    )}
                </div>
                <div className={styles.blogSideBarContainer}>
                    {isUserAuthenticated && (
                        <div className={styles.buttonContainer}>
                            <button type="button" className={`${styles.writeButton}`}>
                                Write Something
                                <img src={Pen} alt="Pen Icon" className={styles.penIcon} />
                            </button>
                        </div>
                    )}
                    <div className={styles.siderBarContainersParent}>
                        <TrendingTopics topics = {trendingTopics}/>
                        <LikedPosts articles={trendingTopics} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogHomePage;