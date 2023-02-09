import { BackendModule, MultiReadCallback, ReadCallback, ResourceKey } from "i18next";

export interface FluentcBackendOptions {
  /**
   * your FluentC environmentId
   */
  environmentId: string;
  /**
   * your FluentC apikey (only use this in development) to add / update translations
   */
  apiKey?: string;
  /**
   * the reference (source) language of your project (default "en")
   */
  referenceLng?: string;
  /**
   * allow cross domain requests
   */
  crossDomain?: boolean;
  /**
   * define a custom xhr function
   * can be used to support XDomainRequest in IE 8 and 9
   */
  request?(
    options: FluentcBackendOptions,
    url: string,
    payload: {} | string,
    callback: RequestCallback
  ): void;

  /**
   * can be used to reload resources in a specific
   * interval (useful in server environments)
   */
  reloadInterval?: false | number;
}

type RequestCallback = (error: any, response: RequestResponse) => void;

interface RequestResponse {
  status: number;
  data: ResourceKey;
}

export default class I18NextHttpBackend
  implements BackendModule<FluentcBackendOptions>
{
  static type: "backend";
  constructor(services?: any, options?: FluentcBackendOptions);
  init(services?: any, options?: FluentcBackendOptions): void;
  readMulti?(
    languages: string[],
    namespaces: string[],
    callback: MultiReadCallback
  ): void;
  read(language: string, namespace: string, callback: ReadCallback): void;
  loadUrl(
    url: string,
    callback: ReadCallback,
    languages?: string | string[],
    namespaces?: string | string[]
  ): void;
  create?(
    languages: string[],
    namespace: string,
    key: string,
    fallbackValue: string
  ): void;
  type: "backend";
  services: any;
  options: FluentcBackendOptions;
}
