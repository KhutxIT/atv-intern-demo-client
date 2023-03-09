import './SearchInput.css'
import { Search as SearchIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'

export default function SearchInput(props) {
  // const ChatState = useSelector(({ Chat }) => Chat)
  const searchInputRef = useRef(null)


  const dispatch = useDispatch()
  let delaySearch

  const doSearch = (query) => {
    console.log('test')
  }

  const searchInput = (e) => {
    const query = e.target?.innerText
    if (!query) {
      console.log('test')
      return
    }

    if (query.length < 3) {
      return
    }

    clearTimeout(delaySearch)
    delaySearch = setTimeout(() => {
      doSearch(query)
    }, 600)
  }

  const clearSearchInput = () => {
    searchInputRef.current.innerText = ''
  }

  return (
    <div className="search-input">
      <div className="search-input-wrapper">
        <SearchIcon className="search-input-icon" />
        <div
          ref={searchInputRef}
          id="search-inputbox"
          placeholder="Search"
          contentEditable
          suppressContentEditableWarning
          onInput={searchInput}
        />
      </div>
    </div>
  )
}
