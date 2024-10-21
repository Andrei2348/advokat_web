export type SwipeButton = {
  action: string
  icon: string
  class: string
  handler?: () => void
}

export type SwipeButtons = {
  lawsuit: SwipeButton[]
  client: SwipeButton[]
  task: SwipeButton[]
  event: SwipeButton[] | []
  authorities: SwipeButton[]
  eventSettings: SwipeButton[] | []
  categorySettings: SwipeButton[] | []
  taskTagSettings: SwipeButton[] | []
}

const CLASS_BASIS = 'swipe__btn_type_'

const commonButtons = {
  complete: {
    action: 'complete',
    icon: 'done',
    class: `${CLASS_BASIS}done`,
  },
  trash: {
    action: 'remove',
    icon: 'trash04',
    class: `${CLASS_BASIS}remove`,
  },
  removeFromReport: {
    action: 'removeFromReport',
    icon: 'fileMinus',
    class: `${CLASS_BASIS}report-remove`,
  },
  addToReport: {
    action: 'addToReport',
    icon: 'filePlus',
    class: `${CLASS_BASIS}report-add`,
  },
}

export const taskReportButton = (isInReport: boolean): SwipeButton =>
  isInReport ? commonButtons.removeFromReport : commonButtons.addToReport

export const rightSwipeButtons: SwipeButtons = {
  lawsuit: [
    {
      action: 'edit',
      icon: 'edit2',
      class: `${CLASS_BASIS}edit`,
    },
  ],
  client: [
    {
      action: 'open',
      icon: 'user',
      class: `${CLASS_BASIS}user`,
    },
  ],
  task: [
    commonButtons.complete,
    {
      action: 'bookmark',
      icon: 'bookmark',
      class: `${CLASS_BASIS}bookmark`,
    },
  ],
  event: [
    commonButtons.complete,
    {
      action: 'complete',
      icon: 'done',
      class: `${CLASS_BASIS}done`,
    },
  ],
  authorities: [
    {
      action: 'edit',
      icon: 'edit2',
      class: `${CLASS_BASIS}edit`,
    },
  ],
  eventSettings: [],
  categorySettings: [],
  taskTagSettings: [],
}

export const leftSwipeButtons: SwipeButtons = {
  lawsuit: [commonButtons.trash],
  client: [commonButtons.trash],
  task: [commonButtons.trash],
  event: [],
  authorities: [commonButtons.trash],
  eventSettings: [commonButtons.trash],
  categorySettings: [commonButtons.trash],
  taskTagSettings: [commonButtons.trash],
}
