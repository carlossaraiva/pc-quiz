import { surveyData } from "@data";
import { Survey } from "./Survey";

describe("Question", () => {
  test("should return the first key on the first nextQuestion calling", () => {
    const survey = new Survey(surveyData);
    const nextQuestion = survey.nextQuestion();

    console.log(nextQuestion);

    expect(nextQuestion?.name).toBe("device");
  });

  test("should return the next question for Purpose", () => {
    const survey = new Survey(surveyData);
    const nextQuestion = survey.nextQuestion()?.nextQuestion();

    console.log(nextQuestion);

    expect(nextQuestion?.name).toBe("purpose");
  });

  test("should return null if no question left", () => {
    const survey = new Survey(surveyData);
    const nextQuestion = survey.nextQuestion();

    expect(nextQuestion).toBeNull();
  });

  test("should return null if question is a invalid key", () => {
    const survey = new Survey(surveyData);
    const nextQuestion = survey.nextQuestion("TESTE");

    expect(nextQuestion).toBeNull();
  });
});
