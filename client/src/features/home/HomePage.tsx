import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import Slider from "react-slick";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters } from "../catalog/catalogSlice";

export default function HomePage() {
    const {filtersLoaded} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded])

    return (
        <>
            <Box display='flex' justifyContent='center' sx={{mb: 4}}>
                <Typography variant='h3'>
                    WELCOME TO THE SHOP!
                </Typography>
            </Box>

            <Slider {...settings}>
                <div>
                    <img src="/images/cosmetics1.jpg" alt="cosm" style={{display: 'block', width: '100%', maxHeight: 500}} />
                </div>
                <div>
                    <img src="/images/cosmetics2.jpg" alt="cosm" style={{display: 'block', width: '100%', maxHeight: 500}} />
                </div>
                <div>
                    <img src="/images/cosmetics3.jpg" alt="cosm" style={{display: 'block', width: '100%', maxHeight: 500}} />
                </div>
            </Slider>
        </>
    )
}