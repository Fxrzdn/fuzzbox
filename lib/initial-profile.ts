import { currentUser, redirectToSignIn, auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const initialProfile = async () => {
    const user = await currentUser();
    const { userId } = auth();

    if (!user) {
        return redirectToSignIn();
    }
    
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    if (profile) {
        return profile;
    }

    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.username}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });
    return newProfile;
}