import styles from './CtaCard.module.css'
import headset from '../../../../assets/image/headset.png'



function CtaCard () {
    return (
        <div className={styles.ctaCard}>
            <div className={styles.ctaInfo}>
                <h2>Try Synkra free for 14 days</h2>
                <p>No setup call. No credit card. First playbook in 18 minutes.</p>
            </div>
            <div className={styles.ctaContainer}>
                <button className={styles.creatAccount}>Create an Account</button>
                <button className={styles.talkToTeam}>
                 <span className={styles.talkToTeamText}> Talk to our team instead </span>
                 <img src={headset} alt="headset-icon" className={styles.headsetIcon} />
                </button>
                 <p className={styles.ctaNote}><span>*</span>Ship your first live playbook in 10 minutes.</p>

            </div>
        </div>
    );
}


export default CtaCard;