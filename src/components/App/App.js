import React, { useState } from 'react'
import './App.css'
import { Icon, Button, Input, AutoComplete } from 'antd'

const Option = AutoComplete.Option

export default function App() {
  const [data, setData] = useState([])

  function handleSearch(value) {
    setData(value ? searchResult(value) : [])
  }

  return (
    <div className='App'>
      <AutoComplete
        className='App-search-bar'
        size='large'
        dataSource={data.map(renderOption)}
        onSelect={onSelect}
        onSearch={handleSearch}
        placeholder='Buscar na Wikpedia...'
        optionLabelProp='text'
      >
        <Input
          suffix={(
            <Button className='App-search-button' size='large' type='primary'>
              <Icon type='search' />
            </Button>
          )}
        />
      </AutoComplete>
    </div>
  )
}

function onSelect(value) {
  console.log('onSelect', value);
}

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

function searchResult(query) {
  return (new Array(getRandomInt(5))).join('.').split('.')
    .map((item, idx) => ({
      query,
      category: `${query}${idx}`,
      count: getRandomInt(200, 100),
    }));
}

function renderOption(item) {
  return (
    <Option key={item.category} text={item.category}>
      {item.query} 在
      <a
        href={`https://s.taobao.com/search?q=${item.query}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        {item.category}
      </a>
      区块中
      <span className='global-search-item-count'>约 {item.count} 个结果</span>
    </Option>
  );
}
