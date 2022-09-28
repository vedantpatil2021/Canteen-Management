import { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
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
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";

var role = "canteen";

export default function Course() {
  // const navigate = useNavigate();
  const [cat, setCat] = useState([]);
  const [country, setCountry] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCat = async () => {
    try {
      const res = await fetch("/addcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: country,
        }),
      });

      const dataa = await res.json();

      if (dataa === "404") {
        return alert("Wrong");
      }
      if (dataa === "200") {
        alert("SUccess");
        setShowAddModal(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  const getData = async () =>{
    try{
      const res = await fetch("/getcategories",{
        method:"GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          credentials : "include"
        }
      })
      const data = await res.json();
      setCat(data);
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getData();
    console.log("hi")
  }, [showAddModal])
  

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
            <Typography variant="h4">Add Category</Typography>
          </Grid>
          {role === "canteen" && (
            <>
              <Grid item>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ fontSize: "1rem" }}
                  onClick={() => setShowAddModal(true)}
                >
                  + Add Category
                </Button>
              </Grid>
            </>
          )}
        </Grid>
        <TableContainer component={Paper} style={{ marginTop: 30 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Sr. No.</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Category</Typography>
                </TableCell>
                <TableCell align="left" style={{ paddingLeft: 25 }}>
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cat.map((item,index)=>{
                return(
                  <TableRow 
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    padding: 8,
                  }}
                >
                  <TableCell component="th" scope="row">{index+1}</TableCell>
                  <TableCell align="left">{item.category}</TableCell>
                  <TableCell align="left">
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
                )  
              })}
              
            </TableBody>
          </Table>
        </TableContainer>

        {/* Model */}
        <Dialog
          open={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setCountry("");
          }}
          fullWidth={true}
          style={{ padding: "50px" }}
          maxWidth="sm"
        >
          <DialogTitle>Add Category</DialogTitle>
          <DialogContent style={{ padding: "10px" }}>
            <form>
              <TextField
                autoFocus
                label="Category"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setShowAddModal(false);
                setCountry("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCat} disabled={!country}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setCountry("");
          }}
          fullWidth={true}
          maxWidth="xs"
        >
          <DialogTitle style={{ paddingBottom: 0 }}>Edit Religion</DialogTitle>
          <DialogContentText></DialogContentText>
          <DialogContent>
            <TextField
              autoFocus
              label="Religion"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setShowEditModal(false);
                setCountry("");
              }}
            >
              Cancel
            </Button>
            <Button disabled={!country}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}