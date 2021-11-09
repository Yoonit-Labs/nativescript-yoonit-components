import {
  CriptoModule,
  LogDNA
} from '~/components/bosons'

import {
  KeyURL,
  KeyURI
} from './MakeURL'

import $store from '@/vuex'

import { Vibrate } from 'nativescript-vibrate'

const vibrator = new Vibrate()

const {
  dispatch: $dispatch,
  getters: $getters
} = $store

const ResolverURL = async (url, { $navigator }) => {
  if (!url) {
    return false
  }

  const {
    data,
    status
  } = CriptoModule
    .decriptograph(
      url
        .replace(
          KeyURL,
          ''
        )
        .replace(
          KeyURI,
          ''
        )
    )

  if (!status) {
    return false
  }

  const {
    invite,
    device
  } = JSON.parse(data)

  if (invite) {
    const response = await inviteChecker(invite, $navigator)

    if (response) {
      vibrator.vibrate(500)

      return {
        invite: true,
        device: false
      }
    }
  }

  if (device) {
    const response = await deviceChecker(device, $navigator)

    if (response) {
      vibrator.vibrate(500)

      return {
        invite: false,
        device: true
      }
    }
  }

  return {
    invite: false,
    device: false
  }
}

const deviceChecker = async (device, $navigator) => {
  await $dispatch('main/setDefaultLoading', {}, { root: true })

  const portalVerified = await $dispatch(
    'devices/setExecuteActionFromQRCode',
    device
  )

  await $dispatch('main/setHideLoading', {}, { root: true })

  if (!portalVerified.status) {
    setTimeout(
      () =>
        $navigator
          .navigate(
            'StepGenericError', {
              backstackVisible: false,
              props: {
                destination: portalVerified.routeToRedirect || 'PortalList',
                title: portalVerified.portalName || portalVerified.title,
                subtitle: portalVerified.deviceName,
                content: portalVerified.content || portalVerified.message,
                extraContent: portalVerified.extraContent,
                subtitleIcon: portalVerified.deviceName ? 'qrcode' : '',
                buttonText: portalVerified.callToActionText || 'Tentar novamente',
                navigateProps: {
                  backstackVisible: false
                }
              },
              transitioniOS: {
                name: 'fade',
                duration: 320
              }
            }),
      1
    )
    return false
  }

  setTimeout(
    () =>
      $navigator
        .navigate(
          'StepGenericSuccess', {
            props: {
              activeStep: 0,
              destination: 'PortalList',
              steps: [
                {
                  title: 'QR Code reconhecido!',
                  subtitle: `${portalVerified.portalName}`,
                  detail: `${portalVerified.deviceName}`,
                  buttonText: 'Ok',
                  icon: 'check',
                  fill: 'light',
                  detailIcon: 'qrcode'
                }
              ],
              clearHistory: true
            },
            clearHistory: true,
            transitioniOS: {
              name: 'fade',
              duration: 320
            }
          }),
    1
  )

  LogDNA.ingest({
    message: 'Opening Device URL',
    level: 'LOG',
    where: 'ResolverURL.deviceChecker()'
  })

  return true
}

const inviteChecker = async (invite, $navigator) => {
  await $dispatch(
    'portals/setPortals'
  )

  await $dispatch(
    'invitations/setInvitationByHash',
    invite
  )

  const {
    portalId,
    expiration
  } = $getters['invitations/getSelectedInvitation']

  if (!portalId) {
    return
  }

  const alreadyInPortal = $getters['portals/getPortals']
    .filter(
      ({ id }) =>
        Number(id) === Number(portalId)
    )

  if (alreadyInPortal.length) {
    return false
  }

  await $dispatch(
    'portals/setUniquePortalById',
    portalId
  )

  const {
    id,
    name,
    payload,
    portalHash
  } = $getters['portals/getSelectedPortal']

  $dispatch('portals/setResetSelectedPortal')

  setTimeout(
    () =>
      $navigator
        .navigate(
          'PortalAcceptInvite',
          {
            props: {
              invite: {
                hash: invite,
                expiration
              },
              portal: {
                id,
                name,
                payload,
                portalHash
              }
            }
          }
        ),
    1
  )

  LogDNA.ingest({
    message: 'Opening Invite URL',
    level: 'LOG',
    where: 'ResolverURL.inviteChecker()'
  })

  return true
}

export default ResolverURL
