import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
export const POST = (req) =>
  connectToDB()
    .then(() => Prompt.find({}).populate('creator'))
    .then((prompts) => new Response(JSON.stringify(prompts), { status: 200 }))
    .catch((e) => new Response('Failed to fetch all prompts \n' + e, { status: 500 }));
