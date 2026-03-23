import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, User, LogOut, Menu as MenuIcon } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleClose();
  };

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Activity className="mr-2" size={28} />
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          MediBridge
        </Typography>

        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user?.role === 'user' && (
              <>
                <Button color="inherit" component={Link} to="/user/dashboard" sx={{ display: { xs: 'none', md: 'block' } }}>
                  Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/user/symptom-analysis" sx={{ display: { xs: 'none', md: 'block' } }}>
                  Symptom Analysis
                </Button>
                <Button color="inherit" component={Link} to="/user/hospitals" sx={{ display: { xs: 'none', md: 'block' } }}>
                  Hospitals
                </Button>
                <Button color="inherit" component={Link} to="/user/reports" sx={{ display: { xs: 'none', md: 'block' } }}>
                  Reports
                </Button>
              </>
            )}
            
            {user?.role === 'hospital' && (
              <>
                <Button color="inherit" component={Link} to="/hospital/dashboard" sx={{ display: { xs: 'none', md: 'block' } }}>
                  Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/hospital/resources" sx={{ display: { xs: 'none', md: 'block' } }}>
                  Resources
                </Button>
                <Button color="inherit" component={Link} to="/hospital/patient-reports" sx={{ display: { xs: 'none', md: 'block' } }}>
                  Patient Reports
                </Button>
              </>
            )}

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <User />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>
                <Typography variant="body2">{user?.name}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogOut size={18} className="mr-2" />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button variant="outlined" color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
