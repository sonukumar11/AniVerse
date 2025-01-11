import {allComments} from '../Utils/dummyData'
import styles from '../Styles/Components/CommentSection.module.css';

export const CommentSection = ({}) => {
    
    return (
        allComments.map((comment) => {
            return (
                <div className={styles.parentCommentContainer}>
                    <div className={styles.commentHeader}>
                        <span>{comment.username}</span>
                        <span>{comment.commentDate}</span>
                    </div>
                    <div>
                        <span>{comment.comment}</span>
                    </div>
                </div>
            );
        })
    );
};

export default CommentSection;