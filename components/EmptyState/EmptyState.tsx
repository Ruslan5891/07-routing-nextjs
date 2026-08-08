import css from './EmptyState.module.css';

interface EmptyStateProps {
  search: string;
}

export default function EmptyState({ search }: EmptyStateProps) {
  const hasSearch = search.trim() !== '';

  return (
    <div className={css.wrapper}>
      <svg
        className={css.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
        <path d="M14 3v5h5" />
        <path d="M19 8v2" />
        <circle cx="17" cy="17" r="3.5" />
        <path d="m20 20 2 2" />
      </svg>

      <h2 className={css.title}>{hasSearch ? 'Nothing found' : 'No notes yet'}</h2>

      <p className={css.text}>
        {hasSearch ? (
          <>
            No notes match <span className={css.query}>“{search.trim()}”</span>. Try another
            keyword.
          </>
        ) : (
          'Create your first note — it will show up right here.'
        )}
      </p>
    </div>
  );
}
