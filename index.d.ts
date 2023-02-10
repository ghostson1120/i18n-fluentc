import { BackendModule, MultiReadCallback, ReadCallback, ResourceKey, Services } from "i18next";

export interface FluentcBackendOptions {
  /**
   * your FluentC environmentId
   */
  environmentId: string;
  /**
   * your FluentC apikey (don't need to change)
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

type LoadCallback = (error: any, result: any) => void;

declare class I18NextLocizeBackend
  implements BackendModule<FluentcBackendOptions>
{
  static type: "backend";
  constructor(
    options?: FluentcBackendOptions,
    callback?: LoadCallback
  );
  constructor(
    services?: Services,
    options?: FluentcBackendOptions,
    callback?: LoadCallback
  );

  init(
    options?: FluentcBackendOptions,
    callback?: LoadCallback
  ): void;
  init(
    services?: Services,
    options?: FluentcBackendOptions,
    callback?: LoadCallback
  ): void;
  init(services?: any, options?: FluentcBackendOptions): void;

  getLanguages(callback: LoadCallback): void;
  getLanguages(): Promise<any>;
  getOptions(callback: LoadCallback): void;
  getOptions(): Promise<any>;
  read(language: string, namespace: string, callback: ReadCallback): void;
  loadUrl(url: string, options: any, callback: ReadCallback): void;
  create(
    languages: string | string[],
    namespace: string,
    key: string,
    fallbackValue: string,
    callback: LoadCallback,
    options: any
  ): void;
  create(
    languages: string[],
    namespace: string,
    key: string,
    fallbackValue: string
  ): void;
  update(
    languages: string | string[],
    namespace: string,
    key: string,
    fallbackValue: string,
    callback: LoadCallback,
    options: any
  ): void;
  write(language: string, namespace: string): void;
  type: "backend";
  options: FluentcBackendOptions;
}

export default I18NextLocizeBackend;
