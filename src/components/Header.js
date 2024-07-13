// REACT
import * as React from "react";

// MATERIAL UI COMPONENTS
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// Logo
import logo from "../assets/image001.png";

const pages = ["Home", "Filter"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  // ======== STATES ========= //
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // Header Component
    <AppBar position="static" style={{ backgroundColor: "#1e1d1d" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div style={{ minWidth: "15%", padding: "20px" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "90px", height: "25px" }}
            />
          </div>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            style={{ backgroundColor: "white" }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: "bold",
                  fontSize: "20px",
                  padding: "5px 15px",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "purple" }}>M</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
