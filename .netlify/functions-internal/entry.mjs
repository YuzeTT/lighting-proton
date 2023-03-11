import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { r as renderToString, s as ssr, c as createComponent, _ as _page0 } from './chunks/pages/all.634e0a21.mjs';
import { s as server_default$1, g as deserializeManifest } from './chunks/astro.e530b412.mjs';
/* empty css                                 */import '@iconify-icons/fluent-emoji-flat/crab.js';
import '@iconify-icons/fluent-emoji-flat/eight-spoked-asterisk.js';
import '@iconify-icons/fluent-emoji-flat/newspaper.js';
import '@iconify-icons/fluent-emoji-flat/antenna-bars.js';
import '@iconify-icons/fluent-emoji-flat/rolled-up-newspaper.js';
import '@iconify-icons/fluent-emoji-flat/ice.js';
import '@iconify-icons/fluent-emoji-flat/shopping-cart.js';

const contexts = /* @__PURE__ */ new WeakMap();
function getContext(result) {
  if (contexts.has(result)) {
    return contexts.get(result);
  }
  let ctx = {
    c: 0,
    get id() {
      return "s" + this.c.toString();
    }
  };
  contexts.set(result, ctx);
  return ctx;
}
function incrementId(ctx) {
  let id = ctx.id;
  ctx.c++;
  return id;
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
function check(Component, props, children) {
  if (typeof Component !== "function")
    return false;
  const { html } = renderToStaticMarkup.call(this, Component, props, children);
  return typeof html === "string";
}
function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
  const renderId = (metadata == null ? void 0 : metadata.hydrate) ? incrementId(getContext(this.result)) : "";
  const html = renderToString(
    () => {
      const slots = {};
      for (const [key, value] of Object.entries(slotted)) {
        const name = slotName(key);
        slots[name] = ssr(`<astro-slot name="${name}">${value}</astro-slot>`);
      }
      const newProps = {
        ...props,
        ...slots,
        children: children != null ? ssr(`<astro-slot>${children}</astro-slot>`) : children
      };
      return createComponent(Component, newProps);
    },
    {
      renderId
    }
  );
  return {
    attrs: {
      "data-solid-render-id": renderId
    },
    html
  };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const pageMap = new Map([["src/pages/index.astro", _page0],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default$1 }),Object.assign({"name":"@astrojs/solid-js","clientEntrypoint":"@astrojs/solid-js/client.js","serverEntrypoint":"@astrojs/solid-js/server.js","jsxImportSource":"solid-js"}, { ssr: server_default }),];

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":["_astro/index.86f00d63.css"],"scripts":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"gfm":true,"smartypants":true},"pageMap":null,"propagation":[],"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"_@astrojs-ssr-virtual-entry.mjs","@astrojs/solid-js/client.js":"_astro/client.c035df47.js","D:/work/astro/lighting-proton/src/components/Projects":"_astro/Projects.7442568e.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/index.86f00d63.css","/favicon.svg","/head.svg","/robots.txt","/_redirects","/_astro/client.c035df47.js","/_astro/Projects.7442568e.js","/_astro/web.b81bbeeb.js"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};
const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap, renderers };
