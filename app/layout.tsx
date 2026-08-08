import type { Metadata } from 'next';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import css from './layout.module.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'NoteHub is a simple and efficient application designed for managing personal notes.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <div className={css.content}>{children}</div>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
