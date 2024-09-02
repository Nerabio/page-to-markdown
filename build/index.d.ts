import EventEmitter from "node:events";
export declare class Module {
    private eventBus;
    private sourceDirectory;
    onInit(config: {
        sourceDirectory: string;
    }, eventBus: EventEmitter): Promise<void>;
    run(): Promise<void>;
    info(): Promise<{
        name: string;
        version: string;
    }>;
    onDestroy(): Promise<void>;
    replaceAsync(str: string, regex: string | RegExp, asyncFn: (url: string) => Promise<string>): Promise<string>;
    imageUrlToBase64(url: string): Promise<string>;
}
