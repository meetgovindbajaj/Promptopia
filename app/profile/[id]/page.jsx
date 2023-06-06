'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';
const OtherProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (params?.id)
      fetch(`/api/users/${params.id}/prompt`)
        .then((res) => res.json())
        .then((data) => setPosts(data));
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
