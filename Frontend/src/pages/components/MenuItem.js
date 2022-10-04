import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import InputLabel from "@mui/material/InputLabel";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { db, storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import SingleITEM from "./SingleITEM";
import ImageViewer from "react-simple-image-viewer";

const initialState = {
  name: "",
  price: "",
  category: "",
  type: "",
};

export default function Course() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [itm, setItm] = useState([]);
  const [radioval, setRadioVal] = useState("");
  const [namee, setName] = useState("");
  const [onfilter, setOFFfilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryy, setCategory] = useState("");
  const [pricee, setPrice] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [cat, setCat] = useState([]);
  const [data, setData] = useState(initialState);
  const [file, setFile] = useState("");
  const [newList, setNewList] = useState([]);

  const showUpdate =(dataa) =>{
    setShowUpdateModal(true);
    console.log(dataa)
    setData(dataa);
  }

  const handleFilter = (event) => {
    if(event.target.value==="All"){
      return setOFFfilter(false)
    }
    const updated = itm.filter(element=>element.category===event.target.value);
    setNewList(updated);
    setOFFfilter(true);
  };

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
      const imgname = new Date().getTime() + file.name;
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + file.name + imgname);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setLoading(true);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log("Error in uploading", error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, image: downloadURL }));
            console.log("File available at", downloadURL);
            setLoading(false);
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleSubmit = async () => {
    if(showAddModal){
      data.name = namee;
      data.price = pricee;
      data.category = categoryy;
      data.type = radioval;
      if (!namee || !pricee || !categoryy || !radioval) {
        return alert("Enter all fields");
      }
      setData(data);
      await addDoc(collection(db, "items"), {
        ...data,
        timestamp: serverTimestamp(),
      });
      setShowAddModal(false);
    } 
    if(showUpdateModal){
      if(namee){data.name = namee;}
      if(pricee){data.price = pricee;}
      if(categoryy){data.category = categoryy;}
      if(radioval){data.type = radioval;}
      await updateDoc(doc(db, "items", data.id), {
        ...data,
        timestamp: serverTimestamp(),
      });
      setName("");
      setPrice("");
      setCategory("");
      setRadioVal("");
      setShowUpdateModal(false);
    }
  };

  const openImageViewer = () => {
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
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
        <FormControl sx={{ marginTop: "1rem" }} fullWidth size="medium">
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
                  value={item.category + "  "}
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

        {onfilter ? (
          <SingleITEM itm={newList} update={showUpdate}></SingleITEM>
        ) : (
          <SingleITEM itm={itm} update={showUpdate}></SingleITEM>
        )}

        {/* Model */}
        <Dialog
          open={showAddModal || showUpdateModal}
          sx={{ p: 5 }}
          onClose={() => {
            setShowAddModal(false);
            setShowUpdateModal(false);
          }}
          fullWidth={true}
          style={{ padding: "50px" }}
          maxWidth="sm"
        >
          {showUpdateModal ? <DialogTitle variant="h4">Update Item</DialogTitle> : <DialogTitle variant="h4">Add Item</DialogTitle>}  
          <DialogContent style={{ padding: "10px" }}>
            <FormControl component="form">
              <FormLabel sx={{ marginTop: "1rem" }}>Food Name</FormLabel>
              <TextField
                autoFocus
                sx={{ marginTop: "0.5rem" }}
                name="name"
                defaultValue={data.name}
                onChange={(e) => setName(e.target.value)}
                // label="Food Name"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
              />
            </FormControl>
            <FormControl sx={{ marginTop: "1rem" }} fullWidth size="small">
              <FormLabel>Category</FormLabel>
              <Select
                defaultValue={data.category}
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
                defaultValue={data.price}
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                sx={{ width: "100%" }}
                type="text"
                variant="outlined"
                size="small"
              />
            </FormControl>
            <br></br>
            <FormControl sx={{ marginTop: "1rem" }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                defaultValue={data.type}
                row
                onChange={(e) => {
                  setRadioVal(e.target.value);
                }}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Veg"
                  name="radio"
                  control={<Radio />}
                  label="Veg"
                />
                <FormControlLabel
                  value="Non-veg"
                  name="radio"
                  control={<Radio />}
                  label="Non-Veg"
                />
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
                {loading ? <CircularProgress /> : ""}
                {data.image && (
                  <Button onClick={() => openImageViewer()}>Preview</Button>
                )}
                {isViewerOpen && (
                  <ImageViewer
                    src={[data.image]}
                    onClose={closeImageViewer}
                    disableScroll={false}
                    backgroundStyle={{
                      backgroundColor: "rgba(0,0,0,0.9)",
                    }}
                    closeOnClickOutside={true}
                  />
                )}
              </Box>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setShowAddModal(false);
                setShowUpdateModal(false);
              }}
            >
              Cancel
            </Button>
            {showUpdateModal ? <Button type="submit" disabled={loading} onClick={handleSubmit}>
              Update
            </Button> :
            <Button type="submit" disabled={loading} onClick={handleSubmit}>
            Add
          </Button>}
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
