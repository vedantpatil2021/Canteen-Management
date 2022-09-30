import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const initialState = {
  name: "",
  price: "",
  category: "",
};
export default function Course() {
  const [namee, setName] = useState("");
  const [loading, setLoading] = useState(null);
  const [categoryy, setCategory] = useState("");
  const [pricee, setPrice] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [cat, setCat] = useState([]);
  const [data, setData] = useState(initialState);
  // const { name, price, category } = data;
  const [file, setFile] = useState("");
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
          }
          setLoading(true);
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
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

  // const handleChange = (e) => {
  //   const datta = new FormData()
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async () => {
    console.log("hey");
    data.name = namee;
    data.price = pricee;
    data.category = categoryy;
    setData(data);
    // console.log({ ...data });
    await addDoc(collection(db, "items"), {
      ...data,
      timestamp: serverTimestamp(),
    });
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

        <Typography sx={{ marginTop: "3rem" }} variant="h5">
          Snacks
        </Typography>
        <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Sr. No.</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Item</Typography>
                </TableCell>
                <TableCell align="left" style={{ paddingLeft: 25 }}>
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  padding: 8,
                }}
              >
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">
                  <IconButton>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography sx={{ marginTop: "3rem" }} variant="h5">
          Rolls
        </Typography>
        <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Sr. No.</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Item</Typography>
                </TableCell>
                <TableCell align="left" style={{ paddingLeft: 25 }}>
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  padding: 8,
                }}
              >
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">
                  <IconButton>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography sx={{ marginTop: "3rem" }} variant="h5">
          Chinese
        </Typography>
        <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Sr. No.</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Item</Typography>
                </TableCell>
                <TableCell align="left" style={{ paddingLeft: 25 }}>
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  padding: 8,
                }}
              >
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">
                  <IconButton>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

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
                      // key={Object.keys(item)[0]}
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
            {/* <FormControl sx={{ marginTop: '1rem' }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" name="radio" control={<Radio />} label="Veg" />
                <FormControlLabel value="male" name="radio" control={<Radio />} label="Non-Veg" />
              </RadioGroup>
            </FormControl> */}
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
