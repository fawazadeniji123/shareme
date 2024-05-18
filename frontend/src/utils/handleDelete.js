import { deletePin } from './deletePin'

export const handleDelete = (pinId, setSaveList) => async e => {
  e.stopPropagation()
  e.target.disabled = true

  await deletePin(pinId, setSaveList)

  e.target.disabled = false
}
