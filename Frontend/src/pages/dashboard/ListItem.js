import React from 'react';
import { useNavigate } from "react-router-dom";

//Main Imports
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from '@mui/material/Divider';


// Icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CancelIcon from '@mui/icons-material/Cancel';
import LogoutIcon from '@mui/icons-material/Logout';
// import { RoleContext } from '../../App';
// import { useContext,useEffect } from 'react';
// var role = "";
// useEffect(() => {
//     const getRole = () =>{
//         role = useContext(RoleContext);
//     }

//   return (
//     getRole()
//   )
// }, [])
const role = "student";
export const mainListItems = (
    
    <>
        {
            role ===  "canteen" && (
                <>
                    <ListButton icon={<DashboardIcon/>} title="Dashboard" link={`/dashboard/canteen`}/>
                    <ListButton icon={<ListAltIcon/>} title="Total Order" link={`/dashboard/canteen/total-order`}/>
                    <ListButton icon={<CancelIcon/>} title="Canceled Order" link={`/dashboard/canteen/cancelled-order`}/>
                    <ListButton icon={<MenuBookIcon/>} title="Menu" link={`/dashboard/canteen/menu-book`}/>
                    <ListButton icon={<CategoryIcon/>} title="Add Categories" link={`/dashboard/canteen/add-category`}/>
                    <Divider />
                    <ListButton icon={<LogoutIcon/>} title="Logout" link={`/dashboard/canteen/add-category`}/>
                </>
            )
        }
        {
            role ===  "student" && (
                <>
                    <ListButton icon={<DashboardIcon/>} title="Dashboard" link={`/dashboard/student`}/>
                    <ListButton icon={<ListAltIcon/>} title="Total Order" link={`/dashboard/student/total-order`}/>
                    <ListButton icon={<CancelIcon/>} title="Canceled Order" link={`/dashboard/student/cancelled-order`}/>
                    <ListButton icon={<MenuBookIcon/>} title="Menu" link={`/dashboard/student/menu`}/><Divider />
                    <ListButton icon={<LogoutIcon/>} title="Logout" link={`/dashboard/student/add-category`}/>
                </>
            )
        }
    </>
)


function ListButton({ icon, title, link }) {
    const navigate = useNavigate();
    const handleClick = () => navigate(link);
    return (
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    );
}
// const role = "canteen";
// const ListItem = () =>{
//     const role = useContext(RoleContext);
//     console.log(role);
//     return(
//         <>
//         {   
//             role ===  "canteen" && (
//                 <>
//                     <ListButton icon={<DashboardIcon/>} title="Dashboard" link={`/dashboard/canteen`}/>
//                     <ListButton icon={<ListAltIcon/>} title="Total Order" link={`/dashboard/canteen/total-order`}/>
//                     <ListButton icon={<CancelIcon/>} title="Canceled Order" link={`/dashboard/canteen/cancelled-order`}/>
//                     <ListButton icon={<MenuBookIcon/>} title="Menu" link={`/dashboard/canteen/menu-book`}/>
//                     <ListButton icon={<CategoryIcon/>} title="Add Categories" link={`/dashboard/canteen/add-category`}/>
//                     <Divider />
//                     <ListButton icon={<LogoutIcon/>} title="Logout" link={`/dashboard/canteen/add-category`}/>
//                 </>
//             )
//         }
//         {
//             role ===  "canteen" && (
//                 <>
//                     <ListButton icon={<DashboardIcon/>} title="Dashboard" link={`/dashboard/canteen`}/>
//                     <ListButton icon={<MenuBookIcon/>} title="Menu" link={`/dashboard/canteen/menu-book`}/>
//                     <ListButton icon={<CategoryIcon/>} title="Add Categories" link={`/dashboard/canteen/add-category`}/>
//                     <Divider />
//                     <ListButton icon={<LogoutIcon/>} title="Logout" link={`/dashboard/canteen/add-category`}/>
//                 </>
//             )
//         }
//     </>
//     )
// }
// export default ListItem;