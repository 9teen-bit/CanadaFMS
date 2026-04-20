export interface KpiData {
  totalActiveProjects: number;
  totalHectaresPlanned: number;
  totalHectaresCompleted: number;
  completionPercentage: number;
  totalEmployees: number;
  activeSubcontractors: number;
  clientRevenue: number;
  dailyProductivity: number;
}

export interface WeeklyProgress {
  week: string;
  hectares: number;
}

export interface BlockProductivity {
  block: string;
  completed: number;
  planned: number;
}

export interface RecentReport {
  id: string;
  block: string;
  worker: string;
  completedHectares: number;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
}