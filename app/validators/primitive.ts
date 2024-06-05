/* eslint-disable @typescript-eslint/naming-convention */
import vine from '@vinejs/vine'

export const create_primitive_validator = vine.compile(
  vine.object({
    designation: vine.string().trim().maxLength(40),
    description: vine.string().trim().escape().maxLength(200).optional(),
  })
)
export const update_primitive_validator = vine.compile(
  vine.object({
    designation: vine.string().trim().maxLength(40).optional().requiredIfMissing(['description']),
    description: vine.string().trim().escape().maxLength(200).optional(),
  })
)
