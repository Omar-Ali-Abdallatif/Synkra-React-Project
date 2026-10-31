import authorImg from '../../../../assets/image/author.png';
import articleImg from '../../../../assets/image/article-img.png';
import styles from'./ArticleHeader.module.css';

function ArticleHeader () {
    return (
        <header className={styles.articleHeader}>
            <div className={styles.articleInfo}>
                <span className={styles.articleCategory}>SCALABILITY</span>
                <h1 className={styles.headText}>
                    The Architecture of Information: 
                    Shaping Digital Experiences.
                </h1>
            </div>
            <div className={styles.articleAuthor}>
                <img src= {authorImg} alt="author-img" className={styles.avatarImg} />
                <div className={styles.authorInfo}>
                  <strong>Marcus Chen</strong>
                  <p>12 min read • March 28, 2026</p>
                </div>
            </div>
            <div className={styles.articleImage}>
                <img src={articleImg} alt="article-bg" />
            </div>
        </header>
    );
}



export default ArticleHeader;