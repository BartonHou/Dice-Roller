import { useRef, useState } from 'react';
import Lottie from 'lottie-react';
import cardDeck from '../resource/lottie/card_deck.json';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

function DrawCard() {
    const lottieRef = useRef(null);
    const [haveDrawn, sethaveDrawn] = useState(false);
    const [name, setName] = useState([]);
    const [gallery, setGallery] = useState([]);

    function importAll(r) {
        const images = {};
        r.keys().forEach((fileName) => {
            const name = fileName.replace('./', '').replace('.png', ''); // e.g. "1D"
            images[name] = r(fileName);
        });
        return images;
    }

    const imageList = importAll(require.context('../resource/cards', false, /\.png$/));
    const suits = ['H', 'D', 'S', 'C'];
    const deck = suits.map(suit => {
        return Array.from({ length: 13 }, (_, i) => imageList[`${i + 1}${suit}`]);
    }).flat();

    const handleAddImage = (n) => {
        setGallery((prev) => [...prev, deck[n - 1]]); // add new image to array
    };
    const handleDraw = () => {
        lottieRef.current.goToAndPlay(0, true);
        sethaveDrawn(true)
        const n = drawCard();
        handleAddImage(n)
        const newName = determineCard(n);
        setName(newName);
    };

    const determineCard = (n) => {
        var name = '';
        const denomination = n % 13;
        switch (denomination){
            case 0:
                name = 'King'
                break;
            case 1:
                name = 'Ace';
                break;
            case 11:
                name = 'Jack'
                break;
            case 12:
                name = 'Queen'
                break;
            default:
                name = denomination;
                break;
        }
        name += ' of ';
        var suit = Math.floor(n / 13);
        if(n%13===0)
        {
            suit--;
        }
        switch(suit){
            case 0:
                name += 'hearts';
                break;
            case 1:
                name += 'diamonds';
                break;
            case 2:
                name += 'spades';
                break;
            case 3:
                name += 'clubs';
                break;
            
        }
        return name;
    };
    const handleDelete = () => {
        setGallery((prev) => prev.slice(0, -1));
    };

    const handleDeleteAll = () => {
        setGallery([]);
    };
    //start at the last frame of the animation
    const handleLoaded = () => {
        const totalFrames = lottieRef.current.getDuration(true);
        lottieRef.current.goToAndStop(totalFrames - 1, true);
    };

    const drawCard = () => {
        return Math.floor(Math.random() * 52) + 1;
    }
    return (
        <div className="text-center">
            <Container fluid className="vh-80 d-flex flex-column justify-content-center align-items-center">
                <Lottie
                    lottieRef={lottieRef}
                    animationData={cardDeck}
                    loop={false}
                    style={{ width: 100, height: 100 }}
                    onDOMLoaded={handleLoaded}
                    autoplay={false}
                />
                {haveDrawn && <h2>The generated card is {name}</h2>}
                {!haveDrawn && <h2>Click button to Draw</h2>}

                <Container className="mt-3" style={{
                    width: "700px"
                }}>
                    {gallery.map((src, index) => (
                        <Image
                            key={index}
                            src={src}
                            alt={`Image ${index}`}
                            width="50"
                            height="70"
                            className="m-0"
                        />
                    ))}
                </Container>

                <Container className="m-3 d-flex gap-3 justify-content-center align-items-center">
                    <Button className="mt-3" onClick={handleDraw}>
                        Draw a card
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

export default DrawCard;