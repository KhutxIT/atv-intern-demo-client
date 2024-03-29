import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

export const TotalNewUser = ({ totalNewUserInThisMonth }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Tổng người dùng mới
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {totalNewUserInThisMonth}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56,
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      {/* <Box sx={{ pt: 3 }}>
        <LinearProgress value={75.5} variant="determinate" />
      </Box> */}
    </CardContent>
  </Card>
);
