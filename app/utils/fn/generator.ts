import generator from 'generate-password'
// import { v4 as uuidv4 } from 'uuid'
import short from 'short-uuid'

export default class Generator {
  private static instance: Generator

  static generate() {
    if (this.instance) this.instance = new Generator()
    return this.instance
  }

  //
  static password(length: number): string {
    return generator.generate({
      length,
      lowercase: false,
      strict: true,
    })
  }

  //generate uuid
  static uuid(): string {
    return short.uuid()
  }
}
