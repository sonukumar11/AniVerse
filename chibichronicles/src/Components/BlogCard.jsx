import styles from '../Styles/Components/BlogCard.module.css';
import Heart from '../Static/Images/heart.png';
import Share from '../Static/Images/share.png'
import Send from '../Static/Images/send.png';
import { IconContainer } from './IconContainer';
import { useState } from 'react';
import {CommentSection} from '../Components/CommentSection';
import {LeaveAReply} from '../Components/LeaveAReply';

function formatDate(dateString) {
    const date = new Date(dateString); // Convert string to Date object
    return new Intl.DateTimeFormat('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
    }).format(date);
}

function calculateReadingTime(text) {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.split(/\s+/).length; // Count words by splitting on whitespace
    const readingTime = Math.ceil(wordCount / wordsPerMinute); // Round up to the nearest minute
    return readingTime;
}


export const BlogCard = ({AuthorName , PublishedDate , LikesCount , BlogTitle , BlogBody}) => {

    const [isCommentSectionOpen , setIsCommentSectionOpen] = useState(false);
    const [isReplySectionOpen , setIsReplySectionOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const commentClickHandler = () => {
        setIsCommentSectionOpen(true);
        setIsReplySectionOpen(false);
        setIsOpen(prevState => !prevState);
    }

    const leaveAReplyClickHandler = () => {
        setIsCommentSectionOpen(false);
        setIsReplySectionOpen(true);
        setIsOpen(prevState => !prevState);
    }

    return (
        <div className={styles.blogCardParentContainer}>
            <div className={styles.blogHeader}>
                <div className={styles.blogHeaderStartingContent}>
                    <span className={styles.headerInnerContainerStart}>
                        Author: {AuthorName}
                    </span>
                    <span className={styles.headerInnerContainer}>
                        {formatDate(PublishedDate)}
                    </span>
                    <span className={styles.headerInnerContainer}>
                        <IconContainer icon={Heart}/>
                        <span className={styles.LikesCountSpan}>{LikesCount}</span>
                    </span>
                    <span className={styles.headerInnerContainer}>
                        {`${calculateReadingTime(BlogBody)} min read`}
                    </span>
                </div>
                <div className={styles.blogHeaderEndingContent}>
                    <IconContainer icon={Send}/>
                </div>
            </div>
            <div className={styles.blogBody}>
                <span className={styles.BlogTitleContainer}>
                    {BlogTitle}
                </span>
                <div className={styles.blogBodyContainer}>
                    <p className={styles.blogBody}>{BlogBody}</p>
                </div>
            </div>
            <div className={styles.blogFooter}>
                <div className={styles.CommentsContainer} onClick={commentClickHandler}>Comments</div>
                <div className={styles.LeaveAReplyContainer} onClick={leaveAReplyClickHandler}>Leave A Reply</div>
            </div>
            <div className={`${styles.slideDiv} ${isOpen ? styles.open : ''}`}>
                {isCommentSectionOpen && <CommentSection />}
                {isReplySectionOpen && <LeaveAReply />}
            </div>
        </div>
    );
};


export default BlogCard;