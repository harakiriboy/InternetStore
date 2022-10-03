import { Grid } from "@mui/material";
import { useEffect } from "react";
import AppPagination from "../../app/components/AppPagination";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber } from "./catalogSlice";
import ProductList from "./ProductList";



export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, filtersLoaded, metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [dispatch, productsLoaded])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded])

    if(!filtersLoaded) return <LoadingComponent message="Loading products..."/>


    return (
        <>
            <Grid item xs={12} sx={{mb: 5}}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3}/>
            <Grid item xs={9}>
                {metaData && 
                    <AppPagination
                    metaData={metaData}
                    onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                />}
            </Grid>
        </>
    )
}