import 'moment/locale/vi';
import moment from 'moment/moment';

moment().locale('vi');

export const convertDateToFromNow = (date) => {
  return moment(date).fromNow();
};

export const getLastMonth = () => {
  return moment().subtract(1, 'months').endOf('month').format('DD-MM-YYYY');
};

export const getLastMonthLastDate = () => {
  return moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
};

export const getLastMonthFirstDate = () => {
  return moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
};

export const getLastMonthMiddleDate = () => {
  let tmp = moment()
    .subtract(1, 'months')
    .startOf('month')
    .format('YYYY-MM-DD');
  tmp = replaceAtIndex(tmp, 8, '1');
  tmp = replaceAtIndex(tmp, 9, '5');
  return tmp;
};

const replaceAtIndex = (string, _index, _newValue) => {
  return (
    string.substring(0, _index) +
    _newValue +
    string.substring(_index + _newValue.length)
  );
};

export const getDatesFromLastMonthMiddleDateToNow = () => {
  const tmpCurrentDate = new Date();
  const dateArray = [];
  let currentDate;
  currentDate = new Date(getLastMonthMiddleDate());
  while (currentDate <= tmpCurrentDate) {
    dateArray.push(moment(new Date(currentDate)).format('DD-MM'));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
};
