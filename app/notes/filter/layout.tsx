import type { ReactNode } from 'react';
import css from './LayoutNotes.module.css';

interface NotesLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

// Слот @sidebar рендериться паралельно з children: зміна тега перемальовує
// лише область нотаток, а меню фільтрів лишається змонтованим
export default function NotesLayout({ children, sidebar }: NotesLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}
