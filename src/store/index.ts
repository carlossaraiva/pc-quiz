import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "react-query";
import create from "zustand";
import { configurePersist } from "zustand-persist";

type SurveyState = {
  device: string;
  usage: string;
  setSurvey: (question: string) => (answer: string) => void;
  clear: () => void;
};

const { persist, purge } = configurePersist({
  storage: AsyncStorage,
  rootKey: "root",
});

export const queryClient = new QueryClient();

export const surveyStore = create<SurveyState>(
  persist(
    {
      key: "survey",
    },
    (set) => ({
      device: "",
      usage: "",
      setSurvey: (question: string) => (answer: string) =>
        set((state) => ({ ...state, [question]: answer })),
      clear: () => set(() => ({ device: "", usage: "" })),
    })
  )
);

type StringMap = {
  [key: string]: string;
};

export const DEVICE_ANSWERS: StringMap = {
  pc: "PC",
  laptop: "Laptop",
};

export const USAGE_ANSWERS: StringMap = {
  "video-editor": "para edição de video",
  "software-development": "para desenvolvimento de software",
  "office-tools": "com ferramentas de escritório e pacote office",
  internet: "em navegação na internet e redes sociais",
};

export const RESPONSES = {
  pc: {
    "video-editor": {
      query: "PC+intel+i9+32GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk015nf1QkgIp2_1TaZM-kcplr00bHQ:1615675330800&q=PC&tbas=0&tbs=vw:g,mr:1,cat:325,pdtr0:1020653%7C3.9000000953674316%24,price:1,ppr_min:6000&sa=X&ved=0ahUKEwiSlKjRq67vAhUOIrkGHRIoBHkQvSsIvQcoAw&biw=1920&bih=937",
    },
    "software-development": {
      query: "PC+intel+i7+32GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk03huVIYMtgjCYFlVTt0v9YYfw2eaQ:1615675272485&q=PC&tbs=vw:g,mr:1,pdtr0:1020655%7C64.0%24160.0,pdtr1:728839%7C728842,pdtr2:1020654%7C16.0%2416.0,cat:325,pdtr3:950630%7C950631&sa=X&ved=0ahUKEwjF9cC1q67vAhXOJrkGHXF-D8oQsysIoQMoAA&biw=1920&bih=937",
    },
    "office-tools": {
      query: "PC+intel+i3+8GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk02ZBwi_tLoz6-vp9W57ZDC1TsZ3FA:1615675389597&q=PC&tbas=0&tbs=vw:g,mr:1,pdtr0:1010563%7C1010566,pdtr1:728839%7C728841,cat:325,pdtr2:728797%7C764654&sa=X&ved=0ahUKEwj27aztq67vAhXTLLkGHZ4kB4oQsysIwgcoAA&biw=1920&bih=937",
    },
    internet: {
      query: "PC+intel+i5+8GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk02ZBwi_tLoz6-vp9W57ZDC1TsZ3FA:1615675389597&q=PC&tbas=0&tbs=vw:g,mr:1,pdtr0:1010563%7C1010566,pdtr1:728839%7C728841,cat:325,pdtr2:728797%7C764654&sa=X&ved=0ahUKEwj27aztq67vAhXTLLkGHZ4kB4oQsysIwgcoAA&biw=1920&bih=937",
    },
  },
  laptop: {
    "video-editor": {
      query: "notebook+intel+i9+32GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk03gpAbfSpaQLakXJSL02CrJDvZ0YA:1615675425548&q=Notebook&tbs=vw:g,mr:1,pdtr0:1020720%7C64.0%2464.0,cat:328,pdtr1:1020484%7C4000.0%244000.0&sa=X&ved=0ahUKEwjSlL_-q67vAhXjH7kGHVH_BsEQvSsI9wgoBg&biw=1920&bih=937",
    },
    "software-development": {
      query: "notebook+intel+i7+32GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk01iIYzi0fbTYoHg20ztnucm29HZRA:1615675484079&q=Notebook&tbas=0&tbs=vw:g,mr:1,pdtr0:976847%7C976848,price:1,ppr_min:6000,ppr_max:10000,pdtr1:703981%7C764396,pdtr2:1020484%7C1000.0%24,cat:328,pdtr3:1337889%7C4192014&sa=X&ved=0ahUKEwiVwbOarK7vAhVZHLkGHU61DyAQsysI5wgoAA&biw=1920&bih=937",
    },
    "office-tools": {
      query: "notebook+intel+i3+8GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk01AnaoOG0louRMuHvjiF6CuTQD_pg:1615675519042&q=Notebook&tbas=0&tbs=vw:g,mr:1,pdtr0:703981%7C764396,cat:328,pdtr1:1020720%7C6.0%246.0&sa=X&ved=0ahUKEwjex4mrrK7vAhXwIrkGHUxfDzMQvSsIhgkoAw&biw=1920&bih=937",
    },
    internet: {
      query: "notebook+intel+i5+8GB",
      url: "https://www.google.com/search?hl=en&tbm=shop&sxsrf=ALeKk01AnaoOG0louRMuHvjiF6CuTQD_pg:1615675519042&q=Notebook&tbas=0&tbs=vw:g,mr:1,pdtr0:703981%7C764396,cat:328,pdtr1:1020720%7C6.0%246.0&sa=X&ved=0ahUKEwjex4mrrK7vAhXwIrkGHUxfDzMQvSsIhgkoAw&biw=1920&bih=937",
    },
  },
};
