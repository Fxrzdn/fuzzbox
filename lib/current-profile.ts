import { auth, currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const currentProfile = async () => {
    const user = await currentUser();
    const { userId } = auth();

    if (!user) {
        return null;
    }

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

    if (!userId) {
        return null;
    }

    if (userId) {
        return updatedProfile;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    });

    return profile;
}