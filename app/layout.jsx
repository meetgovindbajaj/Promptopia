import Nav from '@components/Nav';
import '@styles/globals.css';
import Provider from '@components/Provider';
export const metadata = {
  metadataBase: new URL('https://promptopia-theta-swart.vercel.app'),
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts.',
  icons: {
    icon: '/assets/images/logo.svg',
    apple: '/assets/images/logo.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  category: 'web development',
};

export const dynamic = 'force-dynamic';
const RootLayout = ({ children }) => {
  return (
    <Provider>
      <html lang='en' suppressHydrationWarning={true}>
        <body suppressHydrationWarning={true}>
          <div className='main'>
            <div className='gradiant' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </body>
      </html>
    </Provider>
  );
};

export default RootLayout;
