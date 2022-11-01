import type { Calendar } from './types'

export const year = 2022

export const calendars: Calendar[] = [
  {
    name: 'nordic',
    color: '#F6C899',
    eventColor: '#FF8100',
    calendarId: 'DBRMN_NORDIC'
  },
  {
    name: 'stockholm',
    color: '#F4B5C0',
    eventColor: '#FF002D',
    calendarId: 'DBRMN_STO_STUDIO',
    holidayId: 'DBRMN_STO_STUDIO_PUBLIC_HOLIDAYS'
  },
  {
    name: 'copenhagen',
    color: '#F3BAFA',
    eventColor: '#E300FF',
    calendarId: 'DBRMN_COP_STUDIO',
    holidayId: 'DBRMN_COP_STUDIO_PUBLIC_HOLIDAYS'
  },
  {
    name: 'oslo',
    color: '#D4B9F9',
    eventColor: '#6C00FF',
    calendarId: 'DBRMN_OSL_STUDIO',
    holidayId: 'DBRMN_OSL_STUDIO_PUBLIC_HOLIDAYS'
  },
  {
    name: 'helsinki',
    color: '#BDD0FB',
    eventColor: '#004EFF',
    calendarId: 'DBRMN_HEL_STUDIO',
    holidayId: 'DBRMN_HEL_STUDIO_PUBLIC_HOLIDAYS'
  },
  {
    name: 'ey',
    color: '#E2FFA5',
    eventColor: '#ADFF00',
    calendarId: 'DBRMN_EY'
  }
]
