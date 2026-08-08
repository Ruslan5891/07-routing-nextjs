import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return <p className={css.text}>There was an error while loading notes. Please try again...</p>;
}
