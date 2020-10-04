import React from "react";
import appStyles from './../styles/app.module.scss';
import styles from './../styles/footer.module.scss';

const Footer = () => {
    const footerData = [
        { footerGroupName: 'For users and partners', footerItems: ["All about subscriptions", "FAQ", "Enter a promo code", "Agreement", "Policy"] },
        { footerGroupName: '', footerItems: ["About project", "Bonus and gifts", "Partnership", "Vacancy", "Central audience"] },
        { footerGroupName: 'On devices', footerItems: ["TV and mediaplayers", "Mobile devices", "PC", "Connect a TV"] },
        { footerGroupName: 'User support', footerItems: ["Questions?", "All contacts", "Start live chat",] },
        { footerGroupName: 'Social media', footerItems: ["Facebook", "Twitter", "Instagram", "Youtube",] }
    ];
    return (
        <section className={styles['footer']}>
            <div className={`${appStyles['container']} ${styles['container']}`}>
                <ul className={styles['footer-groups']}>
                    {
                        footerData.map((footerGroup, index) => (
                            <li className={styles['group']} key={index}>
                                <div className={styles['group-name']}>{footerGroup.footerGroupName}</div>
                                <ul>
                                    {
                                        footerGroup.footerItems.map((footerItem, idx) => (
                                            <li key={idx}>{footerItem}</li>
                                        ))
                                    }
                                </ul>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
};

export default Footer;
