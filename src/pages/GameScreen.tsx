import { useLocation } from 'react-router-dom';
import PeacefulMode from './PeacefulMode';
import LetterMode from './LetterMode';
import CategoriesMode from "./CategoriesMode";

const GameScreen = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode') || 'peaceful';

    if (mode === 'peaceful') return <PeacefulMode />;
    if (mode === 'letter') return <LetterMode />;
    if (mode === 'categories') return <CategoriesMode/>;

    return <div>Unknown mode.</div>;
};

export default GameScreen;
