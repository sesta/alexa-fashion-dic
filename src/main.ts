import { Context, handler, Request, RequestBody } from 'alexa-sdk'

import { wordMap } from './words'

const APP_ID: string = undefined

export const handle = (event: RequestBody<Request>, context: Context): void => {
  const alexa = handler(event, context)
  alexa.appId = APP_ID
  alexa.registerHandlers(handlers)
  alexa.execute()
}

const handlers: {[key: string]: () => void} = {
  'LaunchRequest'(): void {
    const message = '知りたい単語をどうぞ。'

    // tslint:disable-next-line:no-invalid-this
    this.emit(':ask', message)
  },
  'WordIntent'(): void {
    // tslint:disable-next-line:no-invalid-this
    const word = this.event.request.intent.slots.word.resolutions.resolutionsPerAuthority[0].values[0].value.name

    // tslint:disable-next-line:no-invalid-this
    this.emit(':ask', `${wordMap[word]} 他に知りたい単語はありますか？`)
  },
  'AMAZON.HelpIntent'(): void {
    // tslint:disable-next-line:no-invalid-this
    this.emit(':ask', 'ファッションに関する用語の意味をお伝えします。知りたい単語をどうぞ。', 'どうしますか？')
  },
  'AMAZON.CancelIntent'(): void {
    // tslint:disable-next-line:no-invalid-this
    this.emit(':tell', 'ご利用いただきありがとうございました。')
  },
  'AMAZON.StopIntent'(): void {
    // tslint:disable-next-line:no-invalid-this
    this.emit(':tell', 'ご利用いただきありがとうございました。')
  },
  'SessionEndedRequest'(): void {
    // tslint:disable-next-line:no-invalid-this
    this.emit(':tell', 'ご利用いただきありがとうございました。')
  }
}
