/*
 * @Author: huhaibiao
 * @Date: 2024-12-02 21:51:22
 * @description:
 */
import { useEffect, useRef, useState } from 'react'
import { Button, Input, Space } from 'antd'
import TodoListItem from './TodoListItem'
import { setDraggable, uuid } from '../utils'
import DateComponent from './DateComponent'

function TodoList({ title, date, type }) {
  console.log(title)

  const dateString = new Date(date).toLocaleDateString().replaceAll('/', '.')
  const localList = JSON.parse(localStorage.getItem(dateString + type)) || []

  const [inputContent, setInput] = useState('')
  const [list, setList] = useState(localList)

  const operator = (params, index, text, complete) => {
    switch (params) {
      case 'add':
        if (!inputContent.trim()) return
        const item = {
          id: uuid(),
          text: inputContent,
          complete: false,
        }
        list.unshift(item)
        setInput('')
        break

      case 'complete':
        list[index].complete = true
        break

      case 'edit':
        list[index].text = text
        list[index].complete = complete
        break

      case 'delete':
        list.splice(index, 1)
        break

      default:
        break
    }

    setList([...list])
    localStorage.setItem(dateString + type, JSON.stringify(list))
  }

  const listDom = useRef(null)
  useEffect(() => {
    return setDraggable(listDom.current)
  }, [])

  return (
    <>
      <div className="todo-list" ref={listDom}>
        <div className="list-header">
          <DateComponent date={date} dateString={dateString} />
          <p className="item-title">{title}</p>
          <Space.Compact
            style={{
              width: '100%',
              marginTop: '5px',
            }}>
            <Input
              placeholder={`输入${title}做的事项`}
              allowClear
              value={inputContent}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={() => operator('add')}>+ 添加</Button>
          </Space.Compact>
        </div>
        <div className="list-content">
          {list.map((item, index) => (
            <TodoListItem
              content={item.text}
              complete={item.complete}
              operator={operator}
              index={index}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default TodoList
