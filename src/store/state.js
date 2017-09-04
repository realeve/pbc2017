import moment from 'moment';
let isMobile = () => {
  if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i) ||
    navigator.userAgent.match(/MicroMessenger/i)
  ) {
    return true;
  } else {
    return false;
  }
}
const state = {
  curProvince: '',
  curCity: '',
  top20Cities: [],
  peopleCount: 0,
  refreshInterval: 30 * 1000,
  needRefresh: false,
  nextTime: moment().add(30, 'seconds').format('MM-DD HH:mm:ss'),
  isPC: !isMobile(),
  passMode:window.location.href.includes('?p=1')
}

export default state
