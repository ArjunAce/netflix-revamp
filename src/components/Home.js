import React from "react";
import appStyles from './../styles/app.module.scss';
import styles from './../styles/home.module.scss';
import logo from './../assets/images/logo.png';

const Home = () => {
    return (
        <section className={styles['home']}>
            <div className={`${appStyles['container']} ${styles['container']}`}>
                <nav>
                    <ul className={styles['nav-menu']}>
                        <li><a href="#" className={styles['logo']}>
                            <img src={logo} /></a>
                        </li>
                        <li><a href="#">Shows</a></li>
                        <li><a href="#">Schedule</a></li>
                        <li><a href="#">Live</a></li>
                        <li><a href="#">Search</a></li>
                    </ul>
                    <div className={styles['nav-buttons']}>
                        <div className={styles['button']}>Log in</div>
                        <div className={`${styles['button']} ${styles['primary']}`}> Subscribe</div>
                    </div>
                </nav >
                <div className={styles['main-content']}>
                    <h2>HOUSE OF CARDS</h2>
                    <h4>A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.</h4>
                    <div className={styles['cta']} > Watch</div >
                </div>
                <div className={styles['carousel-indicators']}>
                    <span className={styles['active']} ></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </section>
    );
};

export default Home;
