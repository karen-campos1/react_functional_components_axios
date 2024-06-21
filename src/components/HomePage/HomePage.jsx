import React from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <iframe
                src="https://player.vimeo.com/video/656086800"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className={styles.video}
                title="Vimeo Video"
            ></iframe>
        </div>
    );
};

export default HomePage;
