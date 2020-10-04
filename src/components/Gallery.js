import React, { useState } from "react";
import appStyles from './../styles/app.module.scss';
import styles from './../styles/gallery.module.scss';
import dummyData from './../assets/dummy_shows.json';


const Gallery = () => {
    const carouselData = [
        { carouselName: 'Popular', data: dummyData.results.slice(5, 15) },
        { carouselName: 'New', data: dummyData.results.slice(15, 25) },
        { carouselName: 'Trending Today', data: dummyData.results.slice(25, 35), },
        { carouselName: 'All Time Hits', data: dummyData.results.slice(35, 45), }
    ];
    const [carouselPos, setCarouselPos] = useState(Array(carouselData.length).fill(0));
    const calculateCarouselPos = (index, direction) => {
        const tempPos = [...carouselPos];
        tempPos[index] += direction;
        console.log(tempPos);
        setCarouselPos(tempPos);
    }


    return (
        <section className={styles['gallery']}>
            <div className={`${appStyles['container']} ${styles['container']}`}>
                <ul>
                    {
                        carouselData.map((carousel, index) => (
                            <li className={styles['genre-container']} key={index}>
                                <div className={styles['genre-label']}>{carousel.carouselName}</div>
                                <div className={styles['carousel']}>
                                    <div className={`${styles['arrow']} ${styles['left']}`}
                                        onClick={calculateCarouselPos.bind(this, index, -1)}
                                        style={{ visibility: carouselPos[index] === 0 ? 'hidden' : 'visible' }}>
                                    </div>
                                    <div className={`${styles['arrow']} ${styles['right']}`}
                                        onClick={calculateCarouselPos.bind(this, index, 1)}
                                        style={{ visibility: carouselPos[index] === (carousel.data.length - 5) ? 'hidden' : 'visible' }}>
                                    </div>
                                    <ul>
                                        {
                                            carousel.data.map((item, idx) => (
                                                <li className={styles['movie-element']} key={idx}
                                                    style={{ marginLeft: idx !== 0 ? '0' : `${carouselPos[index] * -370}px` }}>
                                                    <div className={styles['thumb']}
                                                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${item['backdrop_path']})` }}>
                                                    </div>
                                                    <div className={styles['name']}>{item.name}</div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
};

export default Gallery;
