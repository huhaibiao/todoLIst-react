/*
 * @Author: huhaibiao
 * @Date: 2024-12-03 10:42:07
 * @description:
 */
import { useEffect, useState } from 'react'

const DateComponent = ({ dateString, date }) => {
  const [time, setTime] = useState(dateString)
  const day = new Date(date).getDay()
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  const timeShow = new Date().getDay() === new Date(date).getDay()
  if (timeShow) {
    useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date().toLocaleString().split(' ')[1])
      }, 100)

      return () => clearInterval(timer)
    }, [])
  }
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: '10px',
          zIndex: 11,
          fontSize: '.8rem',
        }}>
        {dateString}
      </div>
      <div
        style={{
          position: 'absolute',
          left: '10px',
          top: '20px',
          zIndex: 11,
          fontSize: '.85rem',
          fontWeight: 500,
          color: 'red',
        }}>
        {days[day]}
        {timeShow && (
          <span
            style={{
              marginLeft: '20px',
              color: 'rgb(0 14 255 / 73%)',
            }}>
            {time}
          </span>
        )}
      </div>
    </>
  )
}

export default DateComponent
