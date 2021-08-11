import { SurveyData } from "../domain/SurveyData";

export const surveyData: Record<string, SurveyData> = {
  DEVICE: {
    question: "Qual tipo de dispositivo você procura?",
    selectionType: "single",
    name: "device",
    answers: [
      {
        label: "Desktop",
        value: "desktop",
        nextQuestion: "PURPOSE",
      },
      { label: "Notebook", value: "notebook", nextQuestion: "SCREEN_SIZE" },
    ],
  },
  PURPOSE: {
    question: "Para qual finalidade será o uso do dispositivo?",
    selectionType: "single",
    name: "purpose",
    answers: [
      {
        label: "Profissional",
        value: "profissional",
        nextQuestion: "USAGE",
      },
      { label: "Pessoal", value: "personal", nextQuestion: "USAGE" },
    ],
  },
  USAGE: {
    question:
      "Qual o uso fará do dispositivo? Selecione um ou mais itens dependendo do uso.",
    selectionType: "multiple",
    name: "usage",
    answers: [
      {
        label: "Edição de Vídeo e Fotografia",
        value: "video_photography",
        nextQuestion: "PERFORMANCE",
      },
      {
        label: "Desenvolvimento de software",
        value: "software_development",
        nextQuestion: "PERFORMANCE",
      },
      {
        label: "Ferramentas de escritório",
        value: "office_tools",
        nextQuestion: "PERFORMANCE",
      },
      {
        label: "Navegação de Internet e Redes Sociais",
        value: "internet",
        nextQuestion: "PERFORMANCE",
      },
      { label: "Games", value: "games" },
      {
        label: "Games para competição Online",
        value: "competitive_games",
        nextQuestion: "PERFORMANCE",
      },
    ],
  },
  PERFORMANCE: {
    question:
      "Se pudesse escolher entre ter muito espaço para guardar seus arquivos, fotos e vídeos com restrição em desempenho ou menos espaço, mas melhor resposta ao abrir programas e ligar/desligar o dispositivo, qual escolheria",
    selectionType: "single",
    name: "performance",
    answers: [
      {
        label: "Alta capacidade de armazenamento / menos responsivo",
        value: "storage",
      },
      {
        label: "Menor capacidade de armazenamento / mais responsivo",
        value: "responsive",
      },
      {
        label: "Quero maior capacidade e melhor desempenho",
        value: "high_performance",
      },
    ],
  },
  SCREEN_SIZE: {
    question: "Qual o tamanho da tela você prefere em um notebook?",
    selectionType: "single",
    name: "screen_size",
    answers: [
      {
        label: "Até 13 polegadas",
        value: "13pol",
        nextQuestion: "PURPOSE",
      },
      {
        label: "Entre 14 e 15 polegadas",
        value: "14_15_pol",
        nextQuestion: "PURPOSE",
      },
      {
        label: "17 polegadas ou maior",
        value: "17pol",
        nextQuestion: "PURPOSE",
      },
    ],
  },
};
