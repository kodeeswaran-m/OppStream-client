// ----------------------------- TYPES -----------------------------
export type People = { name: string };

export type TechRow = {
  technology: string;
  count: number;
  // expertise: string;
};

export type State = {
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  department: string;
  team: string;
  manager: string;

  requirementType: "EE" | "EN" | "NN" | "";

  // SECTION 2
  projectName: string;
  clientName: string;
  projectCode: string;
  urgency: string;
  meetingType: string;
  callDate: string;
  screenshot: File | null;
  peoplePresent: People[];

  // SECTION 3
  selectedTechnologies: string[];
  totalPersons: number;
  techRows: TechRow[];
  oppCategory: string;
  shortDescription: string;
  detailedNotes: string;

  // Section 4
  expectedStart: string;
  expectedEnd: string;

  // Section NN
  nnDescription: string;
  nnClientName: string;
  nnSource: string;
  nnOppFrom: string;
};
