export type RootState = {
  windowWidth: number
}
export type RootGetters = {
  isMobile: (state: RootState) => boolean
  isTablet: (state: RootState) => boolean
  isNotebook: (state: RootState) => boolean
  isDesktop: (state: RootState) => boolean
}
