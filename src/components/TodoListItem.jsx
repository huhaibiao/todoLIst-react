import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import styles from './TodoListItem.module.css'
import { Button, Modal, Input, Popconfirm, message, Switch } from 'antd'
import { useState } from 'react'
import clsx from 'clsx'
/*
 * @Author: huhaibiao
 * @Date: 2024-12-01 23:34:34
 * @description:
 */

const { confirm } = Modal
function TodoListItem({ content, complete, operator, index }) {
  const className = clsx(styles['todo-list-item'], {
    [styles.isComplete]: complete,
  })

  let checked = complete
  let editText = content
  const editInputChange = (e) => {
    editText = e.target.value
  }

  const showConfirm = () => {
    confirm({
      title: '编辑',
      icon: <ExclamationCircleFilled />,
      content: (
        <>
          内容： <Input defaultValue={content} allowClear onChange={editInputChange} />
          <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center' }}>
            完成：
            <Switch
              onChange={(val) => (checked = val)}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={complete}
            />
          </div>
        </>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk() {
        operator('edit', index, editText, checked)
      },
      onCancel() {},
    })
  }

  const deleteBtn = () => {
    const confirm = (e) => {
      operator('delete', index)
      message.success('删除成功')
    }

    const cancel = (e) => {}
    return (
      <Popconfirm
        title="是否删除这项任务"
        description={content}
        onConfirm={confirm}
        onCancel={cancel}
        okText="是"
        cancelText="否">
        <Button color="danger" icon={<DeleteOutlined />} variant="outlined" size="small" disabled={complete} />
      </Popconfirm>
    )
  }

  return (
    <div className={className}>
      <div className={styles['right-icon']} onClick={() => operator('complete', index)}>
        {complete && <CheckOutlined />}
      </div>

      <div className={styles['item-content']}>{content}</div>

      <Button color="primary" icon={<EditOutlined />} variant="outlined" size="small" onClick={showConfirm}></Button>

      {deleteBtn()}
    </div>
  )
}

export default TodoListItem
