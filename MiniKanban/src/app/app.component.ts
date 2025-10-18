import { Component } from '@angular/core';
import { CdkDrag, CdkDragHandle, CdkDropList, CdkDropListGroup, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { KanbanColumn, KanbanItem } from './interfaces/kanban.interface';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';
import { KanbanItemComponent } from './components/kanban-item/kanban-item.component';
import { v4 as uuidv4 } from 'uuid';

import { ViewChild } from '@angular/core';
import { SavePopupComponent } from './components/save-popup/save-popup.component';
import { KanbanService } from './services/kanban.service';


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
    SavePopupComponent
  ],
})
export class AppComponent {
  title = 'MiniKanban';
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
      priority: 'Low',
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



  @ViewChild(SavePopupComponent) popup!: SavePopupComponent;

  constructor(private kanbanService: KanbanService) {}

  openPopup() {
    this.popup.open();
  }

  onConfirm(save: boolean) {
    if (save) {
      this.kanbanService.saveItems([]).subscribe({
        next: () => alert('✅ Items guardados correctamente'),
        error: () => alert('❌ Error al guardar los items'),
      });
    }
  }
}
