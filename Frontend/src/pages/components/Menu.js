import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import { db } from "../firebase/firebase";
import { collection,onSnapshot } from "firebase/firestore";
import ItemList from "./ItemList";
import { useState,useEffect } from "react";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";

export default function Course() {
  const { totalItems } = useCart();
  const [itm, setItm] = useState([]);
  const [cat, setCat] = useState([]);
  const [onfilter, setOFFfilter] = useState(false);
  const [newList, setNewList] = useState([]);

  const handleFilter = (e) =>{
    if(e.target.value==="All"){
      return setOFFfilter(false)
    }
    const updated = itm.filter((element)=>{
      return element.category === e.target.value;
    })
    setNewList(updated);
    setOFFfilter(true);
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "items"), (snapshot) => {
      // setUsers(snapshot.docs.map((doc) => doc.data())); //best method
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setItm(list);
    });
    return unsub;
  }, []);

  const getData = async () => {
    try {
      const res = await fetch("/getcategories", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
      const data = await res.json();
      setCat(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box sx={{ padding: '5px' }}>
        <Grid container spacing={1} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">Menu Items</Typography>
          </Grid>
          <Grid item>
            <Link to="/dashboard/student/cart">
              <Badge badgeContent={totalItems} color="primary">
                <AddShoppingCartIcon fontSize="large" />
              </Badge>
            </Link>
          </Grid>
        </Grid>
        <FormControl  sx={{ marginTop: "1rem" }} fullWidth size="medium">
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
                // onChange={(e) => setCategory(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Category"
                onChange={handleFilter}
              >
                <MenuItem value="All">All</MenuItem>
                {cat.map((item) => {
                  return (
                    <MenuItem         
                      // value={item.category + ""}
                      value={item.category + ""}
                      key={item.category + ""}
                      // key={Object.keys(item)[0]}
                    >
                      {item.category}
                    </MenuItem>
                  );
                })}
        </Select>
        </FormControl>
        {onfilter ? <ItemList itm={newList}></ItemList> : <ItemList itm={itm}></ItemList> }
        {/* <Typography sx={{ marginTop: '3rem' }} variant="h5">Snacks</Typography> */}
        
      </Box>
    </>
  );
}