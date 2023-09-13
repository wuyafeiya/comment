function formatTimeAgo(timestamp) {
  const now = new Date();
  const pastTime = new Date(timestamp);
  const timeDifference = now - pastTime;
  if (timeDifference < 60000) { // 60秒
    return "刚刚";
  } else if (timeDifference < 3600000) { // 60分钟
    return `${Math.floor(timeDifference / 60000)}分钟前`;
  } else if (timeDifference < 86400000) { // 24小时
    return `${Math.floor(timeDifference / 3600000)}小时前`;
  } else if (timeDifference < 604800000) { // 一周
    return `${Math.floor(timeDifference / 86400000)}天前`;
  } else if (timeDifference < 2592000000) { // 30天
    return `${Math.floor(timeDifference / 604800000)}周前`;
  }else if (timeDifference < 31536000000) { // 一年
    return `${pastTime.getMonth() + 1}月${pastTime.getDate()}日`;
  } else {
    return `${pastTime.getFullYear()}年${pastTime.getMonth() + 1}月${pastTime.getDate()}日`;
  }
}
console.log(formatTimeAgo('2023-09-01T04:54:28.225Z'))
export default formatTimeAgo 
