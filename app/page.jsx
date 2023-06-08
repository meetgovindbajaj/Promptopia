import Link from 'next/link';
const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>AI-Powered Prompts</span>
      </h1>
      <p className='desc text-center'>
        Promptopia is an open-source AI prompting tool for modern world to discover create and share
        creative prompts.
      </p>
      <Link href={'/prompts'} className='my-4 font-satoshi blue_gradient hover:orange_gradient'>
        View all prompts →
      </Link>
    </section>
  );
};
export default Home;
