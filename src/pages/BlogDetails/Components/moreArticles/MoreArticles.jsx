import styles from './MoreArticles.module.css';
import arrow1 from '../../../../assets/image/arrow1.png'
import arrow2 from '../../../../assets/image/arrow2.png'
 
import articles from './MoreArticles.data';

function MoreArticles() {
    return (
        <div className={styles.MoreArticles}>

            {/* Section Header */}
            <div className={styles.MoreArticleHeader}>
                <div className={styles.MoreArticleInfo}>
                    <h2 className={styles.sectionLabel}>
                        More from Synkra
                    </h2>
                    <p>
                        Experts in automation, dedicated to helping your business thrive.
                    </p>
                </div>

                {/* Navigation Arrows */}
                <div className={styles.MoreArticleArrows}>
                    <button type="button"><img src={arrow1} alt="left-arrow" /></button>
                    <button type="button"><img src={arrow2} alt="right-arrow" /></button>
                </div>

            </div>


            {/* Articles */}
            <div className={styles.ArticlesList}>
              {articles.map((article) => (
                <article key={article.id} className={styles.articleCard}>
                    <div className={styles.articleImage}>
                        <img src={article.image} alt={article.imageAlt} />
                    </div>

                    <div className={styles.articleInfo}>
                        <span className={styles.articleCategory}>
                            {article.category}
                        </span>

                        <h3>
                           {article.title}
                        </h3>

                        <p>
                           {article.description}
                        </p>
                        <div className={styles.articleAuthor}>
                          <span  className={styles.avatarLetter}
                            style={{ backgroundColor: `var(--avatar-${article.avatarColorKey}-bg)`,
                            color: `var(--avatar-${article.avatarColorKey}-text)`, }}>
                            {article.authorInitials}</span>
                        <span className={styles.authorName}>{article.authorName}</span>
                          <p>{article.meta}</p>
                       </div> 
                    </div>
                </article>
               ))}   

            </div>

        </div>
    );
}

export default MoreArticles;