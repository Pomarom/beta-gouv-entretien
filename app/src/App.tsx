import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Breadcrumbs,
  Container,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import DataTable from "./components/DataTable";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink
} from "react-router-dom";
import { FicheDetail } from "./components/FicheDetail";
function App() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Mission Apprentissage
          </Typography>
        </Toolbar>
      </AppBar>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
      </Breadcrumbs>
      <Container>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<DataTable />}
            />
            <Route
              path="fiche/:id"
              element={<FicheDetail />}
            />
          </Routes>
          
        </Router>

      </Container>
    </Container>
  );
}

export default App;
