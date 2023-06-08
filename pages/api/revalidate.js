export default async function handler(req, res) {
  if (req.query.secret != process.env.NEXTAUTH_SECRET) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  const path = req.query.path;
  await res.revalidate(path);
  return res.json({ revalidated: true });
}
