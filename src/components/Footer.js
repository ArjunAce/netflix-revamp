import React from "react";
import appStyles from './../styles/app.module.scss';
import styles from './../styles/footer.module.scss';

const Footer = () => {
    return (
        <section className={styles['footer']}>
            <div className={`${appStyles['container']} ${styles['container']}`}>
                <ul className={styles['footer-groups']}>
                    <li className={styles['group']}>
                        <div className={styles['group-name']}>For users and partners</div>
                        <ul className={styles['two-column']}>
                            <div>
                                <li>All about subscriptions</li>
                                <li>FAQ</li>
                                <li>Enter a promo code</li>
                                <li>Agreement</li>
                                <li>Policy</li>
                            </div>
                            <div>
                                <li>About project</li>
                                <li>Bonus and gifts</li>
                                <li>Partnership</li>
                                <li>Vacancy</li>
                                <li>Central audience</li>
                            </div>
                        </ul>
                    </li>
                    <li className={styles['group']}>
                        <div className={styles['group-name']}>On devices</div>
                        <ul>
                            <li>TV and mediaplayers</li>
                            <li>Mobile devices</li>
                            <li>PC</li>
                            <li>Connect a TV</li>
                        </ul>
                    </li>
                    <li className={styles['group']}>
                        <div className={styles['group-name']}>User support</div>
                        <ul>
                            <li>Questions?</li>
                            <li>All contacts</li>
                            <li>Start live chat</li>
                        </ul>
                    </li>
                    <li className={styles['group']}>
                        <div className={styles['group-name']}>Social media</div>
                        <ul>
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Instagram</li>
                            <li>Youtube</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Footer;
