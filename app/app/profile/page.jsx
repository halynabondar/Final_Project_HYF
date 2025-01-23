'use client';

import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ChatIcon from '@mui/icons-material/Chat';
import SecurityIcon from '@mui/icons-material/Security';
import DeleteIcon from '@mui/icons-material/Delete';
import Profile from '@/components/Profile';
import Messages from '@/components/Messages';
import Delete from '@/components/Delete';
import Security from '@/components/Security';
import StickyHeadTable from '@/components/Results';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Min Profil',
    icon: <AccountCircleIcon />,
  },
  {
    segment: 'orders',
    title: 'Resultathistorik',
    icon: <FormatListBulletedIcon />,
  },
  {
    segment: 'sales',
    title: 'Beskeder',
    icon: <ChatIcon />,
  },
  {
    segment: 'traffic',
    title: 'Sikkerhed',
    icon: <SecurityIcon />,
  },
  {
    segment: 'integrations',
    title: 'Slet konto',
    icon: <DeleteIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 950,
      md: 950,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export default function DashboardLayoutBasic() {
  const router = useDemoRouter('/dashboard');

  const renderPageContent = () => {
    switch (router.pathname) {
      case '/dashboard':
        return <Profile />;
      case '/orders':
        return <StickyHeadTable />;
      case '/sales':
        return <Messages />;
      case '/traffic':
        return <Security />;
      case '/integrations':
        return <Delete />;
      default:
        return <Profile />;
    }
  };

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
      <DashboardLayout>{renderPageContent()}</DashboardLayout>
    </AppProvider>
  );
}
