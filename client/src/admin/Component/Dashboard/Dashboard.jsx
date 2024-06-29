import React from 'react';
import { Box, Stack, Paper, Typography } from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import UsersChart from '../UsersChart/UsersChart';
import BooksPieChart from '../BooksPieChart/BooksPieChart';

const Dashboard = () => {
  return (
    <>
      <Box>
        <Typography variant='h5'>Dashboard</Typography>

        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
          <Paper sx={{ width: "20%", backgroundColor: "white", display: "flex", gap: 1, alignItems: "center", p: 3, borderRadius: "3px" }} elevation={2}>
            <Stack sx={{ backgroundColor: "#e1f5fe", width: "10%", padding: 2, borderRadius: "50%" }}>
              <GroupAddIcon color="primary" fontSize="medium" />
            </Stack>
            <Stack direction="column">
              <Typography variant="h6">10</Typography>
              <Typography sx={{ color: "#7a7287" }}>New Customer</Typography>
            </Stack>
          </Paper>

          <Paper sx={{ width: "20%", backgroundColor: "white", display: "flex", gap: 1, alignItems: "center", p: 3, borderRadius: "3px" }} elevation={2}>
            <Stack sx={{ backgroundColor: "#d9f9dd", width: "10%", padding: 2, borderRadius: "50%" }}>
              <ShoppingCartIcon color="success" fontSize="medium" />
            </Stack>
            <Stack direction="column">
              <Typography variant="h6">10</Typography>
              <Typography sx={{ color: "#7a7287" }}>Category</Typography>
            </Stack>
          </Paper>

          <Paper sx={{ width: "20%", backgroundColor: "white", display: "flex", gap: 1, alignItems: "center", p: 3, borderRadius: "3px" }} elevation={2}>
            <Stack sx={{ backgroundColor: "#d9f9dd", width: "10%", padding: 2, borderRadius: "50%" }}>
              <PaymentIcon color="success" fontSize="medium" />
            </Stack>
            <Stack direction="column">
              <Typography variant="h6">20</Typography>
              <Typography sx={{ color: "#7a7287" }}>New Transaction</Typography>
            </Stack>
          </Paper>

          <Paper sx={{ width: "20%", backgroundColor: "white", display: "flex", gap: 1, alignItems: "center", p: 3, borderRadius: "3px" }} elevation={2}>
            <Stack sx={{ backgroundColor: "#fbe1e1", width: "10%", padding: 2, borderRadius: "50%" }}>
              <AttachMoneyIcon color="error" fontSize="medium" />
            </Stack>
            <Stack direction="column">
              <Typography variant="h6">20</Typography>
              <Typography sx={{ color: "#7a7287" }}>New Transaction</Typography>
            </Stack>
          </Paper>
        </Box>

        <Stack direction={"row"} alignItems="center" gap={2} sx={{ mt : 2}}>
        
        <Box>
          <UsersChart />
        </Box>

        <Box>
          <BooksPieChart />
        </Box>
        </Stack>
      </Box>
    </>
  )
}

export default Dashboard