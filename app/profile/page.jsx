'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (session?.user)
      fetch(`/api/users/${session?.user.id}/prompt`)
        .then((res) => res.json())
        .then((data) => setPosts(data));
    else router.push('/');
  }, [session]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          const filterPosts = posts.filter((p) => p._id !== post._id);
          setPosts(filterPosts);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Profile
      name={'My'}
      desc={'Welcome to your personalized page'}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};
export default MyProfile;
