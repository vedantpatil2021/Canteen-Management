import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EggIcon from '@mui/icons-material/Egg';
import { Button, CardActions } from '@mui/material';
import "./CanteenDashboard.css";

const cards = [1,2,3,4];

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <Typography variant="h4" sx={{p:2}}>Current Orders</Typography>
        <Container sx={{ py: 1 }} maxWidth="xl">
          {/* End hero unit */}
          <Grid container spacing={6}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={9} md={4}>
                <Card 
                    className='respCard'
                >
                  <CardMedia
                    component="img"
                    image="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="random"
                    className='cardImg'
                    sx={{width:'200px'}}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant='h2'>25</Typography>
                    <Typography variant='p'>Name: <strong>Burger</strong></Typography><br></br>
                    <Typography variant='p'>Order By: <strong>Jay Pande</strong></Typography><br></br>
                    <Typography variant='p'>Payment Status: <span style={{color:'red'}}><strong>Pending</strong></span></Typography><br></br>
                    <Typography variant='p'>Type: <EggIcon sx={{color:'red'}}/></Typography><br></br>
                    <Typography variant='p'>Quantity: <strong>3</strong></Typography>
                    <CardActions sx={{mt: '1rem'}}>
                        <Button variant='contained'size="small">Delete</Button>
                        <Button variant='outlined'  size="small">Done</Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}