import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";

export default function Course() {
  return (
    <>
      <Box sx={{ padding: '5px' }}>
        <Grid container spacing={1} justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">Cancelled Orders</Typography>
          </Grid>
        </Grid>
        <TableContainer component={Paper} style={{ marginTop: 30 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Sr. No.</Typography></TableCell>
                <TableCell align="left"><Typography variant="h6">Item Name</Typography></TableCell>
                <TableCell align="left"><Typography variant="h6">Price</Typography></TableCell>
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
      </Box>
    </>
  );
}