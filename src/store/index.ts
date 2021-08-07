import { RESPONSES } from "@data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SurveyState } from "@types";
import { QueryClient } from "react-query";
import create from "zustand";
import { configurePersist } from "zustand-persist";

const { persist } = configurePersist({
  storage: AsyncStorage,
  rootKey: "root",
});

export const queryClient = new QueryClient();

export const surveyStore = create<SurveyState>(
  persist(
    {
      key: "survey",
    },
    (set, get) => ({
      device: null,
      usage: null,
      setSurvey: (questionType: "device" | "usage") => (answer: string) => {
        set((state) => ({ ...state, [questionType]: answer }));
      },
      getResult: () => {
        const { device, usage } = get();
        return device && usage ? RESPONSES[device][usage] : null;
      },
      clear: () => set(() => ({ device: "", usage: "" })),
    })
  )
);
