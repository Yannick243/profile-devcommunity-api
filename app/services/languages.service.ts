/* eslint-disable @typescript-eslint/naming-convention */

type LANGUAGE_TYPE = 'en' | 'fr'
type MESSAGE_KEY =
  | 'FOUND_SKILL'
  | 'DELETE_SKILL'
  | 'LOGIN'
  | 'LOGOUT'
  | 'FOUND_CATEGORY'
  | 'DELETE_CATEGORY'
  | 'FOUND_LEVEL'
  | 'DELETE_LEVEL'
  | 'FOUND_DEV_TYPE'
  | 'DELETE_DEV_TYPE'

type I_OBJECT = Record<MESSAGE_KEY, string>
type LANGUAGE = Record<LANGUAGE_TYPE, I_OBJECT>

export default class LanguagesService {
  private messages: LANGUAGE = {
    en: {
      LOGIN: '',
      LOGOUT: 'User logged out',
      FOUND_SKILL: 'No skills found',
      DELETE_SKILL: 'Skill remove successfully.',
      FOUND_CATEGORY: 'No category found',
      DELETE_CATEGORY: 'Category remove successfully.',
      FOUND_LEVEL: 'No Level found',
      DELETE_LEVEL: 'Level remove successfully.',
      FOUND_DEV_TYPE: 'No dev type found.',
      DELETE_DEV_TYPE: 'Dev type remove successfully',
    },
    fr: {
      LOGIN: 'Utilisateur deconnecter',
      LOGOUT: '',
      FOUND_SKILL: 'Aucune competence trouver.',
      DELETE_SKILL: 'Competence supprimer avec succes.',
      FOUND_CATEGORY: 'Aucune categorie trouver.',
      DELETE_CATEGORY: 'Categorie supprimer avec succes.',
      FOUND_LEVEL: 'Aucun niveau trouver.',
      DELETE_LEVEL: 'Niveau supprimer avec succes.',
      FOUND_DEV_TYPE: 'Aucun type developpeur trouver.',
      DELETE_DEV_TYPE: 'Type developpeur supprimer avec succes.',
    },
  }

  get_message(language: LANGUAGE_TYPE, key: MESSAGE_KEY): string {
    return this.messages[language][key]
  }
}
