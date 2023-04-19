const arr = []
const each = arr.forEach
const slice = arr.slice

export function defaults (obj) {
  each.call(slice.call(arguments, 1), (source) => {
    if (source) {
      for (const prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop]
      }
    }
  })
  return obj
}

export function hasXMLHttpRequest () {
  return (typeof XMLHttpRequest === 'function' || typeof XMLHttpRequest === 'object')
}

export function defer () {
  let res
  let rej

  const promise = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  promise.resolve = res
  promise.reject = rej

  return promise
}

export function isMissingOption (obj, props) {
  return props.reduce((mem, p) => {
    if (mem) return mem
    if (!obj || !obj[p] || typeof obj[p] !== 'string' || !obj[p].toLowerCase() === p.toLowerCase()) {
      const err = `i18n-fluentc :: got "${obj[p]}" in options for ${p} which is invalid.`
      console.warn(err)
      return err
    }
    return false
  }, false)
}

export function getCacheData (store) {
  if (!store) return null;
  const data = store.getItem('fluentc_cache');
  if (!data) return [];
  try {
    const ret = JSON.parse(data) || [];
    return ret;
  } catch(ex) {
    return [];
  }
}

export function saveCacheData (store, data) {
  if (!store) return ;
  const cache = getCacheData(store);
  const idx = cache.findIndex(c => c.lang === data.lang);
  if (idx === -1) cache.push(data);
  else cache[idx] = data;
  store.setItem('fluentc_cache', JSON.stringify(cache));
}