import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
import { revalidatePath } from 'next/cache';
export const GET = (req) =>
  connectToDB()
    .then(() => {
      revalidatePath('/prompt');
      return Prompt.find({}).populate('creator');
    })
    .then((prompts) => new Response(JSON.stringify(prompts), { status: 200 }))
    .catch((e) => new Response('Failed to fetch all prompts \n' + e, { status: 500 }));
