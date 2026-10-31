import styles from './ArticleContent.module.css';



function ArticleContent () {
    return (
        <div className={styles.articleContent}>
            <div className={styles.articleText}>
             <p>
               Most teams treat information architecture as a post-launch cleanup task. 
               In reality, the way you structure your data defines the ceiling of your
               product's operational efficiency.
            </p>
            <h2>The Cost of Silent Entropy</h2>
             <p> 
                When we talk about "ops brain," we aren't just talking about automation triggers. We are talking about the
               semantic layer of your company. Every SaaS team starts with a clean Slack and a clean Stripe. Within six
               months, the debt begins. "Pro" in Stripe means something different than "Verified" in HubSpot. The signals
               don't match, and the automation breaks.
              </p>
             <blockquote className={styles.quoteOne}>
                "A workflow that fails silently is worse than no workflow at all. 
                Reliability starts  with the names you give your data."
            </blockquote>
         </div>
         <div className={styles.articleMapping}>
            <h2>Mapping the Decision Chain</h2>
            <p>
              At Synkra, we've analyzed over 14 million runs across 2,400 teams. The most successful teams don't have
              more complex automations; they have more explicit playbooks. They've mapped their information architecture
              so that an event in GitHub translates perfectly to a notification in Slack without translation layers.  
            </p>
            <blockquote className={styles.quoteTwo}>
                "Data architecture is not about databases, it's about decision architecture.It's about making sure the right data flows to the right place at the right time."
                  <span className={styles.cite}>— The Algorithmic Enterprise, 2025</span>
            </blockquote>
         </div>
         <div className={styles.articleScale}>
            <h2>Structuring for Scale</h2>
            <p>
              The transition from a 3-person team to a 50-person product org is where most information architectures
              collapse. Tribal knowledge is the enemy of automation. When your PM can't look at a playbook and
              understand exactly why a deal was routed to a specific owner, you haven't built a system—you've built a
              riddle.  
            </p>
            <div className={styles.numberedList}>
                <div className={styles.numberedItem}>
                    <span className={styles.numberBadge}>1</span>
                    <div>
                        <h3>Intuitive Layout</h3>
                        <p>Clear visual cues guide users, ensuring a seamless and intuitive experience.</p>
                    </div>
                </div>
                <div className={styles.numberedItem}>
                    <span className={styles.numberBadge}>2</span>
                    <div>
                        <h3>Streamlined Navigation</h3>
                        <p>Easy-to-use navigation ensures users can quickly find the features they need.</p>
                    </div>
                </div>
            </div>

            <div className={styles.tags}>

                <span className={styles.tag}>Workflow Automation</span>
                <span className={styles.tag}>SaaS Ops</span>
                <span className={styles.tag}>Product Strategy</span>

            </div>
          </div>
        </div>
    );
}



export default ArticleContent;