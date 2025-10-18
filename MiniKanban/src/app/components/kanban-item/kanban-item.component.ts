import { Component, computed, input } from '@angular/core';
import { KanbanItem } from '../../interfaces/kanban.interface';

const statusMapperColors = {
  Medium: 'bg-yellow-200',
  High: 'bg-red-200',
  Low: 'bg-green-200',
};

const statusMapperText = {
  Medium: 'Media',
  High: 'Alta',
  Low: 'Baja',
};

@Component({
  selector: 'app-kanban-item',
  standalone: true,
  templateUrl: './kanban-item.component.html',
})
export class KanbanItemComponent {
  item = input.required<KanbanItem>();

  color = computed(() => {
    return statusMapperColors[this.item().priority];
  });

  statusText = computed(() => {
    return statusMapperText[this.item().priority];
  });
}