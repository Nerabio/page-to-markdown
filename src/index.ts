import { NodeHtmlMarkdown } from "node-html-markdown";
import EventEmitter from "node:events";
import fs from 'node:fs';
const packageInfo = require('../package.json');

export class Module {
  private eventBus: EventEmitter;
  private sourceDirectory: string;

  async onInit(config: {sourceDirectory: string}, eventBus: EventEmitter): Promise<void> {
    this.eventBus = eventBus;
    this.sourceDirectory = config.sourceDirectory;
  }

  async run(): Promise<void> {
    this.eventBus.on('set_url', async (url: string) => {
        const response = await fetch(url);

        let html = await response.text();
        const regTitle = html.match(/<title>.*?<\/title>/);
        const title = regTitle?.[0].replace(/<*.title>/g, '');
        html = html.replace(/code class=".*?"/g, 'code class="language-typescript"');
        const xxhtml = await this.replaceAsync(html, / src=".*?"/gi, this.imageUrlToBase64);
        const content = NodeHtmlMarkdown.translate(xxhtml, {keepDataImages: true});
        if (fs.existsSync(this.sourceDirectory)){
            fs.writeFileSync(`${this.sourceDirectory}/${title}.md`, content);
            this.eventBus.emit('writeFileComplete');
          }
     });
  }

  async info(): Promise<{name: string, version: string}> {
    return Promise.resolve({name: packageInfo.name, version: packageInfo.version}); 
  }

  async onDestroy(): Promise<void>  {}


  async  replaceAsync(str: string, regex: string | RegExp, asyncFn: (url: string) => Promise<string>): Promise<string> {
    const promises: Promise<string>[] = [];
    str.replace(regex,  (full, ...args) => {
        //@ts-ignore
        promises.push(asyncFn(full, ...args));
        return full;
    });
    const data = await Promise.all(promises) ?? [];
    //@ts-ignore
    return str.replace(regex, () => data.shift());
}

public async imageUrlToBase64(url: string): Promise<string> {
    try {

        url = url.replace(/ src="/, '').replace(/"/, '');
        if(!url.startsWith('http')){
            return Promise.resolve('');
        }

      const response = await fetch(url);
      
  
      const blob = await response.arrayBuffer();
      
      const contentType = response.headers.get('content-type');
  


      const buffer = Buffer.from(blob);

      const b64String = buffer.toString('base64');

      const base64String = `data:${contentType};base64,${b64String}`;
  
      return Promise.resolve(` src="${base64String}"`);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}