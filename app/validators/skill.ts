/* eslint-disable @typescript-eslint/naming-convention */
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const create_skill_validator = vine.compile(
  vine.object({
    designation: vine.string().trim().maxLength(40),
    description: vine.string().trim().escape().maxLength(200).optional(),
    cover: vine.string().optional(),
  })
)

export const update_skill_validator = vine.compile(
  vine.object({
    designation: vine.string().trim().maxLength(40),
    description: vine.string().optional(),
    cover: vine.string().optional(),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  // Applicable for all fields
  required: 'The {{ field }} field is required',
  string: 'The value of {{ field }} field must be a string',
})
