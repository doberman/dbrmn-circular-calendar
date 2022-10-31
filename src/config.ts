import { Calendar } from './models'

export const year = 2022

export const calendars: Calendar[] = [
  { name: 'nordic', color: '#F6C899', eventColor: '#FF8100', id: '' },
  {
    name: 'stockholm',
    color: '#F4B5C0',
    eventColor: '#FF002D',
    id: 'DBRMN_STO_STUDIO_PUBLIC_HOLIDAYS'
  },
  {
    name: 'copenhagen',
    color: '#F3BAFA',
    eventColor: '#E300FF',
    id: 'DBRMN_COP_STUDIO_PUBLIC_HOLIDAYS'
  },
  { name: 'oslo', color: '#D4B9F9', eventColor: '#6C00FF', id: '' },
  { name: 'helsinki', color: '#BDD0FB', eventColor: '#004EFF', id: '' },
  { name: 'ey', color: '#E2FFA5', eventColor: '#ADFF00', id: '' }
]
