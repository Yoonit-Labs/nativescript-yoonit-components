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

export const SIZE = 'size'
export const FILL = 'fill'
export const ICON = 'icon'
export const ICON_POSITION = 'iconPosition'
export const ICON_SIZE = 'iconSize'
export const TEXT_COLOR = 'textColor'
export const ANIMATION = 'animation'

const SIZES = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'hg'
]

const FILLS = [
  'primary',
  'danger',
  'neutral',
  'light',
  'dark',
  'disable',
  'gray'
]

const COLOR_MODES = [
  'light',
  'dark'
]

const POSITIONS = [
  'left',
  'right',
  'center',
  'bottom'
]

const ANIMATIONS = [
  'none',
  'pulse'
]

export const OPTIONS = {
  [SIZE]: {
    default: SIZES[2],
    validator: SIZES
  },
  [FILL]: {
    default: FILLS[0],
    validator: FILLS
  },
  [TEXT_COLOR]: {
    default: COLOR_MODES[0],
    validator: COLOR_MODES
  },
  [ICON_POSITION]: {
    default: POSITIONS[0],
    validator: POSITIONS
  },
  [ICON_SIZE]: {
    default: SIZES[1],
    validator: SIZES
  },
  [ANIMATION]: {
    default: ANIMATIONS[0],
    validator: ANIMATIONS
  }
}
