import React from "react";
import appStyles from './../styles/app.module.scss';
import styles from './../styles/about.module.scss';

const About = () => {
    return (
        <section className={styles['about']}>
            <div className={`${appStyles['container']} ${styles['container']}`}>
                <div className={styles['main-content']}>
                    <h2>WATCH EVERYWHERE</h2>
                    <h4>Stream unlimited movies and TV shows on your phone, tablet, laptop and TV without paying more.
                </h4>
                </div>
                <div className={styles['secondary']}>
                    <h4 className={styles['about-text']}>Netflix is a streaming service that allows our members to watch a wide variety of
                    award-winning TV shows, movies, documentaries and more on thousands of internet-connected devices.
                </h4>
                    <div className={`${styles['button']} ${styles['primary']}`}>Subscribe</div>
                </div>
            </div>
        </section>
    );
};

export default About;
