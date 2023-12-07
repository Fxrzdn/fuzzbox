import { auth, currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const currentProfile = async () => {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId) {
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    });

    const updatedProfile = await db.profile.update({
        where:{
          userId: user.id,
        },
        data: {
            name: `${user.username}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
          },
        });

    if (user) {
        return updatedProfile;
    }

    return profile;
}