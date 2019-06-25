import _ from "lodash";


export default class Utils {

  public static randomString(len: number, charSet: string) :string {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
      let randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
  }

  public static isEmpty(variable: any){
    if(_.isUndefined(variable))
        return true;
    if(_.isNull(variable))
        return true;
    if(_.isString(variable) && _.isEmpty(variable))
        return true;
    return false;
  }

  public static now(){
    return Math.floor(Date.now());
  }

}
