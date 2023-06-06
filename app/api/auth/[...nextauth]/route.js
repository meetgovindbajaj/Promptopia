import NextAuth from 'next-auth';
import GoogleProviders from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.maxAge = 60 * 60 * 24 * 30;
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replaceAll(' ', '_'),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
