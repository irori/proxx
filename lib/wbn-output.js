// A rollup plugin which generates web bundle output.

import * as mime from 'mime';
import { BundleBuilder } from 'wbn';

export default function wbnOutputPlugin(baseURL, wbnFileName) {
  if (!baseURL.endsWith('/')) {
    throw new Error("baseURL must end with '/'.");
  }
  return {
    name: "wbn-output-plugin",

    async generateBundle(options, bundle) {
      const builder = new BundleBuilder(baseURL);

      for (let name of Object.keys(bundle)) {
        const asset = bundle[name];
        const content = asset.isAsset ? asset.source : asset.code;
        const headers = {
          'Content-Type': mime.getType(asset.fileName) || 'application/octet-stream',
          'Access-Control-Allow-Origin': '*'
        };
        // 'dir/index.html' is stored as 'dir/' in WBN.
        const url = new URL(asset.fileName, baseURL).toString().replace(/\/index.html$/, '/');
        builder.addExchange(url, 200, headers, content)
        // Do not emit a file for the original resource.
        delete bundle[name]
      }

      // this.emitAsset(wbnFileName, builder.createBundle());
      bundle[wbnFileName] = {
        fileName: wbnFileName,
        isAsset: true,
        source: builder.createBundle()
      };
    }
  };
}
