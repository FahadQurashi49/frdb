import { Box, Button, Chip, Divider, Rating, Snackbar, SnackbarContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import LocationIcon from '@mui/icons-material/LocationOnSharp';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import { Outlet, useLoaderData, useNavigate, useNavigation, useOutletContext, useSearchParams } from "react-router-dom";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef, SyntheticEvent, useState } from "react";

import { Restaurant as RestaurantModel } from "../models/Restaurant";
import { isUserLoggedIn } from "../services/UserService";



function Restaurant() {
  const restaurant = useLoaderData() as RestaurantModel;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { loginDialogOpen } = useOutletContext() as any;
  const [searchParams] = useSearchParams();
  const reviewAddStatus = searchParams.get('reviewAdd');
  const [openSnackBar, setOpenSnackbar] = useState(!!reviewAddStatus);
  const imgPath = `/static/images/restaurants/${restaurant.name}.jpeg`;

  const handleAddReviewButtonClick = () => {
    const redirectTo = `/restaurant/${restaurant.id}/review/add`;
    if (isUserLoggedIn()) {
      navigate(redirectTo);
    } else {
      loginDialogOpen(redirectTo);
    }
  };

  const handleSnackBarClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };


  const getSnackBarStatus = () => {
    switch(reviewAddStatus) {
      case 'success':
        return 'success';
      case 'failure':
        return 'error'
      case 'badReq':
        return 'warning';
      case 'logout':
        return 'info';
    }
  };

  const getSnackBarStatusMsg = () => {
    switch(reviewAddStatus) {
      case 'success':
        return 'Successfully added review!';
      case 'failure':
        return 'Something went wrong while adding review'
      case 'badReq':
        return 'Bad request';
      case 'logout':
        return 'Please login to add a review';
    }
  };

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Box sx={{ mx: 5 }}>
      <Box sx={{ display: 'block', width: '100%', height: { md: 300, sm: 200, xs: 100 }, objectFit: 'cover' }} component='img' src={imgPath}></Box>

      <Stack spacing={1} my={2}>
        <Typography component='div' 
          sx={{ typography: { md: 'h4', sm: 'h5', xs: 'h6' } }} >
            {restaurant.name}
        </Typography>
        <Stack direction='row'>
          <Rating name='read-only' value={restaurant.avgRating} size='medium' precision={0.1} readOnly />
          <Box sx={{ ml: 0.5, typography: 'subtitle1' }}>
            {restaurant.avgRating}/5 ({restaurant.totalRatings})
          </Box>
        </Stack>
        <Typography component='div' title={restaurant.description}
          sx={{
            typography: { md: 'subtitle1', sm: 'subtitle2', xs: 'subtitle3' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical'
          }} >
          {restaurant.description}
        </Typography>
        <Stack direction='row'>
          <Chip icon={<LocationIcon />} label={`${restaurant.area}, ${restaurant.city}`}></Chip>
        </Stack>
        <Divider variant='fullWidth' ></Divider>
        <Stack direction='row' justifyContent='space-between'>
          <Typography component='div' sx={{ typography: { sm: 'h5', xs: 'h6' } }} >
            Reviews
          </Typography>
          <Button onClick={handleAddReviewButtonClick} disableElevation size='small' variant='contained' startIcon={<RateReviewOutlinedIcon/>} >
            Write a review
          </Button>
        </Stack>
        {navigation.state === 'loading' && <div>Loading .....</div>}
        {navigation.state === 'idle' && <Outlet />}
      </Stack>
      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose}>
        <Alert severity={getSnackBarStatus()} onClose={handleSnackBarClose} sx={{ width: '100%' }}>
          {getSnackBarStatusMsg()}
        </Alert>
      </Snackbar>


    </Box>

  );
}

export default Restaurant;