import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

function Gallery({ gallery, width, height }) {
  return (
    <Container className="mt-3" style={{ width: "700px" }}>
      {gallery.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Image ${index}`}
          width={width}
          height={height}
          className="m-0"
        />
      ))}
    </Container>
  );
}

export default Gallery;
