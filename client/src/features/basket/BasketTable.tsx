import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { BasketItem } from "../../app/models/basket";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";

interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}

export default function BasketTable({items, isBasket = true}: Props) {
    const dispatch = useAppDispatch();
    const {status} = useAppSelector(state => state.basket);
    return (
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            {isBasket && 
                            <TableCell align="right"></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                <Box display="flex" alignItems="center">
                                    <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                            <TableCell align="center">
                                {isBasket &&
                                <LoadingButton 
                                    loading={status === 'pending Remove Item' + item.productId + 'rem'} 
                                    onClick={() => dispatch(removeBasketItemAsync({
                                        productId: item.productId, quantity: 1, name: 'rem'
                                    }))} 
                                    color="error">
                                    <Remove/>
                                </LoadingButton>}
                                {item.quantity}
                                {isBasket &&
                                <LoadingButton 
                                    loading={status === 'pending Add Item' + item.productId} 
                                    onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))} 
                                    color="primary">
                                    <Add/>
                                </LoadingButton>}
                            </TableCell>
                            <TableCell align="right">{currencyFormat(item.quantity * item.price)}</TableCell>
                            {isBasket &&
                            <TableCell align="right">
                                <LoadingButton 
                                    loading={status === 'pending Remove Item' + item.productId + 'del'} 
                                    onClick={() => dispatch(removeBasketItemAsync({
                                        productId: item.productId, quantity: item.quantity, name: 'del'
                                    }))} 
                                    color='error'>
                                    <Delete/>
                                </LoadingButton>
                            </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}