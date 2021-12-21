/**
 * ██╗   ██╗ ██████╗  ██████╗ ███╗   ██╗██╗████████╗
 * ╚██╗ ██╔╝██╔═══██╗██╔═══██╗████╗  ██║██║╚══██╔══╝
 *  ╚████╔╝ ██║   ██║██║   ██║██╔██╗ ██║██║   ██║
 *   ╚██╔╝  ██║   ██║██║   ██║██║╚██╗██║██║   ██║
 *    ██║   ╚██████╔╝╚██████╔╝██║ ╚████║██║   ██║
 *    ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝
 *
 * https://yoonit.dev - about@yoonit.dev
 *
 * NativeScript Yoonit Components
 * NativeScript VueJS Atomic Design System framework
 *
 * Luigui Delyer @ 2021
 */

export const DURATION = 'duration'
export const MODE = 'mode'
export const STATUS = 'status'
export const EVENT_END = 'end'
export const EVENT_STATUS = 'status'

export const MODES = [
  'single',
  'loop'
]

export const STATUSES = [
  'play',
  'stop',
  'pause'
]

export const OPTIONS = {
  [DURATION]: {
    default: 1000
  },
  [MODE]: {
    default: MODES[0],
    validator: MODES
  },
  [STATUS]: {
    default: STATUSES[0],
    validator: STATUSES
  }
}
