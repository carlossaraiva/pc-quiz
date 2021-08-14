import { SurveyData } from "../domain/SurveyData";

const device = () => ({
  question: "Qual tipo de dispositivo você procura?",
  selectionType: "single",
  name: "device",
  answers: [
    {
      label: "Desktop",
      value: "desktop",
      nextQuestion: "PURPOSE_DESKTOP",
    },
    { label: "Notebook", value: "notebook", nextQuestion: "PURPOSE_NOTEBOOK" },
  ],
});

const purposeDesktop = () => ({
  question: "Para qual finalidade será o uso do dispositivo?",
  selectionType: "single",
  name: "purpose",
  answers: [
    {
      label: "Profissional",
      value: "profissional",
      nextQuestion: "USAGE_PROFESSIONAL_DESKTOP",
    },
    {
      label: "Pessoal",
      value: "personal",
      nextQuestion: "USAGE_PERSONAL_DESKTOP",
    },
  ],
});

const purposeNotebook = () => ({
  question: "Para qual finalidade será o uso do dispositivo?",
  selectionType: "single",
  name: "purpose",
  answers: [
    {
      label: "Profissional",
      value: "profissional",
      nextQuestion: "USAGE_PROFESSIONAL_NOTEBOOK",
    },
    {
      label: "Pessoal",
      value: "personal",
      nextQuestion: "USAGE_PERSONAL_NOTEBOOK",
    },
  ],
});

const usageProfessionalDesktop = () => ({
  question:
    "Qual o uso fará do dispositivo? Selecione um ou mais itens dependendo do uso.",
  selectionType: "multiple",
  name: "usage",
  answers: [
    {
      label: "Edição de Vídeo e Fotografia",
      value: "video_photography",
      nextQuestion: "PERFORMANCE_DESKTOP",
      keywords: ["DESKTOP", "32GB", "i9", "Xeon", "nVidia Quadro"],
    },
    {
      label: "Ferramentas de escritório",
      value: "office_tools",
      nextQuestion: "PERFORMANCE_DESKTOP",
      keywords: ["DESKTOP", "16GB", "i5", "i7"],
    },
  ],
});

const usageProfessionalNotebook = () => ({
  question:
    "Qual o uso fará do dispositivo? Selecione um ou mais itens dependendo do uso.",
  selectionType: "multiple",
  name: "usage",
  answers: [
    {
      label: "Edição de Vídeo e Fotografia",
      value: "video_photography",
      nextQuestion: "PERFORMANCE_NOTEBOOK",
      keywords: ["NOTEBOOK", "32GB", "i7", "i9", "nVidia Q-MAX"],
    },
    {
      label: "Ferramentas de escritório",
      value: "office_tools",
      nextQuestion: "PERFORMANCE_NOTEBOOK",
      keywords: ["DESKTOP", "16GB", "i5", "i7"],
    },
  ],
});

const usagePersonalDesktop = () => ({
  question:
    "Qual o uso fará do dispositivo? Selecione um ou mais itens dependendo do uso.",
  selectionType: "multiple",
  name: "usage",
  answers: [
    {
      label: "Edição de Vídeo e Fotografia",
      value: "video_photography",
      nextQuestion: "PERFORMANCE_DESKTOP",
      keywords: ["DESKTOP", "16GB", "i5", "i7"],
    },
    {
      label: "Ferramentas de escritório",
      value: "office_tools",
      nextQuestion: "PERFORMANCE_DESKTOP",
      keywords: ["DESKTOP", "8GB", "i5", "i3"],
    },
    {
      label: "Navegação de Internet e Redes Sociais",
      value: "internet",
      nextQuestion: "PERFORMANCE_DESKTOP",
      keywords: ["DESKTOP", "8GB", "i3", "pentium"],
    },
    {
      label: "Games",
      value: "games",
      nextQuestion: "PERFORMANCE_DESKTOP",
      keywords: [
        "DESKTOP",
        "16GB",
        "i7",
        "i5",
        "nVidia RTX",
        "AMD Radeon",
        "AMD Ryzen 7",
        "AMD Ryzen 5 ",
      ],
    },
  ],
});

const usagePersonalNotebook = () => ({
  question:
    "Qual o uso fará do dispositivo? Selecione um ou mais itens dependendo do uso.",
  selectionType: "multiple",
  name: "usage",
  answers: [
    {
      label: "Edição de Vídeo e Fotografia",
      value: "video_photography",
      nextQuestion: "PERFORMANCE_NOTEBOOK",
      keywords: ["NOTEBOOK", "16GB", "i5", "i7"],
    },
    {
      label: "Ferramentas de escritório",
      value: "office_tools",
      nextQuestion: "PERFORMANCE_NOTEBOOK",
      keywords: ["NOTEBOOK", "8GB", "i5", "i3"],
    },
    {
      label: "Navegação de Internet e Redes Sociais",
      value: "internet",
      nextQuestion: "PERFORMANCE_NOTEBOOK",
      keywords: ["NOTEBOOK", "8GB", "i3", "pentium"],
    },
    {
      label: "Games",
      value: "games",
      nextQuestion: "PERFORMANCE_DESKTOP",
      keywords: ["NOTEBOOK", "16GB", "i7", "i5", "nVidia Q-MAX"],
    },
  ],
});

const performanceDesktop = () => ({
  question: "O que prefere:",
  name: "performance",
  answers: [
    {
      label: "Alta capacidade de armazenamento / menos responsivo",
      value: "storage",
      keywords: ["NOTEBOOK", "16GB", "i5", "i7"],
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
});

const performanceNotebook = () => ({
  question: "O que prefere:",
  selectionType: "single",
  name: "performance",
  answers: [
    {
      label: "Alta capacidade de armazenamento / menos responsivo",
      value: "storage",
      nextQuestion: "SCREEN_SIZE",
    },
    {
      label: "Menor capacidade de armazenamento / mais responsivo",
      value: "responsive",
      nextQuestion: "SCREEN_SIZE",
    },
    {
      label: "Quero maior capacidade e melhor desempenho",
      value: "high_performance",
      nextQuestion: "SCREEN_SIZE",
    },
  ],
});

const screenSize = () => ({
  question: "Qual o tamanho da tela você prefere em um notebook?",
  selectionType: "single",
  name: "screen_size",
  answers: [
    {
      label: "Até 13 polegadas",
      value: "13pol",
    },
    {
      label: "Entre 14 e 15 polegadas",
      value: "14_15_pol",
    },
    {
      label: "17 polegadas ou maior",
      value: "17pol",
    },
  ],
});

const helpers: Record<string, () => SurveyData> = {
  DEVICE: device,
  PURPOSE_DESKTOP: purposeDesktop,
  PURPOSE_NOTEBOOK: purposeNotebook,
  USAGE_PERSONAL_DESKTOP: usagePersonalDesktop,
  USAGE_PERSONAL_NOTEBOOK: usagePersonalNotebook,
  USAGE_PROFESSIONAL_DESKTOP: usageProfessionalDesktop,
  USAGE_PROFESSIONAL_NOTEBOOK: usageProfessionalNotebook,
  PERFORMANCE_DESKTOP: performanceDesktop,
  PERFORMANCE_NOTEBOOK: performanceNotebook,
  SCREEN_SIZE: screenSize,
};

export function getNextQuestion(questionKey: string) {
  return helpers[questionKey]();
}
