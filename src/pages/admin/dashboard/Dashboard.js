import { Box, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getGeneralStats } from '../../../action/admin';
import { Sales } from '../../../components/admin/dashboard/sales';
import { TotalActiveUser } from '../../../components/admin/dashboard/TotalActiveUser';
import { TotalNewPost } from '../../../components/admin/dashboard/TotalNewPost';
import { TotalNewUser } from '../../../components/admin/dashboard/TotalNewUser';
import { TotalSignIn } from '../../../components/admin/dashboard/TotalSignIn';

const Dashboard = () => {
  const [generalStats, setGeneralStats] = useState({
    totalActiveUser: 0,
    totalNewUserInThisMonth: 0,
    totalSignInInThisMonth: 0,
    totalNewPostInThisMonth: 0,
  });
  const user = useSelector((state) => state.user?.data);

  useEffect(() => {
    getGeneralStats()
      .then((res) => {
        if (res.data?.data && res.status === 200) {
          setGeneralStats(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="accountant-header">
        <h2 className="ml-4">Thống kê hệ thống</h2>
        <div className="accountant-header__right">
          <p>Xin chào "{user.name}"</p>
        </div>
      </div>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalSignIn
                totalSignInInThisMonth={generalStats.totalSignInInThisMonth}
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalActiveUser totalActiveUser={generalStats.totalActiveUser} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalNewUser
                totalNewUserInThisMonth={generalStats.totalNewUserInThisMonth}
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalNewPost
                totalNewPostInThisMonth={generalStats.totalNewPostInThisMonth}
              />
            </Grid>
            <Grid item lg={12} md={12} xl={9} xs={12}>
              <Sales />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
