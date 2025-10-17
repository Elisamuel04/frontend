import { Component, computed, input } from '@angular/core';
import { KanbanItem } from '../interfaces/kanban.interface';

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
  template: `
    <div class="bg-white p-4 rounded-lg shadow-md cursor-pointer">
      <!-- Usar item() directamente -->
      <p class="font-semibold mb-4">{{ item().title }}</p>
      <p class="text-sm">{{ item().description }}</p>

      <div class="flex justify-end">
        <div [class]="color()" class="px-4 py-1 rounded-full mt-4">
          <span>{{ statusText() }}</span>
        </div>
      </div>
    </div>
  `,
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