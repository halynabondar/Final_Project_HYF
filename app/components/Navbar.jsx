'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Avatar } from '@mui/material';

const pages = ['Start', 'Om Os', 'Test'];
const userSettings = [
  {
    title: 'Min Profil',
    path: '/profile',
  },
  {
    title: 'Logge ud',
    path: '/signout',
  },
];

const visitorSettings = [
  {
    title: 'Logge ind',
    path: '/signin',
  },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userIcon, setUserIcon] = React.useState('/userImage.jpg');
  const [settings, setSettings] = React.useState(visitorSettings);
  const { data: session, status } = useSession();

  const fetchUserIcon = async () => {
    const response = await fetch(`/api/private/user/${session.user.email}`);
    if (response.ok) {
      const data = await response.json();
      setUserIcon(data.image);
    }
  };

  useEffect(() => {
    if (status === 'loading') return;

    if (session?.user) {
      setSettings(userSettings);
      fetchUserIcon();
    }
  }, [session?.user, status]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
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
    <AppBar position="static" className="bg-blue-900 px-10">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/start" passHref>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              DKTestPrep
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'flex',
                md: 'none',
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  className="pl-7 pr-12"
                >
                  <Link href={`/${page.toLowerCase().replace(/ /g, '-')}`}>
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <div className="flex w-full justify-center">
            <Link href="/start" passHref>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                DKTestPrep
              </Typography>
            </Link>
          </div>
          <Box
            sx={{
              textWrap: 'nowrap',
              flexGrow: 1,
              display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' },
              mr: 5,
              gap: 1,
            }}
          >
            {pages.map((page) => (
              <Link
                key={page}
                href={`/${page.toLowerCase().replace(/ /g, '-')}`}
                passHref
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 3,
                    color: 'white',
                    display: 'block',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      borderRadius: '8px',
                    },
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  src={userIcon}
                  alt="Profile"
                  sx={{
                    background: 'white',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    color: '#3B81F6',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link key={setting.path} href={setting.path} passHref>
                  <MenuItem onClick={handleCloseUserMenu} sx={{ pl: 3, pr: 8 }}>
                    <Typography
                      sx={{
                        textAlign: 'center',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      {setting.title}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
