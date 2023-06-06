'use client';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvider();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3 '>
      <Link className='flex gap-2 flex-center' href='/'>
        <Image
          src={'/assets/images/logo.svg'}
          width={30}
          height={30}
          className='object-contain'
          alt='Promptopia logo'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link className='black_btn' href='/create-prompt'>
              Create Prompt
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown((toggle) => !toggle)}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                  href={'/profile'}
                >
                  My Profile
                </Link>
                <Link
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                  href={'/create-prompt'}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='black_btn mt-5 w-full'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
