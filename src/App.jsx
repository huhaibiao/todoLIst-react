/*
 * @Author: huhaibiao
 * @Date: 2024-12-01 22:27:09
 * @description:
 */
import { useEffect, useRef, useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
function App() {
  console.log('App')

  const date = new Date().getTime()
  const tomorrow = new Date(date) // 复制当前时间
  tomorrow.setDate(new Date().getDate() + 1) // 日期加1
  const yesterday = new Date(date)
  yesterday.setDate(new Date().getDate() - 1)
  return (
    <>
      <TodoList date={yesterday.getTime()} title="昨日要做" type="todo" />
      <TodoList date={yesterday.getTime()} title="昨日操作" type="operate" />
      <TodoList date={yesterday.getTime()} title="昨日盘后消息" type="news" />
      <TodoList date={date} title="今日要做" type="todo" />
      <TodoList date={date} title="今日操作" type="operate" />
      <TodoList date={date} title="今日盘后消息" type="news" />
      <TodoList date={tomorrow.getTime()} title="明日要做" type="todo" />
    </>
  )
}

export default App
