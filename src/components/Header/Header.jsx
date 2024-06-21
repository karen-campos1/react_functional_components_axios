import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import marvelLogo from '../../assets/marvel-logo.png';

const Header = ({ title }) => {
    return (
        <header className={styles.header}>
            <img src={marvelLogo} alt="Marvel Logo" className={styles.logo} />
            <h1 className={styles.title}>{title}</h1>
            <nav>
                <Link to="/" className={styles.navLink}>Home</Link>
                <Link to="/characters" className={styles.navLink}>Characters</Link>
            </nav>
        </header>
    );
};

export default Header;
