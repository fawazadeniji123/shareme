import { savePin } from './savePin'

export const handleSave =
  (pinId, user, saveList, setSaveList, navigate) => async e => {
    e.stopPropagation()
    e.target.disabled = true

    await savePin(pinId, user, saveList, setSaveList, navigate)

    e.target.disabled = false
  }
