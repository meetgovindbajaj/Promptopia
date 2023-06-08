import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
import { revalidatePath } from 'next/cache';
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
    revalidatePath('/prompt');
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (e) {
    console.log(e);
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};
