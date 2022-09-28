import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Course() {

    return (
        <>
            <Box sx={{ padding: '5px' }}>
                <Grid container spacing={1} justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">Cart Items</Typography>
                    </Grid>
                    <Grid item>
                        <Button><DeleteIcon />&nbsp;&nbsp;Empty Cart</Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ marginTop: '5rem' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <Box sx={{width:'100%', display: 'flex', flexDirection: 'row' }}>
                                <CardContent sx={{ flex: '1 0',flexDirection:'row' }}>
                                    <Typography component="div" variant="h4">
                                        French Fries
                                    </Typography>
                                    <Typography variant="h5" sx={{marginTop:'1rem'}} component="div">
                                        Price :
                                    </Typography>
                                    <Typography variant="h5" sx={{marginTop:'1rem'}} component="div">
                                        Type :
                                    </Typography>
                                    <Typography variant="h5" sx={{marginTop:'1rem'}} component="div">
                                        Category :
                                    </Typography>
                                </CardContent>
                                <Box sx={{ pl: 1, pb: 1 }}>
                                    <IconButton aria-label="previous">
                                        <DeleteIcon />
                                    </IconButton>
                                    <ButtonGroup sx={{p:2}} variant="outlined" aria-label="outlined primary button group">
                                        <Button size="small">+</Button>
                                        <Button size="small" disabled>1</Button>
                                        <Button size="small">-</Button>
                                    </ButtonGroup>
                                </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: '350px' }}
                                image="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Live from space album cover"
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}