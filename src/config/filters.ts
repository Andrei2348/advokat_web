import { Filters } from '@/types/filters'

export const filters: Filters = {
  'clients-table': {
    filtersList: {
      radio: {
        title: 'По статусам',
        options: [
          { valueToShow: 'Все', valueToPass: null },
          { valueToShow: 'Активный', valueToPass: 1 },
          { valueToShow: 'Неактивный', valueToPass: 0 },
        ],
        component: 'RadioFilter',
        purpose: 'isContractValidityValid',
      },
    },
    values: {
      isContractValidityValid: null,
    },
  },
  tasks: {
    filtersList: {
      radio: {
        title: 'По статусам',
        options: [
          { valueToShow: 'Все', valueToPass: null },
          { valueToShow: 'Запланирована', valueToPass: 'planned' },
          { valueToShow: 'Завершена', valueToPass: 'finished' },
        ],
        component: 'RadioFilter',
        purpose: 'status',
      },
      group: {
        title: 'По содержимому',
        filters: {
          clientsList: {
            title: 'По клиенту',
            component: 'ListFilterSelection',
            modal: {
              component: 'ListFilter',
              multiple: true,
            },
            purpose: 'customerIds',
          },
          lawsuitsList: {
            title: 'По делу',
            component: 'ListFilterSelection',
            modal: {
              component: 'ListFilter',
              multiple: false,
            },
            purpose: 'lawsuitIds',
          },
          select: {
            title: 'По Тэгу',
            options: 'tags',
            placeholder: 'Выберите тэги',
            component: 'SelectElement',
            multiple: true,
            closeOnSelect: false,
            purpose: 'taskTagIds',
          },
          radio: {
            title: 'По стоимости',
            options: [
              { valueToShow: 'Все', valueToPass: null },
              { valueToShow: 'Платно', valueToPass: true },
              { valueToShow: 'Бесплатно', valueToPass: false },
            ],
            component: 'RadioFilter',
            purpose: 'isBillable',
          },
        },
        component: 'SearchFiltersGroup',
      },
      dateRange: {
        title: 'По дедлайну',
        from: 'От',
        to: 'До',
        component: 'DateRangeFilter',
        purpose: 'deadline',
      },
    },
    values: {
      status: null,
      deadline: {
        from: '',
        to: '',
      },
      taskTagIds: [],
      customerIds: [],
      lawsuitIds: [],
    },
  },
}
