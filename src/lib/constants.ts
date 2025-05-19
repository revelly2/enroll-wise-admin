
import { Course } from "./types";

export const COURSES: Course[] = [
  { id: "bsit", name: "BS Information Technology" },
  { id: "bscs", name: "BS Computer Science" },
  { id: "bsis", name: "BS Information Systems" },
  { id: "bsece", name: "BS Electronics Engineering" },
  { id: "bsme", name: "BS Mechanical Engineering" },
  { id: "bsce", name: "BS Civil Engineering" },
];

export const SECTIONS: Record<string, string[]> = {
  "bsit": ["BSIT-1A", "BSIT-1B", "BSIT-2A", "BSIT-2B"],
  "bscs": ["BSCS-1A", "BSCS-1B", "BSCS-2A"],
  "bsis": ["BSIS-1A", "BSIS-1B"],
  "bsece": ["BSECE-1A", "BSECE-2A"],
  "bsme": ["BSME-1A", "BSME-2A"],
  "bsce": ["BSCE-1A", "BSCE-2A"],
};
