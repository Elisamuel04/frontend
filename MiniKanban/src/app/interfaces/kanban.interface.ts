export interface KanbanColumn {
  id: string;
  title: string;
  tickets: KanbanItem[];
}

export interface KanbanItem {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'todo' | 'in-progress' | 'done';
}