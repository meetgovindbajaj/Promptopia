import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
import { revalidateTag } from 'next/server';
export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    const posts = req.nextUrl.searchParams.get('prompts');
    revalidateTag(posts);
    return new Response(JSON.stringify({ ...newPrompt, revalidated: true }), { status: 201 });
  } catch (e) {
    console.log(e);
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};
