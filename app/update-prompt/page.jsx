'use client';

import { useLayoutEffect, useState } from 'react';
import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
const UpdatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });
  useLayoutEffect(() => {
    if (promptId && session?.user.id)
      fetch(`/api/prompt/${promptId}`)
        .then((res) => res.json())
        .then((data) => setPost({ prompt: data.prompt, tag: data.tag }));
    fetch(`/api/revalidate?path=/prompt&secret=${process.env.NEXTAUTH_SECRET}`)
      .then((r) => r.json())
      .then((r) => console.log(r));
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    if (!promptId) return alert('Prompt not found!');
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({ prompt: post.prompt, tag: post.tag }),
      });
      if (response.ok) {
        router.push('/profile');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type='Update'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};
export default UpdatePrompt;
