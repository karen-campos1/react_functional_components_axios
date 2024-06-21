import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CharacterList.module.css';

const CharacterList = ({ onCharacterSelect }) => {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 21;
    const maxPageButtons = 10; // Maximum number of page buttons to display at once

    const fetchCharacters = async (page) => {
        const PUBLIC_KEY = '69cf9e7504dd40f4c331a1e19a26ae19';
        const HASH = 'a4be5d1619e0dc6b3af4a6cb42a267f8';
        const offset = (page - 1) * itemsPerPage;
        const url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}&offset=${offset}&limit=${itemsPerPage}`;

        try {
            const response = await axios.get(url);
            const newCharacters = response.data.data.results;
            setCharacters(newCharacters);
            setTotalPages(Math.ceil(response.data.data.total / itemsPerPage));
        } catch (error) {
            console.error('Error fetching data from Marvel API', error);
        }
    };

    useEffect(() => {
        fetchCharacters(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPageButtons = () => {
        const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        const pageButtons = [];
        for (let page = startPage; page <= endPage; page++) {
            pageButtons.push(
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
                >
                    {page}
                </button>
            );
        }

        return pageButtons;
    };

    return (
        <div>
            <div className={styles.characterList}>
                {characters.map(character => (
                    <div key={character.id} className={styles.characterItem}>
                        <h2>{character.name}</h2>
                        <img
                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                            alt={character.name}
                            className={styles.characterImage}
                            onClick={() => onCharacterSelect(character)}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={styles.pageButton}
                >
                    Previous
                </button>
                {renderPageButtons()}
                <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={styles.pageButton}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CharacterList;
