import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {

  const handleSubmit = e => {
    e.preventDefault();
    const {value} = e.target.elements.searchQuery
    onSubmit(value)
    e.target.reset();
  };
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.searchFormInput}
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.button} name="button">
          <span className={css.buttonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
};
