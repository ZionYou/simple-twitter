export function TransferTime(dataTime) {
  const past = new Date(dataTime).getTime()
  const now = new Date().getTime()
  const showtime = now - past

  if(isNaN(past)){
    console.log('無法轉換時間')
    return dataTime
  }

  if(showtime < 0){
    console.log('時間錯誤')
    return dataTime
  }

  const years = showtime / (1000 * 3600 * 24 * 30 * 12)
  if(years > 1) return `${Math.floor(years)} 年前`
  const months = years * 12
  if(months > 1) return `${Math.floor(months)} 個月前`
  const days = months * 30
  if(days > 1) return `${Math.floor(days)} 天前`
  const hours = days * 24
  if (hours > 1) return `${Math.floor(hours)} 個小時前`
  const mins = hours * 60
  if (mins > 1) return `${Math.floor(mins)} 分鐘前`
  if(mins < 1) return '幾秒鐘前'

  console.log('發生其他錯誤')
  return dataTime
}
