[![Actions](https://github.com/fluentc/i18next-fluentc-backend/workflows/node/badge.svg)](https://github.com/fluentc/i18next-fluentc-backend/actions?query=workflow%3Anode)
[![Travis](https://img.shields.io/travis/fluentc/i18next-fluentc-backend/master.svg?style=flat-square)](https://travis-ci.org/fluentc/i18next-fluentc-backend)
[![npm version](https://img.shields.io/npm/v/i18next-fluentc-backend.svg?style=flat-square)](https://www.npmjs.com/package/i18next-fluentc-backend)

This is an [i18next backend plugin](https://www.i18next.com/principles/plugins) to be used for [fluentc](https://fluentc.io) service.

If you're not familiar with i18next and how i18next backend plugins works, please first have a look at the [i18next documentation](https://www.i18next.com/how-to/add-or-load-translations#load-using-a-backend-plugin).

<div align="center">
  <a href="https://dashboard.fluentc.io/" target="_blank" style="margin-right: 30px;">
    <img src="https://i.postimg.cc/9MTyH8zy/logo.png" width="240px">
  </a>
  <a href="https://www.i18next.com/" target="_blank">
    <img src="https://i.postimg.cc/TPHgvt1g/i18next-logo.webp" width="240px">
  </a>
</div>

<p style="margin-top: 50px;"> </p>

# Obtaining the environmentId from the [dashboard](https://dashboard.fluentc.io)
To use this fluentc-i18next-backend, it's necessary to retrieve the environmentId associated with your project.

Follow these steps:

- Log in to your account on the [fluentc dashboard](https://dashboard.fluentc.io).
- Navigate to the Applications page.
- Select the environment that you wish to use with this module.
- Locate the environmentId displayed within the environment's details section.
- Click on the copy icon to copy the environmentId to your clipboard.

Once you have obtained the environmentId, you can use it with fluentc-i18next-backend to interact with your project.


# Troubleshooting

Make sure you set the `debug` option of i18next to `true`. This will maybe log more information in the developer console.


**Loading translations not working**

Make sure you're using the correct environmentId.


```javascript
import i18next from "i18next";
import Fluentc from "i18next-fluentc-backend";

i18next.use(Fluentc).init({
  backend: {
    environmentId: "[ENVIRONMENTID]",
    referenceLng: "en"
  }
});
```


# Getting started

Source can be loaded via [npm](https://www.npmjs.com/package/i18next-fluentc-backend), `yarn`, `bower` or [downloaded](https://cdn.rawgit.com/fluentc/i18next-fluentc-backend/master/i18nextFluentcBackend.min.js) from this repo.

```bash
# npm package
$ npm install i18next-fluentc-backend

# yarn
$ yarn add i18next-fluentc-backend

# bower
$ bower install i18next-fluentc-backend
```

Wiring up:

```js
import i18next from 'i18next';
import Fluentc from 'i18next-fluentc-backend';
// or
const i18next = require('i18next');
const Fluentc = require('i18next-fluentc-backend');

i18next.use(Fluentc).init(i18nextOptions);
```

for Deno:

```js
import i18next from 'https://deno.land/x/i18next/index.js'
import Backend from 'https://deno.land/x/i18next_fluentc_backend/index.js'

i18next.use(Backend).init(i18nextOptions);
```

- As with all modules you can either pass the constructor function (class) to the i18next.use or a concrete instance.
- If you don't use a module loader it will be added to `window.i18nextFluentcBackend`

## Backend Options

**IMPORTANT** make sure you do not add your apiKey in the production build to avoid misuse by strangers

```js
{
  // the id of your Fluentc environment
  environmentId: "[ENVIRONMENTID]",

  // the reference language of your project
  referenceLng: '[LNG]',

  // can be used to reload resources in a specific interval (useful in server environments)
  reloadInterval: typeof window !== 'undefined' ? false : 60 * 60 * 1000,
}
```

To load translations only `environmentId` needs to be filled.

Options can be passed in:

**preferred** - by setting options.backend in i18next.init:

```js
import i18next from "i18next";
import Fluentc from "i18next-fluentc-backend";

i18next.use(Fluentc).init({
  backend: options
});
```

on construction:

```js
import Fluentc from "i18next-fluentc-backend";
const fluentc = new Fluentc(options);
```

via calling init:

```js
import Fluentc from "i18next-fluentc-backend";
const fluentc = new Fluentc();
fluentc.init(options);
```

## Additional API endpoints

### backend.getLanguages

Will return a list of all languages in your environment. Languages are available in English and in native language.

```js
import Fluentc from "i18next-fluentc-backend";
const fluentc = new Fluentc(options);

fluentc.getLanguages((err, data) => {
  /*
  data is:

  [
    {
      "label": "Afrikaans",
      "code": "af",
      "localLabel": "Afrikaans"
    },
    {
      "label": "Spanish",
      "code": "es",
      "localLabel": "Español"
    }
    {
      "label": "Japanese",
      "code": "ja",
      "localLabel": "日本語"
    }
  ]
  */
});

// or
const data = await fluentc.getLanguages();

// or
i18next.services.backendConnector.backend.getLanguages(callback);

// or
const data = await i18next.services.backendConnector.backend.getLanguages();
```


## SPECIAL - let the backend determine some options to improve loading

You can load some information from the backend to eg. set supportedLngs for i18next just supporting languages you got in your fluentc environment.

You will get i18next options for (same as above backend.getOptions):

- fallbackLng
- supportedLngs
- load

```js
import i18next from "i18next";
import Fluentc from "i18next-fluentc-backend";

const fluentc = new Fluentc(
  {
    environmentId: "[environmentId]",
    apiKey: "[APIKEY]",
    // referenceLng -> not needed as will be loaded from API
  },
  (err, opts, lngs) => {
    i18next.use(fluentc).init({ ...opts, ...yourOptions }); // yourOptions should not include backendOptions!
  }
);
```

### Special usage with react-i18next without using Suspense

Use `setI18n` to pass in the i18next instance before initializing:

```js
import i18n from "i18next";
import { initReactI18next, setI18n } from "react-i18next";
import FluentcBackend from "i18next-fluentc-backend";

const backendOptions = {
  environmentId: "1d0aa5aa-4660-4154-b6d9-907dbef10bb3"
};

const yourOptions = {
  debug: true,
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false
  }
};

// this is only used if not using suspense
i18n.options.react = yourOptions.react;
setI18n(i18n);

const backend = new FluentcBackend(backendOptions, (err, opts) => {
  if (err) return console.error(err);
  i18n
    .use(backend)
    // .use(initReactI18next) // keep this if using suspense
    // yourOptions should not include backendOptions!
    .init({ ...opts, ...yourOptions }, (err, t) => {
      if (err) return console.error(err);
    });
});

export default i18n;
```

## TypeScript

To properly type the backend options, you can import the `FluentcBackendOptions` interface and use it as a generic type parameter to the i18next's `init` method, e.g.:

```ts
import i18n from 'i18next'
import FluentcBackend, { FluentcBackendOptions } from 'i18next-fluentc-backend'

i18n
  .use(FluentcBackend)
  .init<FluentcBackendOptions>({
    backend: {
      // fluentc backend options
    },

    // other i18next options
  })
```

<p align="center">
  <a href="https://dashboard.fluentc.io/" target="_blank">
    <img src="https://i.postimg.cc/9MTyH8zy/logo.png" width="240px">
  </a>
</p>