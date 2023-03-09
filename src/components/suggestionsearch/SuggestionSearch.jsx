import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { Link, useHistory } from 'react-router-dom';
import { throttle } from 'throttle-debounce';
import UserService from '../../services/UserService';
import SearchBar from '../common/searchbar/SearchBar';

function SuggestionSearch() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const loadSuggestions = (value2) => {
    const autosuggestInput = document.querySelector(
      '.react-autosuggest__input',
    ).classList;
    autosuggestInput.add('user-suggestion-loading');
    setIsLoading(true);

    UserService.searchUser({ query: value2 })
      .then(({ data }) => {
        autosuggestInput.remove('user-suggestion-loading');
        setIsLoading(false);
        setSuggestions(
          data.data?.map((user) => ({
            id: user._id,
            name: user.name,
            username: user.username,
            profilePicture: user.profilePicture,
          })),
        );
      })
      .catch(({ response }) => {
        console.log(response.data?.message);
      });
  };
  let debouncedLoadSuggestions = throttle(500, loadSuggestions);

  const handleOnKeyDown = (event) => {
    if (event.key === 'Enter')
      history.push('/search-user', { query: event.target.value });
  };

  const handleSuggestionSelected = (event, { suggestion }) => {
    history.push(`/profile/${suggestion.id}`);
    return;
  };

  const renderSuggestion = ({ id, name, username, profilePicture }) => {
    return (
      <Link to={`/profile/${id}`}>
        <span className={'suggestion-content ' + username}>
          <img alt={name} src={profilePicture} />
          <span className="autosuggestion-name">
            {username}
            <p>{`${name}`}</p>
          </span>
        </span>
      </Link>
    );
  };

  const inputProps = {
    placeholder: 'Tìm kiếm ai đó',
    value: value,
    onChange: (event) => {
      setValue(event.target.value);
    },
    onKeyDown: handleOnKeyDown,
  };

  return (
    // <Autosuggest
    //   suggestions={suggestions}
    //   onSuggestionSelected={handleSuggestionSelected}
    //   onSuggestionsFetchRequested={({ value }) => {
    //     debouncedLoadSuggestions(value);
    //   }}
    //   onSuggestionsClearRequested={() => setSuggestions([])}
    //   getSuggestionValue={({ username }) => username}
    //   renderSuggestion={renderSuggestion}
    //   inputProps={inputProps}
    // />
    <SearchBar
      placeholder="Tìm kiếm bạn bè"
      value={value}
      onChange={(value) => setValue(value)}
      onEnter={() => history.push('/search-user', { query: value })}
    />
  );
}

export default SuggestionSearch;
