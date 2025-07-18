export type Priority = 'newt' | 'owl' | 'first-year';

export interface Task {
  id: string;
  decree: string; // Task description
  prophecyDate: string; // Due date
  urgencyLevel: Priority; // Priority
  completed: boolean;
  createdAt: string;
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  'newt': 'N.E.W.T. Level',
  'owl': 'O.W.L. Level',
  'first-year': 'First Year Charm'
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  'newt': 'text-magical-red',
  'owl': 'text-amber-500',
  'first-year': 'text-magical-green'
};