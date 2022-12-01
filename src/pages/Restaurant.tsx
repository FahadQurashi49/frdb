import { Box, Card, CardContent, Chip, Divider, ImageList, ImageListItem, List, ListItem, ListItemButton, ListItemText, Rating, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import LocationIcon from '@mui/icons-material/LocationOnSharp';
import Grid from '@mui/material/Unstable_Grid2';

import reviews from '../resource/review.json';
import reviewImgs from '../resource/review_imgs.json';

function Restaurant() {
  // const { restaurantId } = useParams();
  const imgPath = '/static/images/bbq.jpeg';
  const detailText = 'Located in Bahadurabad BBQ and grill house is the best restaurant in Karachi for BBQ and Kababs. Their BBQ platter is their seller and also grilled fish, Their BBQ platter is their seller and also grilled fish, Their BBQ platter is their seller and also grilled fish.';
  const rating = 2.5;
  return (
    <Box sx={{ mx: 5 }}>
      <Box sx={{ display: 'block', width: '100%', height: { md: 300, sm: 200, xs: 100 }, objectFit: 'cover' }} component='img' src={imgPath}></Box>

      <Stack spacing={1} my={2}>
        <Typography component='div' sx={{ typography: { md: 'h4', sm: 'h5', xs: 'h6' } }} >BBQ and Grill</Typography>
        <Stack direction='row'>
          <Rating name='read-only' value={rating} size='medium' precision={0.5} readOnly />
          <Box sx={{ ml: 0.5, typography: 'subtitle1' }}>
            {rating}/5 (8)
          </Box>

        </Stack>
        <Typography component='div' title={detailText}
          sx={{
            typography: { md: 'subtitle1', sm: 'subtitle2', xs: 'subtitle3' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical'
          }} >
          {detailText}
        </Typography>

        <Stack direction='row'>
          <Chip icon={<LocationIcon />} label='Bahadurabad, Karachi'></Chip>
        </Stack>
        <Divider variant='fullWidth' ></Divider>
        <Typography component='div' sx={{ typography: { sm: 'h5', xs: 'h6' } }} >
          Reviews
        </Typography>
        
        {reviews.map(review =>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem>
              <ListItemText
                secondary={
                  <Stack mt={0.5} spacing={2}>
                    <Box>
                      {review.review_text}
                    </Box>
                    
                    <ImageList
                      sx={{
                        gridAutoFlow: "column",
                        gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr)) !important",
                        gridAutoColumns: "minmax(150px, 1fr)"
                      }}
                    >
                      {reviewImgs.map((reviewImg) => (
                        
                          <ImageListItem key={reviewImg}>
                            <img
                              src={`${reviewImg}`}
                              srcSet={`${reviewImg}`}
                              loading="lazy"
                            />
                          </ImageListItem>
                        
                      ))}
                    </ImageList>
                  </Stack>
                }
              >
                <Stack spacing={0.5}>
                  <Box>
                    {review.user_name}
                  </Box>
                  <Rating name='read-only' value={review.rating} size='small' precision={0.5} readOnly />
                </Stack>
              </ListItemText>
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </List>
        )}
      </Stack>


    </Box>

  );
}

{/* <Grid xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography noWrap gutterBottom variant="h5" component="div">
                    {review.user_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.review_text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid> */}

export default Restaurant;