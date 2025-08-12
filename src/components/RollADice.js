import { useRef, useState } from 'react';
import Lottie from 'lottie-react';
import diceRoll from '../resource/lottie/dice6.json';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

function RollDice() {
    const lottieRef = useRef(null);
    const [isRolled, setIsRolled] = useState(false);
    const [number, setNumber] = useState(1);
    const [gallery, setGallery] = useState([]);
    function importAll(r) {
        return r.keys().map(r);
    }
    const imageList = importAll(require.context('../resource/dice', false, /\.png$/));

    const handleAddImage = (n) => {
        setGallery((prev) => [...prev, imageList[n - 1]]); // add new image to array
    };
    const handleRoll = () => {
        lottieRef.current.goToAndPlay(0, true);
        setIsRolled(true)
        const n = rollDice();
        handleAddImage(n)
        setNumber(n);
    };
    const handleDelete = () => {
        setGallery((prev) => prev.slice(0, -1));
    }
    const handleDeleteAll = () => {
        setGallery([]);
    };
    //start at the last frame of the animation
    const handleLoaded = () => {
        const totalFrames = lottieRef.current.getDuration(true);
        lottieRef.current.goToAndStop(totalFrames - 1, true);
    };

    const rollDice = () => {
        return Math.floor(Math.random() * 6) + 1;
    }
    return (
        <div className="text-center">
            <Container fluid className="vh-80 d-flex flex-column justify-content-center align-items-center">
                <Lottie
                    lottieRef={lottieRef}
                    animationData={diceRoll}
                    loop={false}
                    style={{ width: 150, height: 150 }}
                    onDOMLoaded={handleLoaded}
                    autoplay={false}
                />
                {isRolled && <h2>The generated number is {number}</h2>}
                {!isRolled && <h2>Click button to roll</h2>}

                <Container className="mt-3" style={{
                    width: "700px"
                }}>
                    {gallery.map((src, index) => (
                        <Image
                            key={index}
                            src={src}
                            alt={`Image ${index}`}
                            width="50"
                            height="50"
                            className="m-0"
                        />
                    ))}
                </Container>


                <Container className="m-3 d-flex gap-3 justify-content-center align-items-center">
                    <Button className="mt-3" onClick={handleRoll}>
                        Roll Dice
                    </Button>
                    <Button className="mt-3" variant='warning' onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button className="mt-3" variant='danger' onClick={handleDeleteAll}>
                        Delete All
                    </Button>
                </Container>
            </Container>
        </div>);
}

export default RollDice;