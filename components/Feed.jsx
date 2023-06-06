'use client';

import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className={'mt-16 prompt_layout'}>
      {data.map((prompt) => (
        <PromptCard key={prompt.id} post={prompt} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const handleSearchChange = (e) => setSearchText((searched) => e.target.value);
  const handleTagClick = (tag) => {
    setSearchText((searched) => tag);
  };
  useEffect(() => {
    const allPosts = async () => {
      const response = await fetch('/api/prompt', { next: { revalidate: 60 } });
      const data = await response.json();
      setPosts((posts) => data);
    };
    allPosts();
  }, []);
  useEffect(() => {
    if (searchText !== '') {
      setFilteredPosts(
        posts.filter(
          (p) =>
            p.creator.email.includes(searchText) ||
            p.creator.username.includes(searchText) ||
            p.prompt.includes(searchText) ||
            p.tag.includes(searchText),
        ),
      );
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
      <PromptCardList data={searchText ? filteredPosts : posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
