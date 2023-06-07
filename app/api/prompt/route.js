import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
export const GET = () =>
  connectToDB()
    .then(() => Prompt.find({}).populate('creator'))
    .then((prompts) => new Response(JSON.stringify(prompts), { status: 201 }))
    .catch((e) => new Response('Failed to fetch all prompts \n' + e, { status: 500 }));
