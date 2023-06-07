'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [copied, setCopied] = useState('');
  const handleCopy = () => {
    // setCopied((copy) => post.prompt);
    navigator.clipboard.writeText(post?.prompt).then((r) => setCopied((copy) => post?.prompt));
    setTimeout(() => setCopied(''), 3000);
  };
  return (
    <div className={'prompt_card'}>
      <div className={'flex justify-between items-start gap-5'}>
        <div
          className={'flex-1 flex justify-start items-center gap-3 cursor-pointer'}
          onClick={() => {
            if (post?.creator?._id === session?.user?.id) router.push(`/profile`);
            else router.push(`/profile/${post?.creator?._id}?name=${post?.creator?.username}`);
          }}
        >
          <Image
            src={post?.creator?.image ?? '/assets/images/logo.svg'}
            alt={'user_image'}
            width={40}
            height={40}
            className={'rounded-full object-contain'}
          />
          <div className={'flex flex-col'}>
            <h3 className={'font-satoshi font-semibold text-gray-900'}>{post.creator?.username}</h3>
            <p className={'font-inter text-sm text-gray-500'}>{post.creator?.email}</p>
          </div>
        </div>
        <div className={'copy_btn'} onClick={handleCopy}>
          <Image
            src={copied === post?.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt={'copy prompt'}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className={'my-4 font-satoshi text-sm text-gray-700'}>{post?.prompt}</p>
      <p
        className={'font-inter text-sm blue_gradient cursor-pointer'}
        onClick={() => !handleEdit && handleTagClick && handleTagClick(post?.tag)}
      >
        #{post?.tag}
      </p>
      {session?.user?.id === post.creator?._id && pathname === '/profile' && (
        <div className={'mt-5 flex-center gap-4 border border-gray-100 py-3 rounded'}>
          <p className={'font-inter text-sm green_gradient cursor-pointer'} onClick={handleEdit}>
            Edit
          </p>
          <p className={'font-inter text-sm orange_gradient cursor-pointer'} onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
