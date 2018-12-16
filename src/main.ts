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
    let word
    // うまく取得できなかった場合はとりあえず謝る
    let message = 'すいません、わかりませんでした。他に知りたい単語はありますか？'
    try {
      // tslint:disable-next-line:no-invalid-this
      word = this.event.request.intent.slots.word.resolutions.resolutionsPerAuthority[0].values[0].value.name
    } catch (e) {
      console.log(e)
    }

    // ちゃんと辞書に登録されていたら意味を伝える
    if (word !== undefined && wordMap[word] !== undefined) {
      message = `${wordMap[word]} 他に知りたい単語はありますか？`
    }

    // tslint:disable-next-line:no-invalid-this
    this.emit(':ask', message)
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
