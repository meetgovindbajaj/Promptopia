'use client';

import { useEffect, useState } from 'react';
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
  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({ ...post, ...data });
      } catch (e) {
        console.log(e);
      }
    };
    if (promptId && session?.user.id) getPromptDetails();
    else router.push('/');
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    if (!promptId) return Error('Prompt not found!');
    setSubmitting(true);
    try {
      const responce = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({ prompt: post.prompt, tag: post.tag }),
      });
      if (responce.ok) {
        router.push('/');
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
