export type SurveyState = {
  device: string | null;
  usage: string | null;
  setSurvey: (question: "device" | "usage") => (answer: string) => void;
  getResult: () => Result | null;
  clear: () => void;
};

export type Result = {
  query: string;
  url: string;
};

export type StackParamList = {
  Presentation: undefined;
  DeviceScreen: undefined;
  UsageScreen: undefined;
  LoadingScreen: undefined;
  ResultScreen: undefined;
};
