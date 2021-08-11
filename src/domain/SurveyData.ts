import { Answer } from "./Answer";

export interface SurveyData {
  name: string;
  question: string;
  selectionType: string;
  answers: Answer[];
}
