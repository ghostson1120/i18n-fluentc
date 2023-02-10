import { defaults, makePromise, defer, isMissingOption } from './utils.js'
import { getContent } from './query.js'
import request from './request.js'

const getDefaults = () => {
  return {
    apiPath: 'https://api.fluentc.io/graphql',
    apiKey: 'da2-wtkl5bpofjbu5ex5iugu4o2mbm',
    referenceLng: 'en',
    reloadInterval: typeof window !== 'undefined' ? false : 60 * 60 * 1000,
    crossDomain: false, // used for XmlHttpRequest
    allowedAddOrUpdateHosts: ['localhost']
  }
}

class Backend {
  constructor (services, options = {}, allOptions = {}, callback) {
    this.services = services
    this.options = options
    this.allOptions = allOptions
    this.type = 'backend'
    if (services && services.environmentId) {
      this.init(null, services, allOptions, options)
    } else {
      this.init(services, options, allOptions, callback)
    }
  }

  init (services, options = {}, allOptions = {}, callback) {
    if (!options.referenceLng && allOptions.fallbackLng && Array.isArray(allOptions.fallbackLng) && allOptions.fallbackLng[0] !== 'dev') {
      options.referenceLng = allOptions.fallbackLng[0]
    }
    this.services = services
    const defOpt = getDefaults()
    const passedOpt = defaults(options, this.options || {})
    if (passedOpt.reloadInterval && passedOpt.reloadInterval < (5 * 60 * 1000)) {
      console.warn('Your configured reloadInterval option is to low.')
      passedOpt.reloadInterval = defOpt.reloadInterval
    }
    this.options = defaults(options, this.options || {}, defOpt)
    this.allOptions = allOptions
    this.somethingLoaded = false
    this.isProjectNotExisting = false

    const hostname = typeof window !== 'undefined' && window.location && window.location.hostname
    if (hostname) {
      this.isAddOrUpdateAllowed = typeof this.options.allowedAddOrUpdateHosts === 'function' ? this.options.allowedAddOrUpdateHosts(hostname) : this.options.allowedAddOrUpdateHosts.indexOf(hostname) > -1

      if (services && services.logger && (allOptions.saveMissing || allOptions.updateMissing)) {
        if (!this.isAddOrUpdateAllowed) {
          services.logger.warn(
            typeof this.options.allowedAddOrUpdateHosts === 'function'
              ? `fluentc-backend: will not save or update missings because allowedAddOrUpdateHosts returned false for the host "${hostname}".`
              : `fluentc-backend: will not save or update missings because the host "${hostname}" was not in the list of allowedAddOrUpdateHosts: ${this.options.allowedAddOrUpdateHosts.join(
                ', '
              )} (matches need to be exact).`
          )
        } else if (hostname !== 'localhost') {
          services.logger.warn(`fluentc-backend: you are using the save or update missings feature from this host "${hostname}".\nMake sure you will not use it in production!`)
        }
      }
    } else {
      this.isAddOrUpdateAllowed = true
    }

    // if (typeof callback === 'function') {
    //   this.getOptions((err, opts, languages) => {
    //     if (err) return callback(err)
    //     this.options.referenceLng = options.referenceLng || opts.referenceLng || this.options.referenceLng
    //     callback(null, opts, languages)
    //   })
    // }

    if (this.interval) clearInterval(this.interval)
    if (this.options.reloadInterval && this.options.environmentId) {
      this.interval = setInterval(() => this.reload(), this.options.reloadInterval)
    }
  }

  reload () {
    const { backendConnector, languageUtils, logger } = this.services || { logger: console }
    if (!backendConnector) return
    const currentLanguage = backendConnector.language
    if (currentLanguage && currentLanguage.toLowerCase() === 'cimode') return // avoid loading resources for cimode

    const toLoad = []
    const append = (lng) => {
      const lngs = languageUtils.toResolveHierarchy(lng)
      lngs.forEach(l => {
        if (toLoad.indexOf(l) < 0) toLoad.push(l)
      })
    }

    append(currentLanguage)

    if (this.allOptions.preload) this.allOptions.preload.forEach((l) => append(l))

    toLoad.forEach(lng => {
      this.allOptions.ns.forEach(ns => {
        backendConnector.read(lng, ns, 'read', null, null, (err, data) => {
          if (err) logger.warn(`loading namespace ${ns} for language ${lng} failed`, err)
          if (!err && data) logger.log(`loaded namespace ${ns} for language ${lng}`, data)

          backendConnector.loaded(`${lng}|${ns}`, err, data)
        })
      })
    })
  }

  // getLanguages (callback) {
  //   let deferred
  //   if (!callback) {
  //     deferred = defer()
  //     callback = (err, ret) => {
  //       if (err) return deferred.reject(err)
  //       deferred.resolve(ret)
  //     }
  //   }
  //   const isMissing = isMissingOption(this.options, ['environmentId'])
  //   if (isMissing) return callback(new Error(isMissing))

  //   // there are scenarios/users that seems to call getLanguges a lot of time
  //   this.getLanguagesCalls = this.getLanguagesCalls || []
  //   this.getLanguagesCalls.push(callback)
  //   if (this.getLanguagesCalls.length > 1) return

  //   this.loadUrl({}, url, (err, ret, info) => {
  //     if (!this.somethingLoaded && info && info.resourceNotExisting) {
  //       const e = new Error(`Fluentc environment ${this.options.projectId} does not exist!`)
  //       const clbs = this.getLanguagesCalls
  //       this.getLanguagesCalls = []
  //       return clbs.forEach((clb) => clb(e))
  //     }

  //     if (ret) {
  //       const referenceLng = Object.keys(ret).reduce((mem, k) => {
  //         const item = ret[k]
  //         if (item.isReferenceLanguage) mem = k
  //         return mem
  //       }, '')
  //       if (referenceLng && this.options.referenceLng !== referenceLng) {
  //         this.options.referenceLng = referenceLng
  //       }
  //     }

  //     this.somethingLoaded = true
  //     const clbs = this.getLanguagesCalls
  //     this.getLanguagesCalls = []
  //     clbs.forEach((clb) => clb(err, ret))
  //   })
  //   return deferred
  // }

  // getOptions (callback) {
  //   let deferred
  //   if (!callback) {
  //     deferred = defer()
  //     callback = (err, ret) => {
  //       if (err) return deferred.reject(err)
  //       deferred.resolve(ret)
  //     }
  //   }
  //   this.getLanguages((err, data) => {
  //     if (err) return callback(err)
  //     const keys = Object.keys(data)
  //     if (!keys.length) { return callback(new Error('was unable to load languages via API')) }

  //     const lngs = keys.reduce((mem, k) => {
  //       const item = data[k]
  //       if (
  //         item.translated[this.options.version] &&
  //         item.translated[this.options.version] >=
  //           this.options.translatedPercentageThreshold
  //       ) { mem.push(k) }
  //       return mem
  //     }, [])

  //     const hasRegion = keys.reduce((mem, k) => {
  //       if (k.indexOf('-') > -1) return true
  //       return mem
  //     }, false)

  //     callback(null, {
  //       fallbackLng: this.options.referenceLng,
  //       referenceLng: this.options.referenceLng,
  //       supportedLngs: lngs,
  //       load: hasRegion ? 'all' : 'languageOnly'
  //     }, data)
  //   })
  //   return deferred
  // }

  read (language, namespace, callback) {
    const { logger } = this.services || { logger: console }
    let options = {}
    
    const isMissing = isMissingOption(this.options, ['environmentId'])
    if (isMissing) return callback(new Error(isMissing), false)

    this.loadUrl({}, getContent(this.options.environmentId, language), (err, ret, info) => {
      if (!this.somethingLoaded) {
        if (info && info.resourceNotExisting) {
          // setTimeout(() => this.checkIfProjectExists(), this.options.checkForProjectTimeout)
        } else {
          this.somethingLoaded = true
        }
      }
      callback(err, ret)
    })
  }

  loadUrl (options, payload, callback) {
    console.log(options, payload)
    options = defaults(options, this.options)
    if (typeof payload === 'function') {
      callback = payload
      payload = undefined
    }
    callback = callback || (() => {})
    request(options, this.options.apiPath, payload, (err, res) => {
      const resourceNotExisting = res && res.resourceNotExisting

      if (res && (res.status === 408 || res.status === 400)) { // extras for timeouts on cloudfront
        return callback('failed loading ' + payload.type, false /* retry */, { resourceNotExisting })
      }
      if (res && ((res.status >= 500 && res.status < 600) || !res.status)) { return callback('failed loading ' + payload.type, false /* retry */, { resourceNotExisting }) }
      if (res && res.status >= 400 && res.status < 500) { return callback('failed loading ' + payload.type, false /* no retry */, { resourceNotExisting }) }
      if (!res && err && err.message && err.message.indexOf('Failed to fetch') > -1) { return callback('failed loading ' + payload.type, false /* retry */, { resourceNotExisting }) }
      if (err) return callback(err, false)

      let ret, parseErr
      try {
        ret = JSON.parse(res.data);
        ret = ret.data[payload.type].body;
      } catch (e) {
        parseErr = 'failed parsing ' + payload.type + ' to json'
      }
      if (parseErr) return callback(parseErr, false)
      if (this.options.failLoadingOnEmptyJSON && !Object.keys(ret).length) { return callback('loaded result empty for ' + payload.type, false, { resourceNotExisting }) }
      callback(null, ret, { resourceNotExisting })
    })
  }

  create (languages, namespace, key, fallbackValue, callback) {
    // If there is a falsey addPath, then abort -- this has been disabled.
    if (!this.options.addPath) return
    if (typeof languages === 'string') languages = [languages]
    const payload = this.options.parsePayload(namespace, key, fallbackValue)
    let finished = 0
    const dataArray = []
    const resArray = []
    languages.forEach(lng => {
      let addPath = this.options.addPath
      if (typeof this.options.addPath === 'function') {
        addPath = this.options.addPath(lng, namespace)
      }
      const url = this.services.interpolator.interpolate(addPath, { lng, ns: namespace })

      this.options.request(this.options, url, payload, (data, res) => {
        // TODO: if res.status === 4xx do log
        finished += 1
        dataArray.push(data)
        resArray.push(res)
        if (finished === languages.length) {
          if (typeof callback === 'function') callback(dataArray, resArray)
        }
      })
    })
  }
}

Backend.type = 'backend'

export default Backend
