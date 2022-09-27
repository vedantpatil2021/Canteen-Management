import { useState } from "react";
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
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Course() {
  const [country, setCountry] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  }

  return (
    <>
      <Box sx={{ padding: '5px' }}>
        <Grid container spacing={1} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">Menu Items</Typography>
          </Grid>

          <Grid item>
            <Button variant="contained" size="small" sx={{ fontSize: '1rem' }} onClick={() => setShowAddModal(true)}>
              + Add Item
            </Button>
          </Grid>

        </Grid>

        <Typography sx={{marginTop: '3rem'}} variant="h5">Snacks</Typography>
        <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Sr. No.</Typography></TableCell>
                <TableCell align="left"><Typography variant="h6">Item</Typography></TableCell>
                <TableCell align="left" style={{ paddingLeft: 25 }}>
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, padding: 8 }}>
                <TableCell component="th" scope="row">
                </TableCell>
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

        <Typography sx={{marginTop: '3rem'}} variant="h5">Rolls</Typography>
        <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Sr. No.</Typography></TableCell>
                <TableCell align="left"><Typography variant="h6">Item</Typography></TableCell>
                <TableCell align="left" style={{ paddingLeft: 25 }}>
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, padding: 8 }}>
                <TableCell component="th" scope="row">
                </TableCell>
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

        <Typography sx={{marginTop: '3rem'}} variant="h5">Chinese</Typography>
        <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Sr. No.</Typography></TableCell>
                <TableCell align="left"><Typography variant="h6">Item</Typography></TableCell>
                <TableCell align="left" style={{ paddingLeft: 25 }}>
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, padding: 8 }}>
                <TableCell component="th" scope="row">
                </TableCell>
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

        <Typography sx={{marginTop: '3rem'}} variant="h5">Breakfast</Typography>
        <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Sr. No.</Typography></TableCell>
                <TableCell align="left"><Typography variant="h6">Item</Typography></TableCell>
                <TableCell align="left" style={{ paddingLeft: 25 }}>
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, padding: 8 }}>
                <TableCell component="th" scope="row">
                </TableCell>
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

        <Typography sx={{marginTop: '3rem'}} variant="h5">Rice Plates</Typography>
        <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Sr. No.</Typography></TableCell>
                <TableCell align="left"><Typography variant="h6">Item</Typography></TableCell>
                <TableCell align="left" style={{ paddingLeft: 25 }}>
                  <Typography variant="h6">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 }, padding: 8 }}>
                <TableCell component="th" scope="row">
                </TableCell>
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
            setCountry("");
          }}
          fullWidth={true}
          style={{ padding: '50px' }}
          maxWidth="sm">
          <DialogTitle variant="h4">Add Item</DialogTitle>
          <DialogContent style={{ padding: '10px' }}>
            <FormLabel sx={{ marginTop: '1rem' }}>Food Name</FormLabel>
            <TextField
              autoFocus
              sx={{ marginTop: '0.5rem' }}
              label="Food Name"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
            <FormControl sx={{ marginTop: '1rem' }} fullWidth size="small">
              <FormLabel>Category</FormLabel>
              <Select
                id="demo-select-small"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value="" selected>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <br></br>
            <FormControl>
              <FormLabel sx={{ marginTop: '0.6rem' }}>Price</FormLabel>
              <TextField
                autoFocus
                fullWidth
                sx={{ width: '100%' }}
                type="text"
                variant="outlined"
                size="small"
              />
            </FormControl><br></br>
            <FormControl sx={{ marginTop: '1rem' }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Veg" />
                <FormControlLabel value="male" control={<Radio />} label="Non-Veg" />
              </RadioGroup>
            </FormControl>
            <br></br>
            <FormControl sx={{ marginTop: '1rem' }}>
              <FormLabel>Add Image</FormLabel>
              <TextField
                autoFocus
                type="file"
                placeholder="Add Image"
                fullWidth
                size="small"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setShowAddModal(false);
                setCountry("");
              }}>
              Cancel
            </Button>
            <Button disabled={!country}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}