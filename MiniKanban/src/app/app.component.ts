import { Component } from '@angular/core';
import { CdkDrag, CdkDragHandle, CdkDropList, CdkDropListGroup, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { KanbanColumn, KanbanItem } from './interfaces/kanban.interface';
import { KanbanColumnComponent } from './components/kanban-column.component';
import { KanbanItemComponent } from './components/kanban-item.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    KanbanColumnComponent,
    KanbanItemComponent,
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
    CdkDropListGroup,
    NgFor,
  ],
})
export class AppComponent {
  columns: KanbanColumn[] = [
    { id: 'todo', title: 'To Do', tickets: [] },
    { id: 'in-progress', title: 'In Progress', tickets: [] },
    { id: 'done', title: 'Done', tickets: [] },
  ];

  // TrackBy
  trackById(index: number, item: KanbanColumn) { return item.id; }
  trackByTicketId(index: number, item: KanbanItem) { return item.id; }

  // Drag & Drop
  listDrop(event: CdkDragDrop<undefined>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  drop(event: CdkDragDrop<KanbanItem[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // CRUD de tickets
  addTicket(columnId: string) {
    const column = this.columns.find(c => c.id === columnId);
    if (!column) return;
    column.tickets.push({
      id: uuidv4(),
      title: 'Nuevo ticket',
      description: '',
      assignee: '',
      priority: 'Medium',
    });
  }

  editTicket(ticket: KanbanItem, field: keyof KanbanItem, value: string) {
    ticket[field] = value as any;
  }

  deleteTicket(columnId: string, ticketId: string) {
    const column = this.columns.find(c => c.id === columnId);
    if (!column) return;
    column.tickets = column.tickets.filter(t => t.id !== ticketId);
  }
}
