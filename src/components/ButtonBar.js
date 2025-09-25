import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function ButtonBar({handleAction, handleDelete, handleDeleteAll, move}){
    return(
    <Container className="m-3 d-flex gap-3 justify-content-center align-items-center">
        <Button className="mt-3" onClick={handleAction}>
            {move}
        </Button>
        <Button className="mt-3" variant='warning' onClick={handleDelete}>
            Delete
        </Button>
        <Button className="mt-3" variant='danger' onClick={handleDeleteAll}>
            Delete All
        </Button>
    </Container>);
}

export default ButtonBar;