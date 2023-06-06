'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';
const OtherProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch(`/api/users/${params.id}/prompt`);
      const data = await response.json();
      setPosts((post) => data);
    };
    if (params?.id) fetchPrompt();
  }, [params.id]);

  return (
    <Profile
      name={name.toUpperCase()}
      desc={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  );
};
export default OtherProfile;
