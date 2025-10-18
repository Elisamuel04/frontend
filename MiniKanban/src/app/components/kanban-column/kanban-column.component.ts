import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  templateUrl: './kanban-column.component.html',
  imports: [CdkDragHandle],
})
export class KanbanColumnComponent {}