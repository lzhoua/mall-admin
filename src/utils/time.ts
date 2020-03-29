/**
 * 日期格式化函数
 * @param date 日期
 * @param string 需要返回的格式 例如：YYYY-MM-DD hh-mm-ss
 */
export function timeFormat(date: any, string: string): string {
  if (date && date.indexOf && date.indexOf('Z') === -1) {
    date = new Date(date.replace('-', '/').replace('-', '/'));
  } else {
    date = new Date(date);
  }
  if (date.toString() === 'Invalid date') {
    return '';
  }
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth() + 1)).substr(-2);
  let day = ('0' + date.getDate()).substr(-2);
  let hour = ('0' + date.getHours()).substr(-2);
  let minute = ('0' + date.getMinutes()).substr(-2);
  let second = ('0' + date.getSeconds()).substr(-2);
  return string
    .replace('yyyy', year)
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('dd', day)
    .replace('hh', hour)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second);
}