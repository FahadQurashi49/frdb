import { Divider, ImageList, ImageListItem, List, ListItem, ListItemText, Rating } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useLoaderData } from "react-router-dom";
import { Review } from "../models/Review";

import reviewImgs from '../resource/review_imgs.json';


function ReviewsList() {
    const reviews = useLoaderData() as Review[];
    const showImgList = false;
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {reviews.map((review, index) =>
            <ListItem>
              <ListItemText
                secondary={
                  <Stack mt={0.5} spacing={2}>
                    <Box>
                      {review.reviewText}
                    </Box>
                    {reviewImgs && showImgList &&
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
                              alt=''
                              loading="lazy"
                            />
                          </ImageListItem>

                        ))}
                      </ImageList>}
                    <Divider variant="fullWidth" />
                  </Stack>
                }
              >
                <Stack spacing={0.5}>
                  <Box>
                    {review.userId}
                  </Box>
                  <Rating name='read-only' value={review.rating} size='small' precision={0.5} readOnly />
                </Stack>
              </ListItemText>
            </ListItem>
          )}
        </List>
    );
}

export default ReviewsList;