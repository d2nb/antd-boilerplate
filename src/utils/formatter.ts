import dayjs from 'dayjs';

export function moneyFormatter(num: number | string) {
  num = +num;
  return num.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' });
}

export function dateFormatter(
  date: string | number | Date,
  format = 'YYYY-MM-DD HH:mm:ss',
) {
  return dayjs(date).format(format);
}
