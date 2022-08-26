import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(timezone)
dayjs.extend(duration)
dayjs.extend(LocalizedFormat)

dayjs.tz.setDefault('Asia/Shanghai') // 受地理位置影响，时间可能不符合预期，设置时区

const WEEKS: { [key: number]: string } = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  0: '周日',
}

// TODO：时间统一走接口，这里的获取本地日期方法之后废弃
export const weekToday = () => {
  const week = dayjs().get('days')
  return WEEKS[week]
}

export default dayjs
