/**
 * @description 纯文本模板-企业微信消息通知
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

import dayjs, { weekToday } from '../../../utils/dayjs'
import { getConfig } from '../../../utils/getConfig'

const CONFIG = getConfig().loveMsg

export const textTemplate = (data: TextTemplateProps) => {
  const { caiHongpi, sayLove, songLyrics, oneMagazines, netEaseCloud, oneWord, dayEnglish } = data

  let text = `早呀，我亲爱的${CONFIG.girl_name}~\n`

  // 工作日/休息日，需要排除节假日
  const week = weekToday()

  text += `今天是${week}，${CONFIG.boy_name}向你说早安，记得吃早餐，开心一整天，爱你💋~\n`

  // 生日倒计时
  const countDown = CONFIG.birthday_down
  for (let i = 0; i < countDown.length; i++) {
    const date = dayjs().year() + '-' + countDown[i]['date']
    const info = countDown[i]['info']
    const info2 = countDown[i]['info2']
//  + date
    const dayDiffer = dayjs(date).diff(dayjs(), 'day')
    if (dayDiffer == 0) {
      text += `🎂🎂今天是${info}，${info2}🎂🎂\n`
    } else if (dayDiffer > 0 && dayDiffer < 30) {
      text += `距离${info}还有${dayDiffer}天，${info2}~\n`
    }
  }

//   if (['周六', '周日'].includes(week)) {
//     text += `
// 如果我${CONFIG.girl_name}已经起床啦！${CONFIG.boy_name}向你说早安呦~，记得吃早饭呀😆\n
// 嗯哼哼~今天可是${week}哦，上班别迟到了哦~`
//   } else {
//     text += `
// 如果我${CONFIG.girl_name}还没起床呀！${CONFIG.boy_name}就等着${CONFIG.girl_name}起床给我说早安呦🤣
// 嗯哼~，既然今天是${week}，就让你再睡会懒觉~下次可不能啦~😝\n`
//   }

  // 添加笑话
  if (caiHongpi) {
    // 彩虹屁：
    text += `
${caiHongpi.content}\n`
  }

  if (sayLove) {
    text += `
${sayLove.content}\n`
  }

  // 诗句
  if (songLyrics) {
    text += `
『${songLyrics.source}』${songLyrics.content}\n`
  }

  if (oneMagazines) {
    text += `
『ONE杂志』${oneMagazines.word}\n`
  }

  if (netEaseCloud) {
    text += `
『网易云音乐热评』${netEaseCloud.content}——${netEaseCloud.source}\n`
  }

  // 添加一句一言
  if (oneWord) {
    text += `
『一言』${oneWord.hitokoto}\n`
  }

  // 每日英语
  if (dayEnglish) {
    text += `
『每日英语（${dayjs(dayEnglish.date).format('ll')}』${dayEnglish.content}`
  }

  return {
    msgtype: 'text',
    text: {
      content: text,
    },
  }
}
