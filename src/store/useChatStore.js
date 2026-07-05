import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialConversations = {
  hitesh: [],
  piyush: [],
};

const initialDrafts = {
  hitesh: "",
  piyush: "",
};

export const useChatStore = create(
  persist(
    (set) => ({
      activePersona: "hitesh",
      conversations: initialConversations,
      drafts: initialDrafts,
      typing: false,

      setActivePersona: (persona) => set({ activePersona: persona }),

      setDraft: (persona, draft) =>
        set((state) => ({
          drafts: {
            ...state.drafts,
            [persona]: draft,
          },
        })),

      setTyping: (value) => set({ typing: value }),

      appendMessage: (persona, message) =>
        set((state) => ({
          conversations: {
            ...state.conversations,
            [persona]: [...(state.conversations[persona] ?? []), message],
          },
        })),
    }),
    {
      name: "persona-ai-chat-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        activePersona: state.activePersona,
        conversations: state.conversations,
        drafts: state.drafts,
      }),
    },
  ),
);
