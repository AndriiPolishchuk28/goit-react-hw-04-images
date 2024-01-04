import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../icons/search-svgrepo-com.svg';
import css from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeHandle = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formattedQuery = searchQuery.trim().toLowerCase();
    onSubmit(formattedQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.header_search}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.btn}>
          <SearchIcon width={30} height={20} />
        </button>

        <input
          onChange={onChangeHandle}
          value={searchQuery}
          className={css.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
