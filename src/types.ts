export type Priority = 'Low' | 'Medium' | 'High';
export type Category = 'BotWaba' | 'Digital Product' | 'WhatsAuto' | 'ChatFlow Crm' | 'Meta Ads' | 'Other' | string;

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  category: Category;
  dueDate: string;
  description?: string;
  status: 'todo' | 'inProgress' | 'done';
}