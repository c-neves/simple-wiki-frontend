import React, { useState } from 'react'
import './App.css'
import { Input, List } from 'antd'
import { search } from '../../wiki-api'

const Search = Input.Search

export default function App() {
  const [query, setQuery] = useState('')
  const [request, setRequest] = useState(null)

  async function handleSearch(query) {
    setQuery(query)
    if (!query) {
      return setRequest({
        data: null,
        error: 'Campo de busca vazio'
      })
    }
    setRequest({
      data: null,
      error: null
    })
    try {
      let results = await search(query)
      results = results[1].map((title, index) => ({
        title,
        description: results[2][index],
        link: results[3][index]
      }))
      console.log(results)
      setRequest({
        data: results,
        error: null
      })
    } catch (error) {
      setRequest({
        data: null,
        error: error.message
      })
    }
  }

  return (
    <div className='App'>
      <Search
        className='App-search-bar'
        placeholder='Buscar na Wikipedia...'
        onSearch={handleSearch}
        size='large' enterButton
      />
    {request === null ? (
      <p className='App-results'>Busque algum artigo na Wikipedia (Português).</p>
    ) : (
      request.error !== null ? (
        <p className='App-results App-error'>{request.error}</p>
      ) : (
        request.data !== null && request.data.length === 0 ? (
          <p className='App-results'>Nenhum resultado foi encontrado para a busca '{query}'</p>
        ) : (
          <List
            className='App-results'
            size='large'
            bordered
            loading={request.data === null && request.error === null}
            dataSource={request.data !== null && request.data}
            renderItem={item => <ListItem {...item} />}
            />
        )
      )
    )}
    </div>
  )
}

function ListItem({ title, description, link }) {
  return (
    <List.Item className='App-ListItem'>
    <a href={link} target='_blank' rel='noopener noreferrer'>
        <p><strong>{title}</strong></p>
        {description === '' ? null : (
          description.length > 160 ? (
            <p><small>{description.slice(0, 160)}...</small></p>
          ) : (
            <p><small>{description}</small></p>
          )
        )}
    </a>
  </List.Item>
  )
}
