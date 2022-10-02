import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import InputLabel from '@mui/material/InputLabel';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { db, storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp,onSnapshot} from "firebase/firestore";
import SingleITEM from "./SingleITEM";
const initialState = {
  name: "",
  price: "",
  category: "",
  type: "",
};
export default function Course() {
  const [itm, setItm] = useState([]);
  const [radioval, setRadioVal] = useState('')
  const [namee, setName] = useState("");
  const [onfilter, setOFFfilter] = useState(false);
  const [loading, setLoading] = useState("");
  const [categoryy, setCategory] = useState("");
  const [pricee, setPrice] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [cat, setCat] = useState([]);
  const [data, setData] = useState(initialState);
  const [file, setFile] = useState("");
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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const uploadFile = () => {
      // const name = new Date().getTime() + file.name;
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default :
              break;
          }
        },
        (error) => {
          console.log("Error in uploading",error)
          },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, image: downloadURL }));
            console.log("File available at", downloadURL);
          });
        }
      );
      setLoading(false);
    };

    file && uploadFile();
  }, [file]);

  const handleSubmit = async () => {
    console.log("hey");
    data.name = namee;
    data.price = pricee;
    data.category = categoryy;
    data.type = radioval;
    setData(data);
    // console.log({ ...data });
    await addDoc(collection(db, "items"), {
      ...data,
      timestamp: serverTimestamp(),
    });
    setShowAddModal(false);
  };

  return (
    <>
      <Box sx={{ padding: "5px" }}>
        <Grid
          container
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4">Menu Items</Typography>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              size="small"
              sx={{ fontSize: "1rem" }}
              onClick={() => setShowAddModal(true)}
            >
              + Add Item
            </Button>
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
                
        {/* for display main list */}
        
        {onfilter ? <SingleITEM itm={newList}></SingleITEM> : <SingleITEM itm={itm}></SingleITEM> }

        {/* Model */}
        <Dialog
          open={showAddModal}
          sx={{ p: 5 }}
          onClose={() => {
            setShowAddModal(false);
          }}
          fullWidth={true}
          style={{ padding: "50px" }}
          maxWidth="sm"
        >
          <DialogTitle variant="h4">Add Item</DialogTitle>
          <DialogContent style={{ padding: "10px" }}>
            <FormControl component="form">
              <FormLabel sx={{ marginTop: "1rem" }}>Food Name</FormLabel>
              <TextField
                autoFocus
                sx={{ marginTop: "0.5rem" }}
                name="name"
                // value={name}
                onChange={(e) => setName(e.target.value)}
                label="Food Name"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
              />
            </FormControl>
            <FormControl sx={{ marginTop: "1rem" }} fullWidth size="small">
              <FormLabel>Category</FormLabel>
              <Select
                onChange={(e) => setCategory(e.target.value)}
                id="demo-select-small"
              >
                {cat.map((item) => {
                  return (
                    <MenuItem
                      value={item.category + ""}
                      key={item.category + ""}
                    >
                      {item.category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <br></br>
            <FormControl component="form">
              <FormLabel sx={{ marginTop: "0.6rem" }}>Price</FormLabel>
              <TextField
                autoFocus
                fullWidth
                // value={price}
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                sx={{ width: "100%" }}
                type="text"
                variant="outlined"
                size="small"
              />
            </FormControl>
            <br></br>
            <FormControl sx={{ marginTop: '1rem' }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                value={radioval}
                row
                onChange={(e)=>{
                  setRadioVal(e.target.value)
                }}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="Veg" name="radio" control={<Radio />} label="Veg" />
                <FormControlLabel value="Non-veg" name="radio" control={<Radio />} label="Non-Veg" />
              </RadioGroup>
            </FormControl>
            <br></br>
            <FormControl component="form" sx={{ marginTop: "1rem" }}>
            <FormLabel>Add Image</FormLabel>
            <Box sx={{ display: "flex" }}>
              <TextField
                autoFocus
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                placeholder="Add Image"
                fullWidth
                size="small"
              />
                &nbsp;&nbsp;
                {loading ? <CircularProgress variant="determinate" value={loading}/> : ""}
              </Box>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setShowAddModal(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
