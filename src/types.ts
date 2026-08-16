export interface NutritionalValue {
  vitamins: string[];
  minerals: string[];
  healthBenefits: string[];
  caloriesPer100g: number;
}

export interface ProducerData {
  country: string;
  quantity: string;
  valueNumeric: number; // Raw numeric value in thousands of tons for charting
}

export interface FruitAnalysis {
  commonName: string;
  scientificName: string;
  confidence: number;
  originHistory: string;
  physicalCharacteristics: string;
  nutritionalValue: NutritionalValue;
  varieties: string[];
  culinaryUsesStorage: string;
  topProducers: ProducerData[];
  globalLeader: string;
  majorExporters: string[];
  growingConditions: string;
  seasonality: string;
  interestingFacts: string[];
  healthWarnings: string;
}

export interface ScanHistoryItem {
  id: string;
  timestamp: string;
  imageUrl: string;
  analysis: FruitAnalysis;
  isFavorite?: boolean;
  isPreset?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
