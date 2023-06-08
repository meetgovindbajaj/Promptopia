'use client';

import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';
import Image from 'next/image';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className={'mt-16 prompt_layout'}>
      {data?.map((prompt) =>
        prompt ? (
          <PromptCard key={prompt.id} post={prompt} handleTagClick={handleTagClick} />
        ) : (
          <></>
        ),
      )}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleSearchChange = (e) => setSearchText(e.target.value);
  const handleTagClick = (tag) => setSearchText(tag);
  useEffect(() => {
    fetch('/api/prompt', { cache: 'no-store' })
      .then((r) => r.json())
      .then((r) => {
        setPosts(r);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchText !== '') {
      setLoading(true);
      setFilteredPosts(
        posts.filter(
          (p) =>
            p.creator.email.includes(searchText) ||
            p.creator.username.includes(searchText) ||
            p.prompt.includes(searchText) ||
            p.tag.includes(searchText),
        ),
      );
      setLoading(false);
    }
  }, [searchText]);

  return (
    <section className={'feed'}>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder={'Search for a tag or a username'}
          value={searchText}
          onChange={handleSearchChange}
          className={'search_input peer'}
          required={true}
        />
      </form>
      {loading ? (
        <Image src={'/assets/icons/loader.svg'} width={50} height={50} className='mt-10' />
      ) : (
        <PromptCardList data={searchText ? filteredPosts : posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
