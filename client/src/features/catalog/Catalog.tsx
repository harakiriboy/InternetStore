import { Box, FormControl, FormControlLabel, Grid, Pagination, Paper, RadioGroup, Typography } from "@mui/material";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";



export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status, filtersLoaded} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [dispatch, productsLoaded])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded])

    if(status.includes('pending')) return <LoadingComponent message="Loading products..."/>


    return (
        <>
            <Grid item xs={12} sx={{mb: 5}}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3}/>
            <Grid item xs={9}>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography>
                        Displaying 1-6 of 20 items
                    </Typography>
                    <Pagination
                        sx={{mb: 5}}
                        color="secondary"
                        size='large'
                        count={10}
                        page={2}
                    />
                </Box>
            </Grid>
        </>
    )
}