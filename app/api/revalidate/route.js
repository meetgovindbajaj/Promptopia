import { revalidateTag } from 'next/cache';

export const GET = (req) => {
  const prompts = req.nextUrl.searchParams.get('prompts');
  revalidateTag(prompts);
  return new Response(JSON.stringify({ revalidated: true, now: Date.now() }), { status: 200 });
};
