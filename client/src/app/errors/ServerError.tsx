import { Button, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function ServerError() {

    return (
        <Container component={Paper}>
            {/* {state?.error ? (
                <>
                    <Typography variant='h3' color='error' gutterBottom>{state.error.title}</Typography>
                    <Divider/>
                    <Typography>{state.error.detail || 'Internal server error'}</Typography>
                </>
            ) : (
                <Typography variant='h5' gutterBottom>Server error</Typography>
            )} */}
            <Button component={Link} to='/catalog'>Go back to the store</Button>
        </Container>
    )
}