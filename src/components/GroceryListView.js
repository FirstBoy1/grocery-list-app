import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Select, Form, Input, Space, Divider } from 'antd'

import { addEntry } from '../redux/groceryListSlice'
import { EntryRow } from './EntryRow'

export const entryStatus = {
  RANOUT: 'RANOUT',
  HAVE: 'HAVE',
  ALL: 'ALL',
}

const priorityList = Array(5)
  .fill(1)
  .map((_, i) => i + 1)

export const GroceryListView = ({ setSelectedEntry }) => {
  const [addNew, setAddNew] = useState(false)
  const [filterBy, setFilterBy] = useState(entryStatus.ALL)
  const entries = useSelector((state) => state.groceryList.entries)
  const dispatch = useDispatch()

  let filteredEntries = entries
  if (filterBy !== entryStatus.ALL) {
    filteredEntries = entries.filter(
      (entry) =>
        (!entry.status && filterBy === entryStatus.RANOUT) ||
        (entry.status && filterBy === entryStatus.HAVE)
    )
  }

  const handleNewEntry = (values) => {
    dispatch(addEntry(values))
    setAddNew(false)
  }

  return (
    <div className="grocery-list">
      <div className="grocery-list__header">
        {addNew ? (
          <Form
            initialValues={{
              name: '',
              priority: priorityList[priorityList.length - 1],
              quantity: 1,
            }}
            onFinish={handleNewEntry}
          >
            <Form.Item label="Name" name="name">
              <Input autoFocus />
            </Form.Item>

            <Form.Item label="Quantity" name="quantity">
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Priority" name="priority">
              <Select>
                {priorityList.map((p) => (
                  <Select.Option key={p} value={p}>
                    {p}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button
                htmlType="button"
                type="danger"
                onClick={() => setAddNew(false)}
              >
                Cancel
              </Button>
            </Space>
          </Form>
        ) : (
          <Button onClick={() => setAddNew(true)}>Add New Entry</Button>
        )}
        <div>
          <label htmlFor="filter">Filter By: </label>
          <Select
            id="filter"
            value={filterBy}
            onChange={(value) => setFilterBy(value)}
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="ranout">Ran Out</Select.Option>
            <Select.Option value="have">Have</Select.Option>
          </Select>
        </div>
      </div>
      <Divider orientation="left" />

      {filteredEntries.length === 0 ? (
        <p className="empty-list-message">Add some entries</p>
      ) : null}

      {filteredEntries.map((entry) => (
        <EntryRow
          key={entry.id}
          entry={entry}
          setSelectedEntry={setSelectedEntry}
        />
      ))}
    </div>
  )
}
