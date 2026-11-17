export type MarkValue = 2 | 5;
export type QuestionId = number | string;

export interface QuestionImage {
  /** Filename inside images/ (e.g. "bloch_sphere_coords.png") */
  file: string;
  /** Concise one-line diagram description */
  caption: string;
  /** Exact source file and slide or page number */
  source: string;
  /** Placement hint inside the answer layout: "inline-top" | "inline-mid" | "inline-bottom" */
  placement?: 'inline-top' | 'inline-mid' | 'inline-bottom';
  /** Optional tag for full-slide exports or PDF crops */
  kindLabel?: string;
}

export interface AnswerSection {
  /** Optional structural label (e.g. "(a) Core Idea", "(b) Step-by-Step Explanation") */
  label?: string;
  /** HTML prose chunk (supports math-block, q-matrix, q-table, textbook-note) */
  html: string;
  /** Optional verified diagram rendered right after this answer section */
  image?: QuestionImage;
}

export interface StudyQuestion {
  /** Study-order ID (1..87 plus letter-suffixed additions like "1a", "5a") */
  number: QuestionId;
  /** Exact verbatim question text from PDF */
  question: string;
  /** Optional inline matrix/display block attached directly inside the prompt (e.g. Q7) */
  questionMathHtml?: string;
  /** Exact grey source tag from QST_Mid1_Mid2_Study_Order.pdf */
  sourceTag: string;
  /** Optional study-order subtitle note from the PDF (e.g. Q25/Q26 cross-note) */
  orderNote?: string;
  /** 2 or 5 marks */
  marks: MarkValue;
  /** 1-2 line WHY-first intuition or analogy */
  intuition: string;
  /** Ordered exam-ready answer paragraphs/steps with inline diagram placement */
  sections: AnswerSection[];
  /** Study-only provenance line (exact unit files, slide/page numbers, textbook note) shown outside exam answer */
  studySource: string;
  /** Explicit statement when the notes contain no diagram for this question */
  noDiagramNote?: string;
  /** Key terms and formulas to memorize before the exam */
  rememberThese: string[];
  /** True if any part uses standard textbook knowledge (Nielsen & Chuang / Zettili) */
  usesTextbookSupplement?: boolean;
}

export interface StudyStage {
  /** Stage index 1 to 19 */
  id: number;
  /** Part code: "A" | "B" | "C" | "D" | "E" */
  part: 'A' | 'B' | 'C' | 'D' | 'E';
  /** Part title (e.g. "Foundations (Unit I)") */
  partTitle: string;
  /** Exact stage title without number prefix (e.g. "Why classical physics wasn't enough") */
  title: string;
  /** Exact stage subtitle from PDF */
  subtitle: string;
  questions: StudyQuestion[];
}
