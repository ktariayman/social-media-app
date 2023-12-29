import { useEffect, useRef, useState } from 'react';
import { Return, Search } from '../../svg';

import { useClickOutside } from '../../hooks';
import { getSearchHistory, searchUsers, addToSearchHistory, removeFromSearch } from '../../functions/user';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IUser } from '../../ts/interface/user';
type Props = {
  color: string,
  setShowSearchMenu: (show: boolean) => void
}
function SearchMenu({ color, setShowSearchMenu }: Props) {
  const [iconVisible, setIconVisible] = useState<boolean>(true);
  const { user }: { user: IUser } = useSelector((state: any) => ({ ...state }));
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [results, setResults] = useState<any>([]);
  const [searchHistory, setSearchHistory] = useState<any>([]);
  const menu = useRef(null);
  const input = useRef<HTMLInputElement>(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = async () => {
    const res = await getSearchHistory(user.token);
    setSearchHistory(res);
  };
  useEffect(() => {
    input?.current?.focus();
  }, []);
  const searchHandler = async () => {
    if (searchTerm === "") {
      setResults([]);
    } else {
      const res = await searchUsers(searchTerm, user.token);
      setResults(res);
      console.log("res", res);

    }
  };
  console.log('results', results);


  const addToSearchHistoryHandler = async (searchUser: string) => {
    await addToSearchHistory(searchUser, user.token);
    getHistory();
  };
  const handleRemove = async (searchUser: string) => {
    await removeFromSearch(searchUser, user.token);
    getHistory();
  };
  console.log('searchHistory', searchHistory);

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
      {results && (
        <div className='search_history_header'>
          <span>Recent searches</span>
          <a>Edit</a>
        </div>
      )}
      <div className="search_history scrollbar">
        {searchTerm == "" && searchHistory && results?.length === 0 &&
          searchHistory.filter((user: any) => user.user !== null)
            .sort((a: any, b: any) => {
              return +new Date(b.createdAt) - +new Date(a.createdAt);
            })
            .map((user: any) => (
              <div className="search_user_item hover1" key={user._id}>
                <Link
                  className="flex"
                  to={`/profile/${user.user.username}`}
                  onClick={() => addToSearchHistoryHandler(user.user._id)}
                >
                  <img src={user.user.picture} alt="" />
                  <span>
                    {user.user.first_name} {user.user.last_name}
                  </span>
                </Link>
                <i
                  className="exit_icon"
                  onClick={() => {
                    handleRemove(user.user._id);
                  }}
                ></i>
              </div>

            ))}
      </div>
      <div className="search_results scrollbar">
        {results &&
          results.map((user: any) => (
            <Link
              to={`/profile/${user.username}`}
              className="search_user_item hover1"
              onClick={() => addToSearchHistoryHandler(user._id)}
              key={user._id}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
export default SearchMenu;
