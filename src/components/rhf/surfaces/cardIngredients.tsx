import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import Icon from '@mdi/react';
import { mdiHops } from '@mdi/js';
import { mdiYeast } from '@mdi/js';
import { mdiBarley } from '@mdi/js';
import { mdiPotMix } from '@mdi/js';
import { mdiFoodVariant } from '@mdi/js';

export default function RecipeReviewCard({ buddy }: any) {

  return (
    <Card sx={{ /* maxWidth: 345 */ minHeight: 200 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Icon path={mdiBarley} size={1} />
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        {buddy}
      </CardContent>
    </Card>
  );
}