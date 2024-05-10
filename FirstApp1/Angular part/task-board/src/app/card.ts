export interface Card{
    id: number;
  name: string;
  description: string;
  dueDate: Date;
  priority: 'Low' | 'Medium' | 'High';
  listId: number;
}