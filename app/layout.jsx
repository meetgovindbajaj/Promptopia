import Nav from '@components/Nav';
import '@styles/globals.css';
import Provider from '@components/Provider';
export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts.',
};
export const dynamic = 'force-dynamic';
const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <Provider>
        <body>
          <div className='main'>
            <div className='gradiant' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
