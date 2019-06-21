// 获取两个日期之间的集合
export const getDateMap = (startDate, endDate) => {
  const dateList = [];
  //处理成一天中数据为一个点，而非一条直线
  if (formatDateTime(new Date(startDate).getTime()) != formatDateTime(new Date(endDate).getTime())) {
    dateList.push(formatDateTime(new Date(startDate).getTime()));
  }
  while (true) {
    startDate.setDate(startDate.getDate() + 1);
    if (startDate.getTime() < endDate.getTime()) {
      dateList.push(formatDateTime(new Date(startDate).getTime()));
    } else {
      break;
    }
  }
  dateList.push(formatDateTime(new Date(endDate).getTime()));
  return dateList;
};
// 时间戳转时间格式‘yyyy-mm-dd’
export const formatDateTime = timeStamp => {
  var date = new Date();
  date.setTime(timeStamp);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  // var h = date.getHours();
  // h = h < 10 ? ('0' + h) : h;
  // var minute = date.getMinutes();
  // var second = date.getSeconds();
  // minute = minute < 10 ? ('0' + minute) : minute;
  // second = second < 10 ? ('0' + second) : second;
  return y + "-" + m + "-" + d;
};
