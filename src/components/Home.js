import React, { useState } from "react";
import appStyles from './../styles/app.module.scss';
import styles from './../styles/home.module.scss';
import logo from './../assets/images/logo.png';
import dummyData from './../assets/dummy_shows.json';

const Home = () => {
    const data = dummyData.results.slice(0, 5);
    const [activeSlide, setActiveSlide] = useState(0);

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
                <div className={styles['slides']}>
                    {
                        data.map((item, index) => (
                            <div className={styles['slide-content']} key={index} style={{
                                backgroundImage: `linear-gradient(#111c, #111c), url(https://image.tmdb.org/t/p/original/${item['backdrop_path']})`,
                                marginLeft: index === 0 ? `${activeSlide * -100}%` : null
                            }}>
                                <div className={`${appStyles['container']}`}>
                                    <h2>{item.name}</h2>
                                    <h4>{item.overview}</h4>
                                    <div className={styles['cta']}>Watch</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={styles['carousel-indicators']}>
                    {
                        data.map((item, index) => (
                            <span className={activeSlide === index ? styles['active'] : null} key={index} onClick={setActiveSlide.bind(this, index)}></span>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Home;
