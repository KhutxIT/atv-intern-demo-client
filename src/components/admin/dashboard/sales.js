import {
  Box,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getDateStats } from '../../../action/admin';
import {
  getDatesFromLastMonthMiddleDateToNow, getLastMonthMiddleDate
} from '../../../utils';

import 'moment/locale/vi';
import moment from 'moment/moment';

moment().locale('vi');

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const Sales = (props) => {
  const [chartType, setChartType] = useState('');
  const [dateStats, setDateStats] = useState([]);
  const [filterDateStats, setFilterDateStats] = useState([]);

  useEffect(() => {
    getDateStats()
      .then((res) => {
        if (res.status === 200 && res.data?.data) {
          setDateStats(res.data.data);
          setFilterDateStats(onFilterDateStats(res.data.data));
        }
      })
      .catch(() => {});
  }, [chartType]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const onFilterDateStats = (dateStats) => {
    const tmpCurrentDate = new Date();
    const dateArray = [];
    let currentDate;
    currentDate = new Date(getLastMonthMiddleDate());
    const tmpDateStats = dateStats.map((item) => {
      item.date = moment(item.date).format('YYYY-MM-DD');
      return item;
    });
    if (chartType === 'TỔNG LƯỢT TRUY CẬP' || chartType === '') {
      while (currentDate <= tmpCurrentDate) {
        // eslint-disable-next-line no-loop-func
        const date = tmpDateStats.find(
          (date) => date.date === moment(currentDate).format('YYYY-MM-DD'),
        );
        const totalSignIn = date?.totalSignIn || 0;
        dateArray.push(totalSignIn);
        currentDate = currentDate.addDays(1);
      }
    }
    if (chartType === 'TỔNG NGƯỜI DÙNG MỚI') {
      while (currentDate <= tmpCurrentDate) {
        const date = tmpDateStats.find(
          (date) => date.date === moment(currentDate).format('YYYY-MM-DD'),
        );

        const totalNewUser = date?.totalNewUser || 0;
        dateArray.push(totalNewUser);
        currentDate = currentDate.addDays(1);
      }
    }
    if (chartType === 'TỔNG BÀI VIẾT ĐÃ ĐĂNG') {
      while (currentDate <= tmpCurrentDate) {
        const date = tmpDateStats.find(
          (date) => date.date === moment(currentDate).format('YYYY-MM-DD'),
        );

        const totalNewPost = date?.totalNewPost || 0;
        dateArray.push(totalNewPost);
        currentDate = currentDate.addDays(1);
      }
    }
    return dateArray;
  };

  const labels = getDatesFromLastMonthMiddleDateToNow();

  const data = {
    labels,
    datasets: [
      {
        label: chartType || 'TỔNG LƯỢT TRUY CẬP',
        data: filterDateStats,
        fill: false,
      },
    ],
  };

  const handleChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <Card {...props}>
      <div className="d-flex align-items-center justify-content-between mx-5 py-3">
        <div className="title">{chartType || 'TỔNG LƯỢT TRUY CẬP'}</div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Chọn biểu đồ</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chartType}
              label="Chọn biểu đồ"
              onChange={handleChange}
            >
              <MenuItem value="TỔNG LƯỢT TRUY CẬP">TỔNG LƯỢT TRUY CẬP</MenuItem>
              <MenuItem value="TỔNG NGƯỜI DÙNG MỚI">
                TỔNG NGƯỜI DÙNG MỚI
              </MenuItem>
              <MenuItem value="TỔNG BÀI VIẾT ĐÃ ĐĂNG">
                TỔNG BÀI VIẾT ĐÃ ĐĂNG
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <Divider />
      <Line options={options} data={data} />;
    </Card>
  );
};
