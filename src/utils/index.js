/**
 *@description 参数 URL编码;
 */
 export function toParams (param) {
  var result = ''
  for (const name in param) {
    if (typeof param[name] !== 'function') {
      result += '&' + name + '=' + encodeURI(param[name])
    }
  }
  return result.substring(1)
}
