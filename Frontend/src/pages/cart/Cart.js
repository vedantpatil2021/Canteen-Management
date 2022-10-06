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
import { useCart } from "react-use-cart";

export default function Course() {
    const {isEmpty,totalUniqueItems,items,totalItems,cartTotal,updateItemQuantity,removeItem,emptyCart} = useCart();
    if (isEmpty) return <h1 className=" text-center "> Your Cart is Empty </h1>;
    return (
        <>
            <Box sx={{ padding: '5px' }}>
                <Grid container spacing={1} justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h5">Cart Items {totalUniqueItems}</Typography>
                        <Typography variant="h5">Total Items {totalItems}</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => emptyCart()}><DeleteIcon/>&nbsp;&nbsp;Empty Cart</Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ marginTop: '5rem' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {items.map((item,index)=>{
                            return(
                                <Card sx={{ display: 'flex', flexDirection: 'row-reverse' }} key={index}>
                            <Box sx={{width:'100%', display: 'flex', flexDirection: 'row' }}>
                                <CardContent sx={{ flex: '1 0',flexDirection:'row' }}>
                                    <Typography component="div" variant="h4">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="h5" sx={{marginTop:'1rem'}} component="div">
                                        Price : {item.price}
                                    </Typography>
                                    <Typography variant="h5" sx={{marginTop:'1rem'}} component="div">
                                        Type : {item.type}
                                    </Typography>
                                    <Typography variant="h5" sx={{marginTop:'1rem'}} component="div">
                                        Category : {item.category}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ pl: 1, pb: 1 }}>
                                    <IconButton aria-label="previous">
                                        <DeleteIcon onClick={() => removeItem(item.id)}/>
                                    </IconButton>
                                    <ButtonGroup sx={{p:2}} variant="outlined" aria-label="outlined primary button group">
                                        <Button size="small" onClick={() =>
                                        updateItemQuantity(item.id, item.quantity + 1)
                                        }>+</Button>
                                        <Button size="small" disabled>{item.quantity}</Button>
                                        <Button size="small" onClick={() =>
                                        updateItemQuantity(item.id, item.quantity - 1)
                                        }>-</Button>
                                    </ButtonGroup>
                                </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: '350px' }}
                                image={item.image}
                            />
                        </Card>
                            )
                        })}
                        <Typography variant="h5">Total Price {cartTotal} ₹</Typography>
                        <Button onClick={console.log(items)}>Show items</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}