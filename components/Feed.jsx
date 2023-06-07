'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import PromptCard from '@components/PromptCard';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

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
  const handleSearchChange = (e) => setSearchText(e.target.value);
  const handleTagClick = (tag) => setSearchText(tag);
  const { data, error } = useSWR('/api/prompt', fetcher);
  useEffect(() => {
    setPosts(data);
  }, [data]);

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

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

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
