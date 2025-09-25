import { useRef, useState } from 'react';
import cardDeck from '../resource/lottie/card_deck.json';
import Container from 'react-bootstrap/Container';
import {importAll, determineCard, drawCard} from '../util/card_util'
import ButtonBar from './ButtonBar';
import LottieAnimation from './LottieAnimation';
import Gallery from './Gallery';

function DrawCard() {
    const lottieRef = useRef(null);
    const [haveDrawn, sethaveDrawn] = useState(false);
    const [number, setNumber] = useState(0);
    const [textDisplay, setTextDisplay] = useState(true);
    const [numberList, setNumberList] = useState([]);
    const imageList = importAll(require.context('../resource/cards', false, /\.png$/));
    const gallery = numberList.map((n) => imageList[n-1])
    const name = textDisplay ? determineCard(number): determineCard(number, {useSymbols:false});
    const handleDraw = () => {
        lottieRef.current.goToAndPlay(0, true);
        sethaveDrawn(true)
        const n = drawCard();
        setNumberList([...numberList, n]);
        setNumber(n);
    };

    const handleDelete = () => {
        setNumberList((prev) => prev.slice(0, -1));
    };

    const handleDeleteAll = () => {
        setNumberList([]);
    };

    const handleLoaded = () => {
        const totalFrames = lottieRef.current.getDuration(true);
        lottieRef.current.goToAndStop(totalFrames - 1, true);
    };
    return (
        <div className="text-center">
            <Container fluid className="vh-80 d-flex flex-column justify-content-center align-items-center">
                <LottieAnimation lottieRef={lottieRef} handleLoaded={handleLoaded} handleAction={cardDeck} width={100} height={100} />
                {haveDrawn ? <h2>The generated card is <div onClick={()=>setTextDisplay(!textDisplay)}>{name}</div></h2> : <h2>Click button to Draw</h2>}
                <Gallery gallery={gallery} width={50} height={75}/>
                <ButtonBar handleDelete={handleDelete} handleAction={handleDraw} handleDeleteAll={handleDeleteAll} move={'Draw a Card'}/>
            </Container>
        </div>);
}

export default DrawCard;