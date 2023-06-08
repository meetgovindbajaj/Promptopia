import Image from 'next/image';

const Loader = () => {
  return (
    <Image src={'/assets/icons/loader.svg'} width={50} height={50} className='mt-10' id='spinner' />
  );
};

export default Loader;
