import Lottie from 'lottie-react';


function LottieAnimation({lottieRef, handleLoaded, handleAction, width, height}) {
    return (
     <Lottie
        lottieRef={lottieRef}
        animationData={handleAction}
        loop={false}
        style={{ width: width, height: height }}
        onDOMLoaded={handleLoaded}
        autoplay={false}/>
    );
}

export default LottieAnimation;
