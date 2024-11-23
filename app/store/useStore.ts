import { create } from "zustand";
import { UserType } from "../components/UsersToChat";

type UserState = {
    knownUsers: UserType[]; // Adjust type based on actual usage, e.g., { [key: string]: User }
    setUsersN: (newUsers: UserType) => void;
};

export const useStore = create<UserState>((set) => ({
    knownUsers: [],
    setUsersN: (newUsers) =>
        set((state) => {
            const uniqueUsers = newUsers.filter(
                (user) => !state.knownUsers.some((existingUser) => existingUser.connectedUserEmail === user.connectedUserEmail)
            );
            return {
                knownUsers: [...state.knownUsers, ...uniqueUsers],
            };
        }),
}));