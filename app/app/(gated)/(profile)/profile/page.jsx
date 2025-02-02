'use client';

import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import Profile from '@/components/Profile';
import Delete from '@/app/(gated)/(profile)/delete/page';
import StickyHeadTable from '@/app/(gated)/(profile)/results/page';

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
    segment: 'integrations',
    title: 'Slet konto',
    icon: <DeleteIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
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
