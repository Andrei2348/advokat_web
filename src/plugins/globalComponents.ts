import { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import FormElement from '@/components/FormElement/FormElement.vue'
import NotificationsComponent from '@/components/NotificationsComponent/NotificationsComponent.vue'
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu.vue'
import StarRating from '@/components/StarRating/StarRating.vue'
import DateElement from '@/components/DateElement/DateElement.vue'
import SelectElement from '@/components/SelectElement/SelectElement.vue'
import ColorPicker from '@/components/ColorPicker/ColorPicker.vue'
import ButtonsMobileSwipe from '@/components/ButtonsMobileSwipe/ButtonsMobileSwipe.vue'
import DocumentSigningInfo from '@/components/DocumentSigningInfo/DocumentSigningInfo.vue'
import TableHead from '@/components/TableHead/TableHead.vue'

const globalComponents = (app: App) => {
  app.component('SvgIcon', SvgIcon)
  app.component('FormElement', FormElement)
  app.component('NotificationsComponent', NotificationsComponent)
  app.component('DropdownMenu', DropdownMenu)
  app.component('StarRating', StarRating)
  app.component('DateElement', DateElement)
  app.component('SelectElement', SelectElement)
  app.component('ColorPicker', ColorPicker)
  app.component('ButtonsMobileSwipe', ButtonsMobileSwipe)
  app.component('DocumentSigningInfo', DocumentSigningInfo)
  app.component('TableHead', TableHead)
}
export default globalComponents
