import { Box, Skeleton } from '@mui/material'

export default function ProductSkeleton() {
  return (
    // <Grid item xs component={Card} sx={{display: 'flex', flexDirection: 'column'}}>
    //     <Skeleton variant="rounded" width={210} height={60} />
    //     <Skeleton variant="rectangular" width={210} height={60} />
    // </Grid>
    <Box display='flex' flexDirection='column' justifyContent='space-between' alignItems='center'>
        <Skeleton animation="wave" variant="rounded" width={350} height={330} sx={{mb: 1}} />
        <Skeleton animation="wave" variant="rectangular" width={350} height={80} />
    </Box>
  )
}
