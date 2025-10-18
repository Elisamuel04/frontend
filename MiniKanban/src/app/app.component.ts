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

  ngOnInit() {
  this.loadTickets();
  }

  loadTickets() {
    this.kanbanService.getItems().subscribe({
      next: (tickets) => {
        // Limpiar columnas actuales
        this.columns.forEach(c => c.tickets = []);

        // Asignar cada ticket a su columna según su estado
        tickets.forEach(ticket => {
          const column = this.columns.find(c => c.id === ticket.status);
          if (column) {
            column.tickets.push(ticket);
          }
        });

        console.log('✅ Tickets cargados desde el backend:', this.columns);
      },
      error: (err) => {
        console.error('❌ Error al cargar tickets:', err);
      }
    });
  }



  addTicket(columnId: string) {
    const column = this.columns.find(c => c.id === columnId);
    if (!column) return;
    column.tickets.push({
      id: uuidv4(),
      title: 'Nuevo ticket',
      description: '',
      priority: 'Low',
      status: 'todo',
    });
  }

editTicket(ticket: KanbanItem, field: keyof KanbanItem, value: string) {
  if (field === 'status' && (value === 'todo' || value === 'in-progress' || value === 'done')) {
    ticket.status = value;
  } else {
    (ticket as any)[field] = value;
  }
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
    if (!save) return;

    // Recolectar todos los tickets con su estado (columna)
    const allTickets = this.columns.flatMap((col) =>
      col.tickets.map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        priority: t.priority,
        status: col.id as 'todo' | 'in-progress' | 'done',
      }))
    );

    console.log('🟦 Enviando tickets:', allTickets);

    // Enviar al backend
    this.kanbanService.saveItems(allTickets).subscribe({
      next: (res) => {
        console.log('✅ Guardado exitoso:', res);
        alert('✅ Tickets guardados correctamente');
      },
      error: (err) => {
        console.error('❌ Error al guardar los tickets:', err);
        alert('❌ Error al guardar los tickets: ' + (err.error?.error || 'Error desconocido'));
      },
    });
  }
}
