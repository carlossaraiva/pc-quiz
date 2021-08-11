import { SurveyData } from "./SurveyData";

class Survey {
  data: Record<string, SurveyData>;

  constructor(data: Record<string, SurveyData>) {
    this.data = data;
  }

  nextQuestion(currentSurveyKey?: string) {
    if (!currentSurveyKey) return null;

    return this.data[currentSurveyKey].nextQuestion;
  }
}

export { Survey };
