export type Position = {
  x: number
  y: number
}

export type MenuItemDropdown = {
  id?: number
  title: string
  color?: string
  function: string
  routes?: { name: string; options?: any }[]
}
