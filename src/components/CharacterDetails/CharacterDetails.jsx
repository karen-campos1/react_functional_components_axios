import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CharacterDetails.module.css';

const CharacterDetails = ({ characterId, onClose }) => {
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacterDetail = async () => {
            if (!characterId) return;

            const PUBLIC_KEY = '69cf9e7504dd40f4c331a1e19a26ae19';
            const HASH = 'a4be5d1619e0dc6b3af4a6cb42a267f8';
            const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`;

            try {
                const response = await axios.get(url);
                setCharacter(response.data.data.results[0]);
            } catch (error) {
                console.error('Error fetching character detail from Marvel API', error);
            }
        };

        fetchCharacterDetail();
    }, [characterId]);

    if (!character) return <div className={styles.characterDetails}>Select a character to see details</div>;

    return (
        <div className={styles.characterDetails}>
            <button onClick={onClose} className={styles.closeButton}>Close</button>
            <h2>{character.name}</h2>
            <p>{character.description || 'No description available'}</p>
            <h3>Comics</h3>
            <ul>
                {character.comics.items.map(comic => (
                    <li key={comic.resourceURI}>{comic.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterDetails;
