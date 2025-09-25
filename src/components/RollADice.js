import { useRef, useState } from 'react';
import diceRoll from '../resource/lottie/dice6.json';
import Container from 'react-bootstrap/Container';
import {importAll, rollDice} from '../util/dice_util'
import Gallery from './Gallery'
import ButtonBar from './ButtonBar';
import LottieAnimation from './LottieAnimation';

function RollDice() {
    const lottieRef = useRef(null);
    const [isRolled, setIsRolled] = useState(false);
    const [number, setNumber] = useState(1);
    const [numberList, setNumberList] = useState([]);
    
    const imageList = importAll(require.context('../resource/dice', false, /\.png$/));
    const gallery = numberList.map((n) => imageList[n-1])


    const handleRoll = () => {
        lottieRef.current.goToAndPlay(0, true);
        setIsRolled(true)
        const n = rollDice();
        setNumberList([...numberList, n]);
        setNumber(n);
    };
    const handleDelete = () => {
        setNumberList((prev) => prev.slice(0, -1));
    }
    const handleDeleteAll = () => {
        setNumberList([]);
    };
    
    //start at the last frame of the animation
    const handleLoaded = () => {
        const totalFrames = lottieRef.current.getDuration(true);
        lottieRef.current.goToAndStop(totalFrames - 1, true);
    };

    
    return (
        <div className="text-center">
            <Container fluid className="vh-80 d-flex flex-column justify-content-center align-items-center">
                <LottieAnimation lottieRef={lottieRef} handleLoaded={handleLoaded} handleAction={diceRoll} width={150} height={150} />
                {isRolled ? <h2>The generated number is {number}</h2> : <h2>Click button to roll</h2>}
                <Gallery gallery={gallery} width={50} height={50}/>
                <ButtonBar handleDelete={handleDelete} handleAction={handleRoll} handleDeleteAll={handleDeleteAll} move={'Roll a Dice'}/>
            </Container>
        </div>);
}

export default RollDice;