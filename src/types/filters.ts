export type FilterReturnValue = {
  labelText: string
  value: { [key: string]: any } // Значение, которое передаётся в объект для поиска
  text?: string // Текст для отображения в списке значения фильтра в списке выбранных
}

export type SearchFiltersListPanel = {
  title: string
  value: string
  parameter: string // соответствует ключу в PageSearchParams.values
}

export type Options = {
  valueToShow: string
  valueToPass: any
}

export type CommonFilterFields<Component> = {
  title: string
  component: Component
}

export type DateRange = CommonFilterFields<'DateRangeFilter'> & {
  from: string
  to: string
  purpose: string
}

export type RadioType = CommonFilterFields<'RadioFilter'> & {
  options: Options[]
  purpose: string
}

export type SelectType = CommonFilterFields<'SelectElement'> & {
  options: string
  placeholder?: string
  multiple?: boolean
  closeOnSelect?: boolean
  purpose: string
}

export type ModalType = {
  component: string
  multiple: boolean
}

export type ListType = CommonFilterFields<'ListFilterSelection'> & {
  modal: ModalType
  purpose: string
}

export type FilterGroup = CommonFilterFields<'SearchFiltersGroup'> & {
  filters: Filter
}

export type Filter = {
  radio?: RadioType
  dateRange?: DateRange
  group?: FilterGroup
  select?: SelectType
  clientsList?: ListType
  lawsuitsList?: ListType
}

export type PageSearchParams = {
  filtersList: Filter
  values: object
}

export type Filters = Record<string | symbol, PageSearchParams>
