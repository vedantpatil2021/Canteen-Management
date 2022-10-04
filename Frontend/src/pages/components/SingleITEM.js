import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import {doc, deleteDoc} from 'firebase/firestore'
import { db } from "../firebase/firebase";
import veg from "../images/icons8-vegetarian-food-symbol-48.png"
import nonveg from "../images/icons8-non-vegetarian-food-symbol-48.png"

const SingleITEM = (props) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Sr. No.</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Image</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Item</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Price</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Type</Typography>
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
            {/* {props.itm===false && <TableRow>"bello"</TableRow>} */}
            {props.itm.length===0 && <TableRow>EMPTY</TableRow>}
            {props.itm.map((item,index)=>{
                return(
                    <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  padding: 8,
                }}
              >
                <TableCell component="th" scope="row">{index+1}</TableCell>
                <TableCell align="left"><img src={item.image} alt="Sorry pic not availble" width="50px" height="50px"/></TableCell>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">{item.price}</TableCell>
                {item.type === "Veg" ? <TableCell align="left"><img src={veg} alt="" /></TableCell> : <TableCell align="left"><img src={nonveg} alt=""/></TableCell>}
                <TableCell align="left">{item.category}</TableCell>
                <TableCell align="left">
                  <IconButton>
                    <EditIcon fontSize="small" onClick={()=>props.update(item)} />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon fontSize="small" onClick={async()=>{
                      alert("Are u sure u wanna delete it")
                      await deleteDoc(doc(db, "items",item.id))
                    }}/>
                  </IconButton>
                </TableCell>
              </TableRow>     
                )
            })}
            </TableBody>
          </Table>
        </TableContainer>
  )
}

export default SingleITEM;