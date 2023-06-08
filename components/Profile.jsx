import PromptCard from '@components/PromptCard';
import { useId } from 'react';
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className={'w-full'}>
      <h1 className={'head_text text-left'}>
        <span className={'blue_gradient'}>{name} Profile</span>
        <p className={'desc text-left'}>{desc}</p>
      </h1>
      <div className={'mt-10 prompt_layout'}>
        {data?.map((prompt) =>
          prompt ? (
            <PromptCard
              key={prompt.id ?? useId()}
              post={prompt}
              handleEdit={() => handleEdit && handleEdit(prompt)}
              handleDelete={() => handleDelete && handleDelete(prompt)}
            />
          ) : (
            <></>
          ),
        )}
      </div>
    </section>
  );
};

export default Profile;
