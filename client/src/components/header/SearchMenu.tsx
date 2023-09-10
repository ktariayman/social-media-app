import { useEffect, useRef, useState } from 'react';
import { Return, Search } from '../../svg';

import { useClickOutside } from '../../hooks';
function SearchMenu({ color, setShowSearchMenu }: any) {
  const [iconVisible, setIconVisible] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const menu = useRef(null);
  const input = useRef<HTMLInputElement>(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    input?.current?.focus();
  }, []);
  const searchHandler = async () => { };

  return (
    <div className='header_left search_area scrollbar' ref={menu}>
      <div className='search_wrap'>
        <div className='circle hover1 '>
          <Return color={color} />
        </div>
        <div
          className='search'
          onClick={() => {
            input?.current?.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type='text'
            placeholder='Search Facebook'
            ref={input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={searchHandler}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
        <div className='circle hover1 ' onClick={() => { setShowSearchMenu(false) }}>
          <i className='exit_icon'></i>
        </div>

      </div>
      {results.length == 0 && (
        <div className='search_history_header'>
          <span>Recent searches</span>
          <a>Edit</a>
        </div>
      )}
    </div>
  );
}
export default SearchMenu;
