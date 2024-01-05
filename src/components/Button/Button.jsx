import css from './Button.module.css';

export const Button = ({ onChange, children }) => {
  return (
    <button type="button" className={css.loadMoreBtn} onClick={onChange}>
      {children}
    </button>
  );
};
