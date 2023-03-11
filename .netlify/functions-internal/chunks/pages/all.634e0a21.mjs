/* empty css                           */import { _ as __astro_tag_component__, c as createAstro, a as createComponent$1, r as renderTemplate, m as maybeRenderHead, b as renderComponent, d as addAttribute, e as renderHead, f as renderSlot } from '../astro.e530b412.mjs';
import Crab from '@iconify-icons/fluent-emoji-flat/crab.js';
import EightSpokedAsterisk from '@iconify-icons/fluent-emoji-flat/eight-spoked-asterisk.js';
import Newspaper from '@iconify-icons/fluent-emoji-flat/newspaper.js';
import '@iconify-icons/fluent-emoji-flat/antenna-bars.js';
import RolledUpNewspaper from '@iconify-icons/fluent-emoji-flat/rolled-up-newspaper.js';
import Ice from '@iconify-icons/fluent-emoji-flat/ice.js';
import ShoppingCart from '@iconify-icons/fluent-emoji-flat/shopping-cart.js';

const sharedConfig = {};
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return sharedConfig.context ? {
    ...sharedConfig.context,
    id: `${sharedConfig.context.id}${sharedConfig.context.count++}-`,
    count: 0
  } : undefined;
}
function createComponent(Comp, props) {
  if (sharedConfig.context && !sharedConfig.context.noHydrate) {
    const c = sharedConfig.context;
    setHydrateContext(nextHydrateContext());
    const r = Comp(props || {});
    setHydrateContext(c);
    return r;
  }
  return Comp(props || {});
}
function mergeProps(...sources) {
  const target = {};
  for (let i = 0; i < sources.length; i++) {
    let source = sources[i];
    if (typeof source === "function") source = source();
    if (source) {
      const descriptors = Object.getOwnPropertyDescriptors(source);
      for (const key in descriptors) {
        if (key in target) continue;
        Object.defineProperty(target, key, {
          enumerable: true,
          get() {
            for (let i = sources.length - 1; i >= 0; i--) {
              let s = sources[i] || {};
              if (typeof s === "function") s = s();
              const v = s[key];
              if (v !== undefined) return v;
            }
          }
        });
      }
    }
  }
  return target;
}
function simpleMap(props, wrap) {
  const list = props.each || [],
    len = list.length,
    fn = props.children;
  if (len) {
    let mapped = Array(len);
    for (let i = 0; i < len; i++) mapped[i] = wrap(fn, list[i], i);
    return mapped;
  }
  return props.fallback;
}
function For(props) {
  return simpleMap(props, (fn, item, i) => fn(item, () => i));
}

const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
const BooleanAttributes = /*#__PURE__*/new Set(booleans);
const ChildProperties = /*#__PURE__*/new Set(["innerHTML", "textContent", "innerText", "children"]);
const Aliases = /*#__PURE__*/Object.assign(Object.create(null), {
  className: "class",
  htmlFor: "for"
});

const {
  hasOwnProperty
} = Object.prototype;
const REF_START_CHARS = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_";
const REF_START_CHARS_LEN = REF_START_CHARS.length;
const REF_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_";
const REF_CHARS_LEN = REF_CHARS.length;
const STACK = [];
const BUFFER = [""];
let ASSIGNMENTS = new Map();
let INDEX_OR_REF = new WeakMap();
let REF_COUNT = 0;
BUFFER.pop();
function stringify(root) {
  if (writeProp(root, "")) {
    let result = BUFFER[0];
    for (let i = 1, len = BUFFER.length; i < len; i++) {
      result += BUFFER[i];
    }
    if (REF_COUNT) {
      if (ASSIGNMENTS.size) {
        let ref = INDEX_OR_REF.get(root);
        if (typeof ref === "number") {
          ref = toRefParam(REF_COUNT++);
          result = ref + "=" + result;
        }
        for (const [assignmentRef, assignments] of ASSIGNMENTS) {
          result += ";" + assignments + assignmentRef;
        }
        result += ";return " + ref;
        ASSIGNMENTS = new Map();
      } else {
        result = "return " + result;
      }
      result = "(function(" + refParamsString() + "){" + result + "}())";
    } else if (root && root.constructor === Object) {
      result = "(" + result + ")";
    }
    BUFFER.length = 0;
    INDEX_OR_REF = new WeakMap();
    return result;
  }
  return "void 0";
}
function writeProp(cur, accessor) {
  switch (typeof cur) {
    case "string":
      BUFFER.push(quote(cur, 0));
      break;
    case "number":
      BUFFER.push(cur + "");
      break;
    case "boolean":
      BUFFER.push(cur ? "!0" : "!1");
      break;
    case "object":
      if (cur === null) {
        BUFFER.push("null");
      } else {
        const ref = getRef(cur, accessor);
        switch (ref) {
          case true:
            return false;
          case false:
            switch (cur.constructor) {
              case Object:
                writeObject(cur);
                break;
              case Array:
                writeArray(cur);
                break;
              case Date:
                BUFFER.push('new Date("' + cur.toISOString() + '")');
                break;
              case RegExp:
                BUFFER.push(cur + "");
                break;
              case Map:
                BUFFER.push("new Map(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case Set:
                BUFFER.push("new Set(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case undefined:
                BUFFER.push("Object.assign(Object.create(null),");
                writeObject(cur);
                BUFFER.push(")");
                break;
              default:
                return false;
            }
            break;
          default:
            BUFFER.push(ref);
            break;
        }
      }
      break;
    default:
      return false;
  }
  return true;
}
function writeObject(obj) {
  let sep = "{";
  STACK.push(obj);
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      const escapedKey = toObjectKey(key);
      BUFFER.push(sep + escapedKey + ":");
      if (writeProp(val, escapedKey)) {
        sep = ",";
      } else {
        BUFFER.pop();
      }
    }
  }
  if (sep === "{") {
    BUFFER.push("{}");
  } else {
    BUFFER.push("}");
  }
  STACK.pop();
}
function writeArray(arr) {
  BUFFER.push("[");
  STACK.push(arr);
  writeProp(arr[0], 0);
  for (let i = 1, len = arr.length; i < len; i++) {
    BUFFER.push(",");
    writeProp(arr[i], i);
  }
  STACK.pop();
  BUFFER.push("]");
}
function getRef(cur, accessor) {
  let ref = INDEX_OR_REF.get(cur);
  if (ref === undefined) {
    INDEX_OR_REF.set(cur, BUFFER.length);
    return false;
  }
  if (typeof ref === "number") {
    ref = insertAndGetRef(cur, ref);
  }
  if (STACK.includes(cur)) {
    const parent = STACK[STACK.length - 1];
    let parentRef = INDEX_OR_REF.get(parent);
    if (typeof parentRef === "number") {
      parentRef = insertAndGetRef(parent, parentRef);
    }
    ASSIGNMENTS.set(ref, (ASSIGNMENTS.get(ref) || "") + toAssignment(parentRef, accessor) + "=");
    return true;
  }
  return ref;
}
function toObjectKey(name) {
  const invalidIdentifierPos = getInvalidIdentifierPos(name);
  return invalidIdentifierPos === -1 ? name : quote(name, invalidIdentifierPos);
}
function toAssignment(parent, key) {
  return parent + (typeof key === "number" || key[0] === '"' ? "[" + key + "]" : "." + key);
}
function getInvalidIdentifierPos(name) {
  let char = name[0];
  if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char === "$" || char === "_")) {
    return 0;
  }
  for (let i = 1, len = name.length; i < len; i++) {
    char = name[i];
    if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char >= "0" && char <= "9" || char === "$" || char === "_")) {
      return i;
    }
  }
  return -1;
}
function quote(str, startPos) {
  let result = "";
  let lastPos = 0;
  for (let i = startPos, len = str.length; i < len; i++) {
    let replacement;
    switch (str[i]) {
      case '"':
        replacement = '\\"';
        break;
      case "\\":
        replacement = "\\\\";
        break;
      case "<":
        replacement = "\\x3C";
        break;
      case "\n":
        replacement = "\\n";
        break;
      case "\r":
        replacement = "\\r";
        break;
      case "\u2028":
        replacement = "\\u2028";
        break;
      case "\u2029":
        replacement = "\\u2029";
        break;
      default:
        continue;
    }
    result += str.slice(lastPos, i) + replacement;
    lastPos = i + 1;
  }
  if (lastPos === startPos) {
    result = str;
  } else {
    result += str.slice(lastPos);
  }
  return '"' + result + '"';
}
function insertAndGetRef(obj, pos) {
  const ref = toRefParam(REF_COUNT++);
  INDEX_OR_REF.set(obj, ref);
  if (pos) {
    BUFFER[pos - 1] += ref + "=";
  } else {
    BUFFER[pos] = ref + "=" + BUFFER[pos];
  }
  return ref;
}
function refParamsString() {
  let result = REF_START_CHARS[0];
  for (let i = 1; i < REF_COUNT; i++) {
    result += "," + toRefParam(i);
  }
  REF_COUNT = 0;
  return result;
}
function toRefParam(index) {
  let mod = index % REF_START_CHARS_LEN;
  let ref = REF_START_CHARS[mod];
  index = (index - mod) / REF_START_CHARS_LEN;
  while (index > 0) {
    mod = index % REF_CHARS_LEN;
    ref += REF_CHARS[mod];
    index = (index - mod) / REF_CHARS_LEN;
  }
  return ref;
}

const VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
function renderToString(code, options = {}) {
  let scripts = "";
  sharedConfig.context = {
    id: options.renderId || "",
    count: 0,
    suspense: {},
    lazy: {},
    assets: [],
    nonce: options.nonce,
    writeResource(id, p, error) {
      if (sharedConfig.context.noHydrate) return;
      if (error) return scripts += `_$HY.set("${id}", ${serializeError(p)});`;
      scripts += `_$HY.set("${id}", ${stringify(p)});`;
    }
  };
  let html = resolveSSRNode(escape(code()));
  sharedConfig.context.noHydrate = true;
  html = injectAssets(sharedConfig.context.assets, html);
  if (scripts.length) html = injectScripts(html, scripts, options.nonce);
  return html;
}
function ssr(t, ...nodes) {
  if (nodes.length) {
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
      result += t[i];
      const node = nodes[i];
      if (node !== undefined) result += resolveSSRNode(node);
    }
    t = result + t[nodes.length];
  }
  return {
    t
  };
}
function ssrClassList(value) {
  if (!value) return "";
  let classKeys = Object.keys(value),
    result = "";
  for (let i = 0, len = classKeys.length; i < len; i++) {
    const key = classKeys[i],
      classValue = !!value[key];
    if (!key || key === "undefined" || !classValue) continue;
    i && (result += " ");
    result += key;
  }
  return result;
}
function ssrStyle(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  let result = "";
  const k = Object.keys(value);
  for (let i = 0; i < k.length; i++) {
    const s = k[i];
    const v = value[s];
    if (v != undefined) {
      if (i) result += ";";
      result += `${s}:${escape(v, true)}`;
    }
  }
  return result;
}
function ssrElement(tag, props, children, needsId) {
  let result = `<${tag}${needsId ? ssrHydrationKey() : ""} `;
  const skipChildren = VOID_ELEMENTS.test(tag);
  if (props == null) props = {};else if (typeof props === "function") props = props();
  const keys = Object.keys(props);
  let classResolved;
  for (let i = 0; i < keys.length; i++) {
    const prop = keys[i];
    if (ChildProperties.has(prop)) {
      if (children === undefined && !skipChildren) children = prop === "innerHTML" ? props[prop] : escape(props[prop]);
      continue;
    }
    const value = props[prop];
    if (prop === "style") {
      result += `style="${ssrStyle(value)}"`;
    } else if (prop === "class" || prop === "className" || prop === "classList") {
      if (classResolved) continue;
      let n;
      result += `class="${(n = props.class) ? n + " " : ""}${(n = props.className) ? n + " " : ""}${ssrClassList(props.classList)}"`;
      classResolved = true;
    } else if (BooleanAttributes.has(prop)) {
      if (value) result += prop;else continue;
    } else if (value == undefined || prop === "ref" || prop.slice(0, 2) === "on") {
      continue;
    } else {
      result += `${Aliases[prop] || prop}="${escape(value, true)}"`;
    }
    if (i !== keys.length - 1) result += " ";
  }
  if (skipChildren) {
    return {
      t: result + '/>'
    };
  }
  return {
    t: result + `>${resolveSSRNode(children)}</${tag}>`
  };
}
function ssrAttribute(key, value, isBoolean) {
  return isBoolean ? value ? " " + key : "" : value != null ? ` ${key}="${value}"` : "";
}
function ssrHydrationKey() {
  const hk = getHydrationKey();
  return hk ? ` data-hk="${hk}"` : "";
}
function escape(s, attr) {
  const t = typeof s;
  if (t !== "string") {
    if (!attr && t === "function") return escape(s(), attr);
    if (!attr && Array.isArray(s)) {
      let r = "";
      for (let i = 0; i < s.length; i++) r += resolveSSRNode(escape(s[i], attr));
      return {
        t: r
      };
    }
    if (attr && t === "boolean") return String(s);
    return s;
  }
  const delim = attr ? '"' : "<";
  const escDelim = attr ? "&quot;" : "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");
  if (iDelim < 0 && iAmp < 0) return s;
  let left = 0,
    out = "";
  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }
  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else while (iAmp >= 0) {
    if (left < iAmp) out += s.substring(left, iAmp);
    out += "&amp;";
    left = iAmp + 1;
    iAmp = s.indexOf("&", left);
  }
  return left < s.length ? out + s.substring(left) : out;
}
function resolveSSRNode(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode(node[i]);
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode(node());
  return String(node);
}
function getHydrationKey() {
  const hydrate = sharedConfig.context;
  return hydrate && !hydrate.noHydrate && `${hydrate.id}${hydrate.count++}`;
}
function injectAssets(assets, html) {
  if (!assets || !assets.length) return html;
  let out = "";
  for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
  return html.replace(`</head>`, out + `</head>`);
}
function injectScripts(html, scripts, nonce) {
  const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}</script>`;
  const index = html.indexOf("<!--xs-->");
  if (index > -1) {
    return html.slice(0, index) + tag + html.slice(index);
  }
  return html + tag;
}
function serializeError(error) {
  if (error.message) {
    const fields = {};
    const keys = Object.getOwnPropertyNames(error);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = error[key];
      if (!value || key !== "message" && typeof value !== "function") {
        fields[key] = value;
      }
    }
    return `Object.assign(new Error(${stringify(error.message)}), ${stringify(fields)})`;
  }
  return stringify(error);
}

const _tmpl$$1 = ["<a", " target=\"_blank\" class=\"relative after:absolute after:-left-1 after:-right-1 after:-z-10 after:top-2/3 after:bottom-0 after:bg-orange-200 after:transition-all hover:after:top-0 mx-1\">", "</a>"];
function Link(props) {
  return ssr(_tmpl$$1, ssrHydrationKey() + ssrAttribute("href", escape(props.href, true), false), escape(props.name));
}

__astro_tag_component__(Link, "@astrojs/solid-js");

const $$Astro$3 = createAstro();
const $$Footer = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead($$result)}<div class="px-4 my-4 text-zinc-500 text-sm">
  <span>© 2023 </span>
  ${renderComponent($$result, "Link", Link, { "href": "https://hsott.cn", "name": "YuzeTT" })}
</div>`;
}, "D:/work/astro/lighting-proton/src/components/Footer.astro");

const $$Astro$2 = createAstro();
const $$Layout = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width">
		<link rel="icon" type="image/svg+xml" href="/favicon.svg">
		<meta property="og:title"${addAttribute(title, "content")}>
		<meta name="author" content="YuzeTT">
		<meta name="description" content="YuzeTT, Front-end developer / Amateur designer.">
		<meta property="og:description" content="YuzeTT, Front-end developer / Amateur designer.">
		<meta name="generator"${addAttribute(Astro2.generator, "content")}>
		<title>${title}</title>
	${renderHead($$result)}</head>
	<body class="max-w-2xl my-10 mx-auto text-zinc-800">
		${renderSlot($$result, $$slots["default"])}
		${renderComponent($$result, "Footer", $$Footer, {})}
	</body></html>`;
}, "D:/work/astro/lighting-proton/src/layouts/Layout.astro");

const $$Astro$1 = createAstro();
const $$Logo = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Logo;
  return renderTemplate`${maybeRenderHead($$result)}<svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.9989 29.9978C25.3333 29.9978 29.9978 23.7303 29.9978 15.9989C29.9978 8.26751 25.3333 2 15.9989 2C6.66443 2 2 8.26751 2 15.9989C2 23.7303 6.66443 29.9978 15.9989 29.9978Z" fill="url(#paint0_radial_6806_5229)"></path>
  <path d="M15.9989 29.9978C25.3333 29.9978 29.9978 23.7303 29.9978 15.9989C29.9978 8.26751 25.3333 2 15.9989 2C6.66443 2 2 8.26751 2 15.9989C2 23.7303 6.66443 29.9978 15.9989 29.9978Z" fill="url(#paint1_radial_6806_5229)"></path>
  <path d="M15.9989 29.9978C25.3333 29.9978 29.9978 23.7303 29.9978 15.9989C29.9978 8.26751 25.3333 2 15.9989 2C6.66443 2 2 8.26751 2 15.9989C2 23.7303 6.66443 29.9978 15.9989 29.9978Z" fill="url(#paint2_radial_6806_5229)"></path>
  <path d="M15.9989 29.9978C25.3333 29.9978 29.9978 23.7303 29.9978 15.9989C29.9978 8.26751 25.3333 2 15.9989 2C6.66443 2 2 8.26751 2 15.9989C2 23.7303 6.66443 29.9978 15.9989 29.9978Z" fill="url(#paint3_radial_6806_5229)" fill-opacity="0.6"></path>
  <path d="M15.9989 29.9978C25.3333 29.9978 29.9978 23.7303 29.9978 15.9989C29.9978 8.26751 25.3333 2 15.9989 2C6.66443 2 2 8.26751 2 15.9989C2 23.7303 6.66443 29.9978 15.9989 29.9978Z" fill="url(#paint4_radial_6806_5229)"></path>
  <path d="M15.9989 29.9978C25.3333 29.9978 29.9978 23.7303 29.9978 15.9989C29.9978 8.26751 25.3333 2 15.9989 2C6.66443 2 2 8.26751 2 15.9989C2 23.7303 6.66443 29.9978 15.9989 29.9978Z" fill="url(#paint5_radial_6806_5229)"></path>
  <path d="M15.9989 29.9978C25.3333 29.9978 29.9978 23.7303 29.9978 15.9989C29.9978 8.26751 25.3333 2 15.9989 2C6.66443 2 2 8.26751 2 15.9989C2 23.7303 6.66443 29.9978 15.9989 29.9978Z" fill="url(#paint6_radial_6806_5229)"></path>
  <path d="M15.9989 29.9978C25.3333 29.9978 29.9978 23.7303 29.9978 15.9989C29.9978 8.26751 25.3333 2 15.9989 2C6.66443 2 2 8.26751 2 15.9989C2 23.7303 6.66443 29.9978 15.9989 29.9978Z" fill="url(#paint7_radial_6806_5229)"></path>
  <path d="M15.9989 29.9978C25.3333 29.9978 29.9978 23.7303 29.9978 15.9989C29.9978 8.26751 25.3333 2 15.9989 2C6.66443 2 2 8.26751 2 15.9989C2 23.7303 6.66443 29.9978 15.9989 29.9978Z" fill="url(#paint8_radial_6806_5229)"></path>
  <circle cx="25.9978" cy="14.7604" r="4" fill="url(#paint9_radial_6806_5229)"></circle>
  <circle cx="6" cy="14.7604" r="4" fill="url(#paint10_radial_6806_5229)"></circle>
  <path d="M10 15C10.4286 15.8 12.1429 18 16 18C19.8571 18 21.5714 15.8 22 15" stroke="url(#paint11_radial_6806_5229)" stroke-width="2" stroke-linecap="round"></path>
  <g filter="url(#filter0_f_6806_5229)">
  <path d="M18.9375 10.6562C18.9375 10.6562 19.5546 9.13443 21.125 9.40623C23.1602 9.75848 23.3125 11.75 23.3125 11.75" stroke="url(#paint12_radial_6806_5229)" stroke-width="2" stroke-linecap="round"></path>
  </g>
  <g filter="url(#filter1_f_6806_5229)">
  <path d="M8.3125 10.6562C8.3125 10.6562 8.9296 9.13443 10.5 9.40623C12.5352 9.75848 12.6875 11.75 12.6875 11.75" stroke="url(#paint13_radial_6806_5229)" stroke-width="2" stroke-linecap="round"></path>
  </g>
  <path d="M8 11C8 11 8.25 9 10.5 9C12.75 9 13 11 13 11" stroke="url(#paint14_radial_6806_5229)" stroke-width="2" stroke-linecap="round"></path>
  <path d="M19 11C19 11 19.5 9 21.5 9C23.5 9 24 11 24 11" stroke="url(#paint15_radial_6806_5229)" stroke-width="2" stroke-linecap="round"></path>
  <g filter="url(#filter2_i_6806_5229)">
  <path d="M4.09292 19.3621C4.49215 18.8863 5.2015 18.8242 5.67729 19.2235L8.64927 21.7172L8.39873 20.8202C8.22488 20.1977 8.58856 19.5522 9.21102 19.3783C9.83685 19.2035 10.4852 19.5721 10.6552 20.1992L11.3437 22.739L12.1801 24.7511C12.1955 24.7881 12.2091 24.8256 12.2209 24.8635C12.5188 25.4384 12.6875 26.094 12.6875 26.7898C12.6875 29.0658 10.8824 30.9109 8.65567 30.9109C7.6761 30.9109 6.77813 30.5539 6.07953 29.9601L1.59693 26.6627C1.07122 26.2759 0.965714 25.5328 1.36301 25.0151C1.53601 24.7896 1.77527 24.6449 2.0325 24.5875L1.60653 24.23C1.10862 23.8122 1.04367 23.0699 1.46147 22.572C1.63898 22.3604 1.87508 22.227 2.12613 22.1756L1.99529 22.0658C1.49738 21.6481 1.43244 20.9057 1.85023 20.4078C2.26803 19.9099 3.01036 19.845 3.50827 20.2628L3.99364 20.67C3.74954 20.2693 3.77459 19.7414 4.09292 19.3621Z" fill="url(#paint16_radial_6806_5229)"></path>
  <path d="M4.09292 19.3621C4.49215 18.8863 5.2015 18.8242 5.67729 19.2235L8.64927 21.7172L8.39873 20.8202C8.22488 20.1977 8.58856 19.5522 9.21102 19.3783C9.83685 19.2035 10.4852 19.5721 10.6552 20.1992L11.3437 22.739L12.1801 24.7511C12.1955 24.7881 12.2091 24.8256 12.2209 24.8635C12.5188 25.4384 12.6875 26.094 12.6875 26.7898C12.6875 29.0658 10.8824 30.9109 8.65567 30.9109C7.6761 30.9109 6.77813 30.5539 6.07953 29.9601L1.59693 26.6627C1.07122 26.2759 0.965714 25.5328 1.36301 25.0151C1.53601 24.7896 1.77527 24.6449 2.0325 24.5875L1.60653 24.23C1.10862 23.8122 1.04367 23.0699 1.46147 22.572C1.63898 22.3604 1.87508 22.227 2.12613 22.1756L1.99529 22.0658C1.49738 21.6481 1.43244 20.9057 1.85023 20.4078C2.26803 19.9099 3.01036 19.845 3.50827 20.2628L3.99364 20.67C3.74954 20.2693 3.77459 19.7414 4.09292 19.3621Z" fill="url(#paint17_linear_6806_5229)"></path>
  <path d="M4.09292 19.3621C4.49215 18.8863 5.2015 18.8242 5.67729 19.2235L8.64927 21.7172L8.39873 20.8202C8.22488 20.1977 8.58856 19.5522 9.21102 19.3783C9.83685 19.2035 10.4852 19.5721 10.6552 20.1992L11.3437 22.739L12.1801 24.7511C12.1955 24.7881 12.2091 24.8256 12.2209 24.8635C12.5188 25.4384 12.6875 26.094 12.6875 26.7898C12.6875 29.0658 10.8824 30.9109 8.65567 30.9109C7.6761 30.9109 6.77813 30.5539 6.07953 29.9601L1.59693 26.6627C1.07122 26.2759 0.965714 25.5328 1.36301 25.0151C1.53601 24.7896 1.77527 24.6449 2.0325 24.5875L1.60653 24.23C1.10862 23.8122 1.04367 23.0699 1.46147 22.572C1.63898 22.3604 1.87508 22.227 2.12613 22.1756L1.99529 22.0658C1.49738 21.6481 1.43244 20.9057 1.85023 20.4078C2.26803 19.9099 3.01036 19.845 3.50827 20.2628L3.99364 20.67C3.74954 20.2693 3.77459 19.7414 4.09292 19.3621Z" fill="url(#paint18_linear_6806_5229)"></path>
  <path d="M4.09292 19.3621C4.49215 18.8863 5.2015 18.8242 5.67729 19.2235L8.64927 21.7172L8.39873 20.8202C8.22488 20.1977 8.58856 19.5522 9.21102 19.3783C9.83685 19.2035 10.4852 19.5721 10.6552 20.1992L11.3437 22.739L12.1801 24.7511C12.1955 24.7881 12.2091 24.8256 12.2209 24.8635C12.5188 25.4384 12.6875 26.094 12.6875 26.7898C12.6875 29.0658 10.8824 30.9109 8.65567 30.9109C7.6761 30.9109 6.77813 30.5539 6.07953 29.9601L1.59693 26.6627C1.07122 26.2759 0.965714 25.5328 1.36301 25.0151C1.53601 24.7896 1.77527 24.6449 2.0325 24.5875L1.60653 24.23C1.10862 23.8122 1.04367 23.0699 1.46147 22.572C1.63898 22.3604 1.87508 22.227 2.12613 22.1756L1.99529 22.0658C1.49738 21.6481 1.43244 20.9057 1.85023 20.4078C2.26803 19.9099 3.01036 19.845 3.50827 20.2628L3.99364 20.67C3.74954 20.2693 3.77459 19.7414 4.09292 19.3621Z" fill="url(#paint19_radial_6806_5229)"></path>
  </g>
  <path d="M3.02235 24.7635C2.50448 24.3889 1.78258 24.4944 1.3935 25.0015V25.0015C0.990583 25.5266 1.09787 26.2802 1.63132 26.672L2.16689 27.0654C2.8554 27.5711 3.80206 27.5336 4.44847 26.9751L5.19195 26.3328L3.02235 24.7635Z" fill="url(#paint20_linear_6806_5229)"></path>
  <path d="M6.15625 25.1719C5.9375 25.2969 5.17751 25.5854 5 25.7969C4.5822 26.2948 4.34936 26.4359 3.85145 26.0181L1.72048 24.23C1.22257 23.8122 1.15762 23.0699 1.57542 22.572V22.572C2.00288 22.0626 2.56459 22.0556 3.06689 22.4914L6.15625 25.1719Z" fill="url(#paint21_linear_6806_5229)"></path>
  <path d="M7.375 23.7813C7.00002 23.9844 6.75 24.2188 6.35938 24.5469C5.94158 25.0448 5.68537 25.2648 5.18746 24.847L2.01547 22.0658C1.51756 21.648 1.45261 20.9057 1.87041 20.4078C2.2882 19.9099 3.03053 19.8449 3.52844 20.2627L4.01382 20.67C4.07586 20.7719 4.15529 20.8655 4.25171 20.9464L7.375 23.7813Z" fill="url(#paint22_linear_6806_5229)"></path>
  <path d="M5.64189 19.1766C5.19677 18.8032 4.53325 18.8613 4.15979 19.3064V19.3064C3.75179 19.7926 3.86402 20.5267 4.39868 20.8688L9.21875 23.9531L8.6686 21.7156L5.64189 19.1766Z" fill="url(#paint23_radial_6806_5229)"></path>
  <g filter="url(#filter3_f_6806_5229)">
  <path d="M5.19214 19.871L8.25464 22.5272" stroke="url(#paint24_linear_6806_5229)" stroke-linecap="round"></path>
  </g>
  <g filter="url(#filter4_f_6806_5229)">
  <path d="M2.95386 20.871L6.01636 23.5272" stroke="url(#paint25_linear_6806_5229)" stroke-linecap="round"></path>
  </g>
  <g filter="url(#filter5_f_6806_5229)">
  <path d="M2.43823 22.9022L5.50073 25.5585" stroke="url(#paint26_linear_6806_5229)" stroke-linecap="round"></path>
  </g>
  <g filter="url(#filter6_f_6806_5229)">
  <path d="M2.43823 25.2501L4.71883 26.9219" stroke="url(#paint27_linear_6806_5229)" stroke-linecap="round"></path>
  </g>
  <g filter="url(#filter7_i_6806_5229)">
  <path d="M27.9227 19.373C27.5235 18.8972 26.8141 18.8352 26.3383 19.2344L23.3664 21.7282L23.6169 20.8311C23.7907 20.2086 23.4271 19.5631 22.8046 19.3892C22.1788 19.2145 21.5304 19.583 21.3604 20.2101L20.6719 22.75L19.8355 24.7621C19.8202 24.7991 19.8066 24.8366 19.7948 24.8745C19.4969 25.4493 19.3281 26.1049 19.3281 26.8008C19.3281 29.0768 21.1332 30.9218 23.36 30.9218C24.3395 30.9218 25.2375 30.5648 25.9361 29.971L30.4187 26.6736C30.9444 26.2869 31.0499 25.5438 30.6526 25.026C30.4796 24.8005 30.2404 24.6559 29.9831 24.5984L30.4091 24.2409C30.907 23.8231 30.972 23.0808 30.5542 22.5829C30.3766 22.3714 30.1405 22.238 29.8895 22.1866L30.0203 22.0768C30.5182 21.659 30.5832 20.9166 30.1654 20.4187C29.7476 19.9208 29.0053 19.8559 28.5074 20.2737L28.022 20.681C28.2661 20.2802 28.241 19.7524 27.9227 19.373Z" fill="url(#paint28_radial_6806_5229)"></path>
  <path d="M27.9227 19.373C27.5235 18.8972 26.8141 18.8352 26.3383 19.2344L23.3664 21.7282L23.6169 20.8311C23.7907 20.2086 23.4271 19.5631 22.8046 19.3892C22.1788 19.2145 21.5304 19.583 21.3604 20.2101L20.6719 22.75L19.8355 24.7621C19.8202 24.7991 19.8066 24.8366 19.7948 24.8745C19.4969 25.4493 19.3281 26.1049 19.3281 26.8008C19.3281 29.0768 21.1332 30.9218 23.36 30.9218C24.3395 30.9218 25.2375 30.5648 25.9361 29.971L30.4187 26.6736C30.9444 26.2869 31.0499 25.5438 30.6526 25.026C30.4796 24.8005 30.2404 24.6559 29.9831 24.5984L30.4091 24.2409C30.907 23.8231 30.972 23.0808 30.5542 22.5829C30.3766 22.3714 30.1405 22.238 29.8895 22.1866L30.0203 22.0768C30.5182 21.659 30.5832 20.9166 30.1654 20.4187C29.7476 19.9208 29.0053 19.8559 28.5074 20.2737L28.022 20.681C28.2661 20.2802 28.241 19.7524 27.9227 19.373Z" fill="url(#paint29_linear_6806_5229)"></path>
  <path d="M27.9227 19.373C27.5235 18.8972 26.8141 18.8352 26.3383 19.2344L23.3664 21.7282L23.6169 20.8311C23.7907 20.2086 23.4271 19.5631 22.8046 19.3892C22.1788 19.2145 21.5304 19.583 21.3604 20.2101L20.6719 22.75L19.8355 24.7621C19.8202 24.7991 19.8066 24.8366 19.7948 24.8745C19.4969 25.4493 19.3281 26.1049 19.3281 26.8008C19.3281 29.0768 21.1332 30.9218 23.36 30.9218C24.3395 30.9218 25.2375 30.5648 25.9361 29.971L30.4187 26.6736C30.9444 26.2869 31.0499 25.5438 30.6526 25.026C30.4796 24.8005 30.2404 24.6559 29.9831 24.5984L30.4091 24.2409C30.907 23.8231 30.972 23.0808 30.5542 22.5829C30.3766 22.3714 30.1405 22.238 29.8895 22.1866L30.0203 22.0768C30.5182 21.659 30.5832 20.9166 30.1654 20.4187C29.7476 19.9208 29.0053 19.8559 28.5074 20.2737L28.022 20.681C28.2661 20.2802 28.241 19.7524 27.9227 19.373Z" fill="url(#paint30_linear_6806_5229)"></path>
  <path d="M27.9227 19.373C27.5235 18.8972 26.8141 18.8352 26.3383 19.2344L23.3664 21.7282L23.6169 20.8311C23.7907 20.2086 23.4271 19.5631 22.8046 19.3892C22.1788 19.2145 21.5304 19.583 21.3604 20.2101L20.6719 22.75L19.8355 24.7621C19.8202 24.7991 19.8066 24.8366 19.7948 24.8745C19.4969 25.4493 19.3281 26.1049 19.3281 26.8008C19.3281 29.0768 21.1332 30.9218 23.36 30.9218C24.3395 30.9218 25.2375 30.5648 25.9361 29.971L30.4187 26.6736C30.9444 26.2869 31.0499 25.5438 30.6526 25.026C30.4796 24.8005 30.2404 24.6559 29.9831 24.5984L30.4091 24.2409C30.907 23.8231 30.972 23.0808 30.5542 22.5829C30.3766 22.3714 30.1405 22.238 29.8895 22.1866L30.0203 22.0768C30.5182 21.659 30.5832 20.9166 30.1654 20.4187C29.7476 19.9208 29.0053 19.8559 28.5074 20.2737L28.022 20.681C28.2661 20.2802 28.241 19.7524 27.9227 19.373Z" fill="url(#paint31_radial_6806_5229)"></path>
  </g>
  <path d="M28.9954 24.762C29.5121 24.3883 30.2323 24.4935 30.6205 24.9994V24.9994C31.0238 25.5249 30.9147 26.2795 30.3791 26.6693L29.7494 27.1275C28.8034 27.8159 27.4678 27.5152 26.9081 26.4878L26.8237 26.3328L28.9954 24.762Z" fill="url(#paint32_linear_6806_5229)"></path>
  <path d="M26.0908 25.0183C25.7678 25.2969 26.0356 25.8066 26.2131 26.0181C26.6309 26.516 27.6662 26.4359 28.1641 26.0181L30.2951 24.23C30.793 23.8122 30.9434 23.0643 30.5256 22.5664V22.5664C30.0771 22.0319 29.4376 22.0712 28.9139 22.5323L26.0908 25.0183Z" fill="url(#paint33_linear_6806_5229)"></path>
  <path d="M25.1701 23.2115C24.6684 23.6408 24.835 24.3026 25.1701 24.7019C25.5879 25.1999 26.3302 25.2648 26.8281 24.847L30.0001 22.0658C30.498 21.648 30.563 20.9057 30.1452 20.4078C29.7274 19.9099 28.9851 19.8449 28.4872 20.2627L28.0018 20.67C27.9397 20.7719 27.8603 20.8655 27.7639 20.9464L25.1701 23.2115Z" fill="url(#paint34_linear_6806_5229)"></path>
  <path d="M26.3097 19.2304C26.7902 18.8273 27.5064 18.89 27.9096 19.3704V19.3704C28.3072 19.8443 28.2525 20.5492 27.7866 20.956L25.6008 22.8645C24.6752 23.6727 23.2368 22.9395 23.347 21.7156V21.7156L26.3097 19.2304Z" fill="url(#paint35_linear_6806_5229)"></path>
  <g filter="url(#filter8_f_6806_5229)">
  <ellipse cx="22.8106" cy="20.2154" rx="0.743807" ry="0.665438" transform="rotate(33.9797 22.8106 20.2154)" fill="url(#paint36_radial_6806_5229)"></ellipse>
  </g>
  <g filter="url(#filter9_f_6806_5229)">
  <ellipse cx="27.2734" cy="19.9709" rx="0.79791" ry="0.766955" transform="rotate(64.9239 27.2734 19.9709)" fill="url(#paint37_radial_6806_5229)"></ellipse>
  </g>
  <g filter="url(#filter10_f_6806_5229)">
  <ellipse cx="29.7091" cy="21.1007" rx="0.79791" ry="0.630904" transform="rotate(64.9239 29.7091 21.1007)" fill="url(#paint38_radial_6806_5229)"></ellipse>
  </g>
  <g filter="url(#filter11_f_6806_5229)">
  <ellipse cx="30.078" cy="23.2726" rx="0.79791" ry="0.630904" transform="rotate(64.9239 30.078 23.2726)" fill="url(#paint39_radial_6806_5229)"></ellipse>
  </g>
  <g filter="url(#filter12_f_6806_5229)">
  <ellipse cx="30.1874" cy="25.6955" rx="0.79791" ry="0.630904" transform="rotate(64.9239 30.1874 25.6955)" fill="url(#paint40_radial_6806_5229)"></ellipse>
  </g>
  <g filter="url(#filter13_f_6806_5229)">
  <path d="M23.0959 23.125C24.8772 23.875 26.3459 25.7188 26.3459 27.5625" stroke="#FFEA6E" stroke-opacity="0.6" stroke-linecap="round"></path>
  </g>
  <defs>
  <filter id="filter0_f_6806_5229" x="17.4373" y="7.87329" width="7.37524" height="5.37671" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_6806_5229"></feGaussianBlur>
  </filter>
  <filter id="filter1_f_6806_5229" x="6.81226" y="7.87329" width="7.37524" height="5.37671" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_6806_5229"></feGaussianBlur>
  </filter>
  <filter id="filter2_i_6806_5229" x="1.12231" y="16.9603" width="13.5652" height="13.9506" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
  <feOffset dx="2" dy="-2"></feOffset>
  <feGaussianBlur stdDeviation="2"></feGaussianBlur>
  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_6806_5229"></feBlend>
  </filter>
  <filter id="filter3_f_6806_5229" x="3.69214" y="18.371" width="6.0625" height="5.65625" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_6806_5229"></feGaussianBlur>
  </filter>
  <filter id="filter4_f_6806_5229" x="1.45386" y="19.371" width="6.0625" height="5.65625" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_6806_5229"></feGaussianBlur>
  </filter>
  <filter id="filter5_f_6806_5229" x="0.938232" y="21.4022" width="6.0625" height="5.65625" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_6806_5229"></feGaussianBlur>
  </filter>
  <filter id="filter6_f_6806_5229" x="0.938232" y="23.75" width="5.28052" height="4.67188" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_6806_5229"></feGaussianBlur>
  </filter>
  <filter id="filter7_i_6806_5229" x="19.3281" y="16.9713" width="13.5652" height="13.9506" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
  <feOffset dx="2" dy="-2"></feOffset>
  <feGaussianBlur stdDeviation="2"></feGaussianBlur>
  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_6806_5229"></feBlend>
  </filter>
  <filter id="filter8_f_6806_5229" x="21.5901" y="19.0245" width="2.44092" height="2.38184" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_6806_5229"></feGaussianBlur>
  </filter>
  <filter id="filter9_f_6806_5229" x="26.0005" y="18.6782" width="2.54565" height="2.58527" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_6806_5229"></feGaussianBlur>
  </filter>
  <filter id="filter10_f_6806_5229" x="28.5449" y="19.8299" width="2.32837" height="2.54156" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_6806_5229"></feGaussianBlur>
  </filter>
  <filter id="filter11_f_6806_5229" x="28.9138" y="22.0018" width="2.32837" height="2.54156" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_6806_5229"></feGaussianBlur>
  </filter>
  <filter id="filter12_f_6806_5229" x="29.0232" y="24.4247" width="2.32837" height="2.54156" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_6806_5229"></feGaussianBlur>
  </filter>
  <filter id="filter13_f_6806_5229" x="21.0957" y="21.1249" width="7.25024" height="8.43762" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
  <feGaussianBlur stdDeviation="0.75" result="effect1_foregroundBlur_6806_5229"></feGaussianBlur>
  </filter>
  <radialGradient id="paint0_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(25.5 9) rotate(132.839) scale(37.5033)">
  <stop stop-color="#FFF478"></stop>
  <stop offset="0.474827" stop-color="#FFB02E"></stop>
  <stop offset="1" stop-color="#F70A8D"></stop>
  </radialGradient>
  <radialGradient id="paint1_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(25.5 9) rotate(131.878) scale(38.9487)">
  <stop stop-color="#FFF478"></stop>
  <stop offset="0.474827" stop-color="#FFB02E"></stop>
  <stop offset="1" stop-color="#F70A8D"></stop>
  </radialGradient>
  <radialGradient id="paint2_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 12.5) rotate(101.31) scale(17.8466 22.8581)">
  <stop offset="0.787821" stop-color="#F59639" stop-opacity="0"></stop>
  <stop offset="0.972509" stop-color="#FF7DCE"></stop>
  </radialGradient>
  <radialGradient id="paint3_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18 14) rotate(135) scale(41.0122)">
  <stop offset="0.314853" stop-opacity="0"></stop>
  <stop offset="1"></stop>
  </radialGradient>
  <radialGradient id="paint4_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 17) rotate(77.692) scale(28.1469)">
  <stop offset="0.507903" stop-color="#7D6133" stop-opacity="0"></stop>
  <stop offset="1" stop-color="#715B32"></stop>
  </radialGradient>
  <radialGradient id="paint5_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.5 16.5) rotate(55.7131) scale(13.3135 9.65032)">
  <stop stop-color="#FFB849"></stop>
  <stop offset="1" stop-color="#FFB847" stop-opacity="0"></stop>
  </radialGradient>
  <radialGradient id="paint6_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20.5 18) rotate(9.86581) scale(11.6726)">
  <stop stop-color="#FFA64B"></stop>
  <stop offset="0.900412" stop-color="#FFAE46" stop-opacity="0"></stop>
  </radialGradient>
  <radialGradient id="paint7_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17.5 15) rotate(43.9708) scale(59.0529)">
  <stop offset="0.185425" stop-opacity="0"></stop>
  <stop offset="1" stop-opacity="0.4"></stop>
  </radialGradient>
  <radialGradient id="paint8_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.25 -4.5625) rotate(96.1759) scale(33.6956)">
  <stop offset="0.640625" stop-color="#F59639" stop-opacity="0"></stop>
  <stop offset="1" stop-color="#F68354"></stop>
  </radialGradient>
  <radialGradient id="paint9_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(25.9978 14.9491) rotate(89.9953) scale(3.92207)">
  <stop stop-color="#FF63C4" stop-opacity="0.5"></stop>
  <stop offset="1" stop-color="#F59639" stop-opacity="0"></stop>
  </radialGradient>
  <radialGradient id="paint10_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6 14.9491) rotate(89.9953) scale(3.92207)">
  <stop stop-color="#E840A8" stop-opacity="0.5"></stop>
  <stop offset="1" stop-color="#F59639" stop-opacity="0"></stop>
  </radialGradient>
  <radialGradient id="paint11_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 12.6) rotate(90) scale(7.2 7.87189)">
  <stop offset="0.517632" stop-color="#4E2553"></stop>
  <stop offset="0.702876" stop-color="#5B4852"></stop>
  <stop offset="1" stop-color="#4E2553"></stop>
  <stop offset="1" stop-color="#4E2553"></stop>
  </radialGradient>
  <radialGradient id="paint12_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22.5 10.0625) rotate(124.912) scale(3.65839 6.56756)">
  <stop stop-color="#CA7A1B"></stop>
  <stop offset="0.633527" stop-color="#CA7A1B" stop-opacity="0"></stop>
  </radialGradient>
  <radialGradient id="paint13_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11.875 10.0625) rotate(124.912) scale(3.65839 6.56756)">
  <stop stop-color="#CA7A1B"></stop>
  <stop offset="0.633527" stop-color="#CA7A1B" stop-opacity="0"></stop>
  </radialGradient>
  <radialGradient id="paint14_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.5 11.1875) rotate(-91.3479) scale(7.97096 9.82764)">
  <stop offset="0.166667" stop-color="#482641"></stop>
  <stop offset="0.276042" stop-color="#503A4A"></stop>
  <stop offset="0.401042" stop-color="#483637"></stop>
  </radialGradient>
  <radialGradient id="paint15_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21.5 11.1875) rotate(-91.3479) scale(7.97096 9.82764)">
  <stop offset="0.166667" stop-color="#482641"></stop>
  <stop offset="0.276042" stop-color="#503A4A"></stop>
  <stop offset="0.401042" stop-color="#483637"></stop>
  </radialGradient>
  <radialGradient id="paint16_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-0.723874 18.3528) rotate(42.3946) scale(27.83 27.7466)">
  <stop offset="0.25" stop-color="#F9AF20"></stop>
  <stop offset="0.640625" stop-color="#FFC83C"></stop>
  </radialGradient>
  <linearGradient id="paint17_linear_6806_5229" x1="15.6875" y1="23.3125" x2="8.46402" y2="26.3751" gradientUnits="userSpaceOnUse">
  <stop offset="0.328125" stop-color="#FFF478"></stop>
  <stop offset="0.723958" stop-color="#FFF478" stop-opacity="0"></stop>
  </linearGradient>
  <linearGradient id="paint18_linear_6806_5229" x1="16.8182" y1="10.76" x2="2.98527" y2="31.4003" gradientUnits="userSpaceOnUse">
  <stop offset="0.84375" stop-color="#FF63C4" stop-opacity="0"></stop>
  <stop offset="0.941307" stop-color="#FF63C4"></stop>
  </linearGradient>
  <radialGradient id="paint19_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.13837 17.3125) rotate(67.2716) scale(16.5 12.8062)">
  <stop offset="0.776042" stop-color="#FD61C2" stop-opacity="0"></stop>
  <stop offset="0.941307" stop-color="#FF63C4"></stop>
  </radialGradient>
  <linearGradient id="paint20_linear_6806_5229" x1="3.17178" y1="24.1562" x2="2.61959" y2="24.9985" gradientUnits="userSpaceOnUse">
  <stop offset="0.385833" stop-color="#83480A"></stop>
  <stop offset="0.545035" stop-color="#CD7313"></stop>
  <stop offset="1" stop-color="#FA9428" stop-opacity="0"></stop>
  </linearGradient>
  <linearGradient id="paint21_linear_6806_5229" x1="4.8125" y1="22.9844" x2="4.02728" y2="23.9557" gradientUnits="userSpaceOnUse">
  <stop offset="0.385833" stop-color="#83480A"></stop>
  <stop offset="0.545035" stop-color="#CD7313"></stop>
  <stop offset="1" stop-color="#FA9428" stop-opacity="0"></stop>
  </linearGradient>
  <linearGradient id="paint22_linear_6806_5229" x1="6.0625" y1="21.2813" x2="5.1318" y2="22.3129" gradientUnits="userSpaceOnUse">
  <stop offset="0.385833" stop-color="#83480A"></stop>
  <stop offset="0.545035" stop-color="#CD7313"></stop>
  <stop offset="1" stop-color="#FA9428" stop-opacity="0"></stop>
  </linearGradient>
  <radialGradient id="paint23_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.53125 19.9688) rotate(152.835) scale(2.66945 6.63133)">
  <stop offset="0.385833" stop-color="#83480A"></stop>
  <stop offset="0.545035" stop-color="#CD7313"></stop>
  <stop offset="1" stop-color="#FA9428" stop-opacity="0"></stop>
  </radialGradient>
  <linearGradient id="paint24_linear_6806_5229" x1="3.91089" y1="19.871" x2="7.18727" y2="25.0295" gradientUnits="userSpaceOnUse">
  <stop offset="0.328125" stop-color="#FFF478" stop-opacity="0.5"></stop>
  <stop offset="0.723958" stop-color="#FFF478" stop-opacity="0"></stop>
  </linearGradient>
  <linearGradient id="paint25_linear_6806_5229" x1="1.67261" y1="20.871" x2="4.94899" y2="26.0295" gradientUnits="userSpaceOnUse">
  <stop offset="0.328125" stop-color="#FFF478" stop-opacity="0.5"></stop>
  <stop offset="0.723958" stop-color="#FFF478" stop-opacity="0"></stop>
  </linearGradient>
  <linearGradient id="paint26_linear_6806_5229" x1="1.15698" y1="22.9022" x2="4.43336" y2="28.0607" gradientUnits="userSpaceOnUse">
  <stop offset="0.328125" stop-color="#FFF478" stop-opacity="0.5"></stop>
  <stop offset="0.723958" stop-color="#FFF478" stop-opacity="0"></stop>
  </linearGradient>
  <linearGradient id="paint27_linear_6806_5229" x1="1.15698" y1="25.2501" x2="4.43336" y2="30.4086" gradientUnits="userSpaceOnUse">
  <stop offset="0.328125" stop-color="#FFF478" stop-opacity="0.5"></stop>
  <stop offset="0.723958" stop-color="#FFF478" stop-opacity="0"></stop>
  </linearGradient>
  <radialGradient id="paint28_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.7395 18.3637) rotate(137.605) scale(27.83 27.7466)">
  <stop offset="0.230303" stop-color="#F9AF20"></stop>
  <stop offset="0.538057" stop-color="#FFD362"></stop>
  <stop offset="0.82425" stop-color="#F9AF20"></stop>
  </radialGradient>
  <linearGradient id="paint29_linear_6806_5229" x1="17.3125" y1="24.3125" x2="23.125" y2="24.9466" gradientUnits="userSpaceOnUse">
  <stop offset="0.213542" stop-color="#CC6C07"></stop>
  <stop offset="0.328125" stop-color="#EE891E"></stop>
  <stop offset="0.864583" stop-color="#FA9428" stop-opacity="0"></stop>
  </linearGradient>
  <linearGradient id="paint30_linear_6806_5229" x1="15.1974" y1="10.7709" x2="29.0304" y2="31.4112" gradientUnits="userSpaceOnUse">
  <stop offset="0.84375" stop-color="#FF63C4" stop-opacity="0"></stop>
  <stop offset="0.941307" stop-color="#FF63C4"></stop>
  </linearGradient>
  <radialGradient id="paint31_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(26.8773 17.3235) rotate(112.728) scale(16.5 12.8062)">
  <stop offset="0.776042" stop-color="#FD61C2" stop-opacity="0"></stop>
  <stop offset="0.941307" stop-color="#FF63C4"></stop>
  </radialGradient>
  <linearGradient id="paint32_linear_6806_5229" x1="28.9433" y1="24.0049" x2="29.4832" y2="24.8343" gradientUnits="userSpaceOnUse">
  <stop offset="0.385833" stop-color="#83480A"></stop>
  <stop offset="0.545035" stop-color="#CD7313"></stop>
  <stop offset="1" stop-color="#FA9428" stop-opacity="0"></stop>
  </linearGradient>
  <linearGradient id="paint33_linear_6806_5229" x1="27.0178" y1="22.7813" x2="27.97" y2="23.8406" gradientUnits="userSpaceOnUse">
  <stop offset="0.385833" stop-color="#83480A"></stop>
  <stop offset="0.545035" stop-color="#CD7313"></stop>
  <stop offset="1" stop-color="#FA9428" stop-opacity="0"></stop>
  </linearGradient>
  <linearGradient id="paint34_linear_6806_5229" x1="25.9913" y1="20.995" x2="26.9766" y2="22.1796" gradientUnits="userSpaceOnUse">
  <stop offset="0.385833" stop-color="#83480A"></stop>
  <stop offset="0.545035" stop-color="#CD7313"></stop>
  <stop offset="1" stop-color="#FA9428" stop-opacity="0"></stop>
  </linearGradient>
  <linearGradient id="paint35_linear_6806_5229" x1="26.1205" y1="18.5828" x2="26.961" y2="19.6063" gradientUnits="userSpaceOnUse">
  <stop offset="0.328125" stop-color="#EE891E"></stop>
  <stop offset="0.864583" stop-color="#FA9428" stop-opacity="0"></stop>
  </linearGradient>
  <radialGradient id="paint36_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22.8106 20.2154) rotate(118.681) scale(0.829377 0.911808)">
  <stop offset="0.328125" stop-color="#FAF194" stop-opacity="0.2"></stop>
  <stop offset="0.723958" stop-color="#FFF478" stop-opacity="0"></stop>
  </radialGradient>
  <radialGradient id="paint37_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(27.2734 19.9709) rotate(116.983) scale(0.94107 0.99355)">
  <stop offset="0.328125" stop-color="#FAF194" stop-opacity="0.4"></stop>
  <stop offset="0.723958" stop-color="#FFF478" stop-opacity="0"></stop>
  </radialGradient>
  <radialGradient id="paint38_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29.7091 21.1007) rotate(121.756) scale(0.811312 0.948018)">
  <stop offset="0.390625" stop-color="#FAF194" stop-opacity="0.3"></stop>
  <stop offset="0.8125" stop-color="#FFF478" stop-opacity="0"></stop>
  </radialGradient>
  <radialGradient id="paint39_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30.078 23.2726) rotate(121.756) scale(0.811312 0.948018)">
  <stop offset="0.328125" stop-color="#FAF194" stop-opacity="0.3"></stop>
  <stop offset="0.723958" stop-color="#FFF478" stop-opacity="0"></stop>
  </radialGradient>
  <radialGradient id="paint40_radial_6806_5229" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30.1874 25.6955) rotate(121.756) scale(0.811312 0.948018)">
  <stop offset="0.328125" stop-color="#FAF194" stop-opacity="0.3"></stop>
  <stop offset="0.723958" stop-color="#FFF478" stop-opacity="0"></stop>
  </radialGradient>
  </defs>
</svg>`;
}, "D:/work/astro/lighting-proton/src/components/icons/Logo.astro");

/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 1.0.7
*/
const defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});

const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});

function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}

const separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}

const defaultCustomisations = {
    ...defaultIconCustomisations,
    preserveAspectRatio: '',
};
/**
 * Get customisations
 */
function getCustomisations(node) {
    const customisations = {
        ...defaultCustomisations,
    };
    const attr = (key, def) => node.getAttribute(key) || def;
    // Dimensions
    customisations.width = attr('width', null);
    customisations.height = attr('height', null);
    // Rotation
    customisations.rotate = rotateFromString(attr('rotate', ''));
    // Flip
    flipFromString(customisations, attr('flip', ''));
    // SVG attributes
    customisations.preserveAspectRatio = attr('preserveAspectRatio', attr('preserveaspectratio', ''));
    return customisations;
}
/**
 * Check if customisations have been updated
 */
function haveCustomisationsChanged(value1, value2) {
    for (const key in defaultCustomisations) {
        if (value1[key] !== value2[key]) {
            return true;
        }
    }
    return false;
}

const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      // Allow provider without '@': "provider:prefix:name"
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIconName = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
};

function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}

function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}

function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}

function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}

function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}

const optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  return data;
}

const dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage.icons[name] = icon;
    } else {
      storage.missing.add(name);
    }
  });
}
function addIconToStorage(storage, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
function listIcons$1(provider, prefix) {
  let allIcons = [];
  const providers = typeof provider === "string" ? [provider] : Object.keys(dataStorage);
  providers.forEach((provider2) => {
    const prefixes = typeof provider2 === "string" && typeof prefix === "string" ? [prefix] : Object.keys(dataStorage[provider2] || {});
    prefixes.forEach((prefix2) => {
      const storage = getStorage(provider2, prefix2);
      allIcons = allIcons.concat(
        Object.keys(storage.icons).map(
          (name) => (provider2 !== "" ? "@" + provider2 + ":" : "") + prefix2 + ":" + name
        )
      );
    });
  });
  return allIcons;
}

let simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage.icons[iconName] || (storage.missing.has(iconName) ? null : void 0);
  }
}
function addIcon$1(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage, icon.name, data);
}
function addCollection$1(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (icon && addIcon$1(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    provider,
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage = getStorage(provider, prefix);
  return !!addIconSet(storage, data);
}
function iconExists$1(name) {
  return !!getIconData(name);
}
function getIcon$1(name) {
  const result = getIconData(name);
  return result ? {
    ...defaultIconProps,
    ...result
  } : null;
}

function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage = /* @__PURE__ */ Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    if (a.prefix !== b.prefix) {
      return a.prefix.localeCompare(b.prefix);
    }
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage[provider] || (storage[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage.icons) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing.has(name)) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}

function removeCallback(storages, id) {
  storages.forEach((storage) => {
    const items = storage.loaderCallbacks;
    if (items) {
      storage.loaderCallbacks = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(storage) {
  if (!storage.pendingCallbacksFlag) {
    storage.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage.pendingCallbacksFlag = false;
      const items = storage.loaderCallbacks ? storage.loaderCallbacks.slice(0) : [];
      if (!items.length) {
        return;
      }
      let hasPending = false;
      const provider = storage.provider;
      const prefix = storage.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage.icons[name]) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage.missing.has(name)) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([storage], item.id);
          }
          item.callback(
            icons.loaded.slice(0),
            icons.missing.slice(0),
            icons.pending.slice(0),
            item.abort
          );
        }
      });
    });
  }
}
let idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage) => {
    (storage.loaderCallbacks || (storage.loaderCallbacks = [])).push(item);
  });
  return abort;
}

const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}

function listToIcons(list, validate = true, simpleNames = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames) : item;
    if (icon) {
      result.push(icon);
    }
  });
  return result;
}

// src/config.ts
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};

// src/query.ts
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index = config.resources.indexOf(item.resource);
      if (index !== -1 && index !== config.index) {
        config.index = index;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}

// src/index.ts
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(
      config,
      payload,
      queryCallback,
      (data, error) => {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error);
        }
      }
    );
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    return queries.find((value) => {
      return callback(value);
    }) || null;
  }
  const instance = {
    query,
    find,
    setIndex: (index) => {
      config.index = index;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}

function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    resources,
    path: source.path || "/",
    maxURL: source.maxURL || 500,
    rotate: source.rotate || 750,
    timeout: source.timeout || 5e3,
    random: source.random === true,
    index: source.index || 0,
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider$1(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
function listAPIProviders() {
  return Object.keys(configStorage);
}

function emptyCallback$1() {
}
const redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) {
      return;
    }
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send = api.send;
      }
    }
  }
  if (!redundancy || !send) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send, callback)().abort;
}

const browserCacheVersion = "iconify2";
const browserCachePrefix = "iconify";
const browserCacheCountKey = browserCachePrefix + "-count";
const browserCacheVersionKey = browserCachePrefix + "-version";
const browserStorageHour = 36e5;
const browserStorageCacheExpiration = 168;

function getStoredItem(func, key) {
  try {
    return func.getItem(key);
  } catch (err) {
  }
}
function setStoredItem(func, key, value) {
  try {
    func.setItem(key, value);
    return true;
  } catch (err) {
  }
}
function removeStoredItem(func, key) {
  try {
    func.removeItem(key);
  } catch (err) {
  }
}

function setBrowserStorageItemsCount(storage, value) {
  return setStoredItem(storage, browserCacheCountKey, value.toString());
}
function getBrowserStorageItemsCount(storage) {
  return parseInt(getStoredItem(storage, browserCacheCountKey)) || 0;
}

const browserStorageConfig = {
  local: true,
  session: true
};
const browserStorageEmptyItems = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let browserStorageStatus = false;
function setBrowserStorageStatus(status) {
  browserStorageStatus = status;
}

let _window = typeof window === "undefined" ? {} : window;
function getBrowserStorage(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  browserStorageConfig[key] = false;
}

function iterateBrowserStorage(key, callback) {
  const func = getBrowserStorage(key);
  if (!func) {
    return;
  }
  const version = getStoredItem(func, browserCacheVersionKey);
  if (version !== browserCacheVersion) {
    if (version) {
      const total2 = getBrowserStorageItemsCount(func);
      for (let i = 0; i < total2; i++) {
        removeStoredItem(func, browserCachePrefix + i.toString());
      }
    }
    setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
    setBrowserStorageItemsCount(func, 0);
    return;
  }
  const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
  const parseItem = (index) => {
    const name = browserCachePrefix + index.toString();
    const item = getStoredItem(func, name);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data = JSON.parse(item);
      if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && callback(data, index)) {
        return true;
      }
    } catch (err) {
    }
    removeStoredItem(func, name);
  };
  let total = getBrowserStorageItemsCount(func);
  for (let i = total - 1; i >= 0; i--) {
    if (!parseItem(i)) {
      if (i === total - 1) {
        total--;
        setBrowserStorageItemsCount(func, total);
      } else {
        browserStorageEmptyItems[key].add(i);
      }
    }
  }
}

function initBrowserStorage() {
  if (browserStorageStatus) {
    return;
  }
  setBrowserStorageStatus(true);
  for (const key in browserStorageConfig) {
    iterateBrowserStorage(key, (item) => {
      const iconSet = item.data;
      const provider = item.provider;
      const prefix = iconSet.prefix;
      const storage = getStorage(
        provider,
        prefix
      );
      if (!addIconSet(storage, iconSet).length) {
        return false;
      }
      const lastModified = iconSet.lastModified || -1;
      storage.lastModifiedCached = storage.lastModifiedCached ? Math.min(storage.lastModifiedCached, lastModified) : lastModified;
      return true;
    });
  }
}

function updateLastModified(storage, lastModified) {
  const lastValue = storage.lastModifiedCached;
  if (lastValue && lastValue >= lastModified) {
    return lastValue === lastModified;
  }
  storage.lastModifiedCached = lastModified;
  if (lastValue) {
    for (const key in browserStorageConfig) {
      iterateBrowserStorage(key, (item) => {
        const iconSet = item.data;
        return item.provider !== storage.provider || iconSet.prefix !== storage.prefix || iconSet.lastModified === lastModified;
      });
    }
  }
  return true;
}
function storeInBrowserStorage(storage, data) {
  if (!browserStorageStatus) {
    initBrowserStorage();
  }
  function store(key) {
    let func;
    if (!browserStorageConfig[key] || !(func = getBrowserStorage(key))) {
      return;
    }
    const set = browserStorageEmptyItems[key];
    let index;
    if (set.size) {
      set.delete(index = Array.from(set).shift());
    } else {
      index = getBrowserStorageItemsCount(func);
      if (!setBrowserStorageItemsCount(func, index + 1)) {
        return;
      }
    }
    const item = {
      cached: Math.floor(Date.now() / browserStorageHour),
      provider: storage.provider,
      data
    };
    return setStoredItem(
      func,
      browserCachePrefix + index.toString(),
      JSON.stringify(item)
    );
  }
  if (data.lastModified && !updateLastModified(storage, data.lastModified)) {
    return;
  }
  if (!Object.keys(data.icons).length) {
    return;
  }
  if (data.not_found) {
    data = Object.assign({}, data);
    delete data.not_found;
  }
  if (!store("local")) {
    store("session");
  }
}

function emptyCallback() {
}
function loadedNewIcons(storage) {
  if (!storage.iconsLoaderFlag) {
    storage.iconsLoaderFlag = true;
    setTimeout(() => {
      storage.iconsLoaderFlag = false;
      updateCallbacks(storage);
    });
  }
}
function loadNewIcons(storage, icons) {
  if (!storage.iconsToLoad) {
    storage.iconsToLoad = icons;
  } else {
    storage.iconsToLoad = storage.iconsToLoad.concat(icons).sort();
  }
  if (!storage.iconsQueueFlag) {
    storage.iconsQueueFlag = true;
    setTimeout(() => {
      storage.iconsQueueFlag = false;
      const { provider, prefix } = storage;
      const icons2 = storage.iconsToLoad;
      delete storage.iconsToLoad;
      let api;
      if (!icons2 || !(api = getAPIModule(provider))) {
        return;
      }
      const params = api.prepare(provider, prefix, icons2);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          if (typeof data !== "object") {
            item.icons.forEach((name) => {
              storage.missing.add(name);
            });
          } else {
            try {
              const parsed = addIconSet(
                storage,
                data
              );
              if (!parsed.length) {
                return;
              }
              const pending = storage.pendingIcons;
              if (pending) {
                parsed.forEach((name) => {
                  pending.delete(name);
                });
              }
              storeInBrowserStorage(storage, data);
            } catch (err) {
              console.error(err);
            }
          }
          loadedNewIcons(storage);
        });
      });
    });
  }
}
const loadIcons$1 = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) {
      setTimeout(() => {
        if (callCallback) {
          callback(
            sortedIcons.loaded,
            sortedIcons.missing,
            sortedIcons.pending,
            emptyCallback
          );
        }
      });
    }
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix } = icon;
    if (prefix === lastPrefix && provider === lastProvider) {
      return;
    }
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push(getStorage(provider, prefix));
    const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
    if (!providerNewIcons[prefix]) {
      providerNewIcons[prefix] = [];
    }
  });
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix, name } = icon;
    const storage = getStorage(provider, prefix);
    const pendingQueue = storage.pendingIcons || (storage.pendingIcons = /* @__PURE__ */ new Set());
    if (!pendingQueue.has(name)) {
      pendingQueue.add(name);
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((storage) => {
    const { provider, prefix } = storage;
    if (newIcons[provider][prefix].length) {
      loadNewIcons(storage, newIcons[provider][prefix]);
    }
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
const loadIcon$1 = (icon) => {
  return new Promise((fulfill, reject) => {
    const iconObj = typeof icon === "string" ? stringToIcon(icon, true) : icon;
    if (!iconObj) {
      reject(icon);
      return;
    }
    loadIcons$1([iconObj || icon], (loaded) => {
      if (loaded.length && iconObj) {
        const data = getIconData(iconObj);
        if (data) {
          fulfill({
            ...defaultIconProps,
            ...data
          });
          return;
        }
      }
      reject(icon);
    });
  });
};

/**
 * Test icon string
 */
function testIconObject(value) {
    try {
        const obj = typeof value === 'string' ? JSON.parse(value) : value;
        if (typeof obj.body === 'string') {
            return {
                ...obj,
            };
        }
    }
    catch (err) {
        //
    }
}

/**
 * Parse icon value, load if needed
 */
function parseIconValue(value, onload) {
    // Check if icon name is valid
    const name = typeof value === 'string' ? stringToIcon(value, true, true) : null;
    if (!name) {
        // Test for serialised object
        const data = testIconObject(value);
        return {
            value,
            data,
        };
    }
    // Valid icon name: check if data is available
    const data = getIconData(name);
    // Icon data exists or icon has no prefix. Do not load icon from API if icon has no prefix
    if (data !== void 0 || !name.prefix) {
        return {
            value,
            name,
            data, // could be 'null' -> icon is missing
        };
    }
    // Load icon
    const loading = loadIcons$1([name], () => onload(value, name, getIconData(name)));
    return {
        value,
        name,
        loading,
    };
}

/**
 * Check for inline
 */
function getInline(node) {
    return node.hasAttribute('inline');
}

// Check for Safari
let isBuggedSafari = false;
try {
    isBuggedSafari = navigator.vendor.indexOf('Apple') === 0;
}
catch (err) {
    //
}
/**
 * Get render mode
 */
function getRenderMode(body, mode) {
    switch (mode) {
        // Force mode
        case 'svg':
        case 'bg':
        case 'mask':
            return mode;
    }
    // Check for animation, use 'style' for animated icons, unless browser is Safari
    // (only <a>, which should be ignored or animations start with '<a')
    if (mode !== 'style' &&
        (isBuggedSafari || body.indexOf('<a') === -1)) {
        // Render <svg>
        return 'svg';
    }
    // Use background or mask
    return body.indexOf('currentColor') === -1 ? 'bg' : 'mask';
}

const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize$1(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}

const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize$1(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize$1(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  attributes.viewBox = box.left.toString() + " " + box.top.toString() + " " + boxWidth.toString() + " " + boxHeight.toString();
  return {
    attributes,
    body
  };
}

const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
};
let fetchModule = detectFetch();
function setFetch(fetch2) {
  fetchModule = fetch2;
}
function getFetch() {
  return fetchModule;
}
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
const prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      const urlParams = new URLSearchParams({
        icons: iconsList
      });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404) {
          callback("abort", data);
        } else {
          callback("next", defaultError);
        }
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};

function toggleBrowserCache(storage, value) {
  switch (storage) {
    case "local":
    case "session":
      browserStorageConfig[storage] = value;
      break;
    case "all":
      for (const key in browserStorageConfig) {
        browserStorageConfig[key] = value;
      }
      break;
  }
}

/**
 * Attribute to add
 */
const nodeAttr = 'data-style';
/**
 * Custom style to add to each node
 */
let customStyle = '';
/**
 * Set custom style to add to all components
 *
 * Affects only components rendered after function call
 */
function appendCustomStyle(style) {
    customStyle = style;
}
/**
 * Add/update style node
 */
function updateStyle(parent, inline) {
    // Get node, create if needed
    let styleNode = Array.from(parent.childNodes).find((node) => node.hasAttribute &&
        node.hasAttribute(nodeAttr));
    if (!styleNode) {
        styleNode = document.createElement('style');
        styleNode.setAttribute(nodeAttr, nodeAttr);
        parent.appendChild(styleNode);
    }
    // Update content
    styleNode.textContent =
        ':host{display:inline-block;vertical-align:' +
            (inline ? '-0.125em' : '0') +
            '}span,svg{display:block}' +
            customStyle;
}

// Core
/**
 * Get functions and initialise stuff
 */
function exportFunctions() {
    /**
     * Initialise stuff
     */
    // Set API module
    setAPIModule('', fetchAPIModule);
    // Allow simple icon names
    allowSimpleNames(true);
    let _window;
    try {
        _window = window;
    }
    catch (err) {
        //
    }
    if (_window) {
        // Set cache and load existing cache
        initBrowserStorage();
        // Load icons from global "IconifyPreload"
        if (_window.IconifyPreload !== void 0) {
            const preload = _window.IconifyPreload;
            const err = 'Invalid IconifyPreload syntax.';
            if (typeof preload === 'object' && preload !== null) {
                (preload instanceof Array ? preload : [preload]).forEach((item) => {
                    try {
                        if (
                        // Check if item is an object and not null/array
                        typeof item !== 'object' ||
                            item === null ||
                            item instanceof Array ||
                            // Check for 'icons' and 'prefix'
                            typeof item.icons !== 'object' ||
                            typeof item.prefix !== 'string' ||
                            // Add icon set
                            !addCollection$1(item)) {
                            console.error(err);
                        }
                    }
                    catch (e) {
                        console.error(err);
                    }
                });
            }
        }
        // Set API from global "IconifyProviders"
        if (_window.IconifyProviders !== void 0) {
            const providers = _window.IconifyProviders;
            if (typeof providers === 'object' && providers !== null) {
                for (const key in providers) {
                    const err = 'IconifyProviders[' + key + '] is invalid.';
                    try {
                        const value = providers[key];
                        if (typeof value !== 'object' ||
                            !value ||
                            value.resources === void 0) {
                            continue;
                        }
                        if (!addAPIProvider$1(key, value)) {
                            console.error(err);
                        }
                    }
                    catch (e) {
                        console.error(err);
                    }
                }
            }
        }
    }
    const _api = {
        getAPIConfig,
        setAPIModule,
        sendAPIQuery,
        setFetch,
        getFetch,
        listAPIProviders,
    };
    return {
        enableCache: (storage) => toggleBrowserCache(storage, true),
        disableCache: (storage) => toggleBrowserCache(storage, false),
        iconExists: iconExists$1,
        getIcon: getIcon$1,
        listIcons: listIcons$1,
        addIcon: addIcon$1,
        addCollection: addCollection$1,
        calculateSize: calculateSize$1,
        buildIcon: iconToSVG,
        loadIcons: loadIcons$1,
        loadIcon: loadIcon$1,
        addAPIProvider: addAPIProvider$1,
        appendCustomStyle,
        _api,
    };
}

function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}

function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToURL(svg) {
  return 'url("data:image/svg+xml,' + encodeSVGforURL(svg) + '")';
}

// List of properties to apply
const monotoneProps = {
    'background-color': 'currentColor',
};
const coloredProps = {
    'background-color': 'transparent',
};
// Dynamically add common props to variables above
const propsToAdd = {
    image: 'var(--svg)',
    repeat: 'no-repeat',
    size: '100% 100%',
};
const propsToAddTo = {
    '-webkit-mask': monotoneProps,
    'mask': monotoneProps,
    'background': coloredProps,
};
for (const prefix in propsToAddTo) {
    const list = propsToAddTo[prefix];
    for (const prop in propsToAdd) {
        list[prefix + '-' + prop] = propsToAdd[prop];
    }
}
/**
 * Fix size: add 'px' to numbers
 */
function fixSize(value) {
    return value ? value + (value.match(/^[-0-9.]+$/) ? 'px' : '') : 'inherit';
}
/**
 * Render node as <span>
 */
function renderSPAN(data, icon, useMask) {
    const node = document.createElement('span');
    // Body
    let body = data.body;
    if (body.indexOf('<a') !== -1) {
        // Animated SVG: add something to fix timing bug
        body += '<!-- ' + Date.now() + ' -->';
    }
    // Generate SVG as URL
    const renderAttribs = data.attributes;
    const html = iconToHTML(body, {
        ...renderAttribs,
        width: icon.width + '',
        height: icon.height + '',
    });
    const url = svgToURL(html);
    // Generate style
    const svgStyle = node.style;
    const styles = {
        '--svg': url,
        'width': fixSize(renderAttribs.width),
        'height': fixSize(renderAttribs.height),
        ...(useMask ? monotoneProps : coloredProps),
    };
    // Apply style
    for (const prop in styles) {
        svgStyle.setProperty(prop, styles[prop]);
    }
    return node;
}

/**
 * Render node as <svg>
 */
function renderSVG(data) {
    const node = document.createElement('span');
    // Add style if needed
    const attr = data.attributes;
    let style = '';
    if (!attr.width) {
        style = 'width: inherit;';
    }
    if (!attr.height) {
        style += 'height: inherit;';
    }
    if (style) {
        attr.style = style;
    }
    // Generate SVG
    node.innerHTML = iconToHTML(data.body, attr);
    return node.firstChild;
}

/**
 * Render icon
 */
function renderIcon(parent, state) {
    const iconData = state.icon.data;
    const customisations = state.customisations;
    // Render icon
    const renderData = iconToSVG(iconData, customisations);
    if (customisations.preserveAspectRatio) {
        renderData.attributes['preserveAspectRatio'] =
            customisations.preserveAspectRatio;
    }
    const mode = state.renderedMode;
    let node;
    switch (mode) {
        case 'svg':
            node = renderSVG(renderData);
            break;
        default:
            node = renderSPAN(renderData, {
                ...defaultIconProps,
                ...iconData,
            }, mode === 'mask');
    }
    // Set element
    const oldNode = Array.from(parent.childNodes).find((node) => {
        const tag = node.tagName &&
            node.tagName.toUpperCase();
        return tag === 'SPAN' || tag === 'SVG';
    });
    if (oldNode) {
        // Replace old element
        if (node.tagName === 'SPAN' && oldNode.tagName === node.tagName) {
            // Swap style instead of whole node
            oldNode.setAttribute('style', node.getAttribute('style'));
        }
        else {
            parent.replaceChild(node, oldNode);
        }
    }
    else {
        // Add new element
        parent.appendChild(node);
    }
}

/**
 * Set state to PendingState
 */
function setPendingState(icon, inline, lastState) {
    const lastRender = lastState &&
        (lastState.rendered
            ? lastState
            : lastState.lastRender);
    return {
        rendered: false,
        inline,
        icon,
        lastRender,
    };
}

/**
 * Register 'iconify-icon' component, if it does not exist
 */
function defineIconifyIcon(name = 'iconify-icon') {
    // Check for custom elements registry and HTMLElement
    let customElements;
    let ParentClass;
    try {
        customElements = window.customElements;
        ParentClass = window.HTMLElement;
    }
    catch (err) {
        return;
    }
    // Make sure registry and HTMLElement exist
    if (!customElements || !ParentClass) {
        return;
    }
    // Check for duplicate
    const ConflictingClass = customElements.get(name);
    if (ConflictingClass) {
        return ConflictingClass;
    }
    // All attributes
    const attributes = [
        // Icon
        'icon',
        // Mode
        'mode',
        'inline',
        // Customisations
        'width',
        'height',
        'rotate',
        'flip',
    ];
    /**
     * Component class
     */
    const IconifyIcon = class extends ParentClass {
        // Root
        _shadowRoot;
        // State
        _state;
        // Attributes check queued
        _checkQueued = false;
        /**
         * Constructor
         */
        constructor() {
            super();
            // Attach shadow DOM
            const root = (this._shadowRoot = this.attachShadow({
                mode: 'open',
            }));
            // Add style
            const inline = getInline(this);
            updateStyle(root, inline);
            // Create empty state
            this._state = setPendingState({
                value: '',
            }, inline);
            // Queue icon render
            this._queueCheck();
        }
        /**
         * Observed attributes
         */
        static get observedAttributes() {
            return attributes.slice(0);
        }
        /**
         * Observed properties that are different from attributes
         *
         * Experimental! Need to test with various frameworks that support it
         */
        /*
        static get properties() {
            return {
                inline: {
                    type: Boolean,
                    reflect: true,
                },
                // Not listing other attributes because they are strings or combination
                // of string and another type. Cannot have multiple types
            };
        }
        */
        /**
         * Attribute has changed
         */
        attributeChangedCallback(name) {
            if (name === 'inline') {
                // Update immediately: not affected by other attributes
                const newInline = getInline(this);
                const state = this._state;
                if (newInline !== state.inline) {
                    // Update style if inline mode changed
                    state.inline = newInline;
                    updateStyle(this._shadowRoot, newInline);
                }
            }
            else {
                // Queue check for other attributes
                this._queueCheck();
            }
        }
        /**
         * Get/set icon
         */
        get icon() {
            const value = this.getAttribute('icon');
            if (value && value.slice(0, 1) === '{') {
                try {
                    return JSON.parse(value);
                }
                catch (err) {
                    //
                }
            }
            return value;
        }
        set icon(value) {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            this.setAttribute('icon', value);
        }
        /**
         * Get/set inline
         */
        get inline() {
            return getInline(this);
        }
        set inline(value) {
            if (value) {
                this.setAttribute('inline', 'true');
            }
            else {
                this.removeAttribute('inline');
            }
        }
        /**
         * Restart animation
         */
        restartAnimation() {
            const state = this._state;
            if (state.rendered) {
                const root = this._shadowRoot;
                if (state.renderedMode === 'svg') {
                    // Update root node
                    try {
                        root.lastChild.setCurrentTime(0);
                        return;
                    }
                    catch (err) {
                        // Failed: setCurrentTime() is not supported
                    }
                }
                renderIcon(root, state);
            }
        }
        /**
         * Get status
         */
        get status() {
            const state = this._state;
            return state.rendered
                ? 'rendered'
                : state.icon.data === null
                    ? 'failed'
                    : 'loading';
        }
        /**
         * Queue attributes re-check
         */
        _queueCheck() {
            if (!this._checkQueued) {
                this._checkQueued = true;
                setTimeout(() => {
                    this._check();
                });
            }
        }
        /**
         * Check for changes
         */
        _check() {
            if (!this._checkQueued) {
                return;
            }
            this._checkQueued = false;
            const state = this._state;
            // Get icon
            const newIcon = this.getAttribute('icon');
            if (newIcon !== state.icon.value) {
                this._iconChanged(newIcon);
                return;
            }
            // Ignore other attributes if icon is not rendered
            if (!state.rendered) {
                return;
            }
            // Check for mode and attribute changes
            const mode = this.getAttribute('mode');
            const customisations = getCustomisations(this);
            if (state.attrMode !== mode ||
                haveCustomisationsChanged(state.customisations, customisations)) {
                this._renderIcon(state.icon, customisations, mode);
            }
        }
        /**
         * Icon value has changed
         */
        _iconChanged(newValue) {
            const icon = parseIconValue(newValue, (value, name, data) => {
                // Asynchronous callback: re-check values to make sure stuff wasn't changed
                const state = this._state;
                if (state.rendered || this.getAttribute('icon') !== value) {
                    // Icon data is already available or icon attribute was changed
                    return;
                }
                // Change icon
                const icon = {
                    value,
                    name,
                    data,
                };
                if (icon.data) {
                    // Render icon
                    this._gotIconData(icon);
                }
                else {
                    // Nothing to render: update icon in state
                    state.icon = icon;
                }
            });
            if (icon.data) {
                // Icon is ready to render
                this._gotIconData(icon);
            }
            else {
                // Pending icon
                this._state = setPendingState(icon, this._state.inline, this._state);
            }
        }
        /**
         * Got new icon data, icon is ready to (re)render
         */
        _gotIconData(icon) {
            this._checkQueued = false;
            this._renderIcon(icon, getCustomisations(this), this.getAttribute('mode'));
        }
        /**
         * Re-render based on icon data
         */
        _renderIcon(icon, customisations, attrMode) {
            // Get mode
            const renderedMode = getRenderMode(icon.data.body, attrMode);
            // Inline was not changed
            const inline = this._state.inline;
            // Set state and render
            renderIcon(this._shadowRoot, (this._state = {
                rendered: true,
                icon,
                inline,
                customisations,
                attrMode,
                renderedMode,
            }));
        }
    };
    // Add getters and setters
    attributes.forEach((attr) => {
        if (!(attr in IconifyIcon.prototype)) {
            Object.defineProperty(IconifyIcon.prototype, attr, {
                get: function () {
                    return this.getAttribute(attr);
                },
                set: function (value) {
                    if (value !== null) {
                        this.setAttribute(attr, value);
                    }
                    else {
                        this.removeAttribute(attr);
                    }
                },
            });
        }
    });
    // Add exported functions: both as static and instance methods
    const functions = exportFunctions();
    for (const key in functions) {
        IconifyIcon[key] = IconifyIcon.prototype[key] = functions[key];
    }
    // Define new component
    customElements.define(name, IconifyIcon);
    return IconifyIcon;
}

/**
 * Create exported data: either component instance or functions
 */
defineIconifyIcon() || exportFunctions();

function Icon(props) {
  let {
    icon,
    mode,
    inline,
    rotate,
    flip,
    width,
    height,
    preserveAspectRatio
  } = props;
  if (typeof icon === "object") {
    icon = JSON.stringify(icon);
  }
  return (// @ts-ignore
    ssrElement("iconify-icon", mergeProps({
      "attr:icon": icon,
      "attr:mode": mode,
      "attr:inline": inline,
      "attr:rotate": rotate,
      "attr:flip": flip,
      "attr:width": width,
      "attr:height": height,
      "attr:preserveAspectRatio": preserveAspectRatio
    }, props), undefined, true)
  );
}

__astro_tag_component__(Icon, "@astrojs/solid-js");

const _tmpl$ = ["<div", " class=\"grid grid-cols-1 md:grid-cols-2 gap-4\"><!--#-->", "<!--/--><div class=\"i-fluent-emoji-flat-eight-spoked-asterisk\"></div></div>"],
  _tmpl$2 = ["<a", " target=\"_blank\" class=\"flex items-center gap-3 bg-zinc-50 hover:bg-zinc-100 transition rounded-md p-3\"><!--#-->", "<!--/--><div><h2 class=\"text-lg\">", "</h2><p class=\"text-zinc-500 text-sm\">", "</p></div></a>"];
function Projects() {
  const projectList = [{
    icon: EightSpokedAsterisk,
    name: "UniAnalytics",
    describe: "Out site tips + statistics",
    url: "https://github.com/YuzeTT/UniAnalytics"
  }, {
    icon: Crab,
    name: "watch-crab",
    describe: "Twitter follower monitoring",
    url: "https://github.com/YuzeTT/watch-crab"
  }, {
    icon: Newspaper,
    name: "paper-share",
    describe: "Quick article writing / share",
    url: "https://github.com/YuzeTT/paper-share"
  }, {
    icon: RolledUpNewspaper,
    name: "lighting-page",
    describe: "Personal homepage template",
    url: "https://github.com/YuzeTT/lighting-page"
  }, {
    icon: Ice,
    name: "blooock",
    describe: "Start page for Minecraft players",
    url: "https://a.hsott.cn"
  }, {
    icon: ShoppingCart,
    name: "GeeView-vue",
    describe: "Lightweight shopping platform",
    url: "https://github.com/YuzeTT/GeeView-vue"
  }];
  return ssr(_tmpl$, ssrHydrationKey(), escape(createComponent(For, {
    each: projectList,
    children: item => ssr(_tmpl$2, ssrHydrationKey() + ssrAttribute("href", escape(item.url, true), false), escape(createComponent(Icon, {
      get icon() {
        return item.icon;
      },
      "class": "text-4xl"
    })), escape(item.name), escape(item.describe))
  })));
}

__astro_tag_component__(Projects, "@astrojs/solid-js");

const $$Astro = createAstro();
const $$Index = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "YuzeTT's personal homepage" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main>
		<div class="mt-12 px-4">
			${renderComponent($$result2, "Logo", $$Logo, {})}
		</div>
		<h1 class="text-3xl font-bold pt-3 px-4">Long time no see!</h1>
		<h1 class="text-4xl font-bold pt-2 px-4">I'm <span class="relative after:absolute after:-left-1 after:-right-1 after:-z-10 after:top-2/3 after:bottom-0 after:bg-orange-300 after:transition-all hover:after:top-0">YuzeTT</span> .</h1>
		<!-- <h1 class="text-4xl font-bold pt-2 px-4">I'm <span class="underline decoration-sky-500">YuzeTT</span> .</h1> -->
		<!-- <p class="border-l-4 px-3 py-1 mt-2">
			You will never know unless you try.
		</p> -->
		<h3 class="mt-10 text-2xl font-bold px-3 border-l-4 border-zinc-800">About Me</h3>
		<div class="flex flex-wrap gap-2 pt-4 px-4">
			<span class="px-2.5 py-1 bg-zinc-100 rounded-full">📄 Student </span>
			<span class="px-2.5 py-1 bg-zinc-100 rounded-full">🎨 Designer</span>
			<span class="px-2.5 py-1 bg-zinc-100 rounded-full">💻 Developer</span>
		</div>
		<p class="px-4 pt-3">I was born in 2005, Passion for development and design.</p>

		<div class="flex items-center justify-between mt-10 text-2xl font-bold px-3 border-l-4 border-zinc-800">
			<h3>My Projects</h3>
			${renderComponent($$result2, "Link", Link, { "name": "More\u2197", "href": "https://github.com/YuzeTT" })}
		</div>
		<div class="px-4 pt-4">
			${renderComponent($$result2, "Projects", Projects, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/work/astro/lighting-proton/src/components/Projects", "client:component-export": "default" })}
		</div>

		<h3 class="mt-10 text-2xl font-bold px-3 border-l-4 border-zinc-800">Find Me</h3>
		<div class="pt-4 px-4">
			<p>My project is on ${renderComponent($$result2, "Link", Link, { "name": "Github", "href": "https://github.com/YuzeTT" })}.</p>
			<p>My Email is ${renderComponent($$result2, "Link", Link, { "name": "yuzett@outlook.com", "href": "mailto:yuzett@outlook.com" })}.</p>
		</div>
	</main>` })}`;
}, "D:/work/astro/lighting-proton/src/pages/index.astro");

const $$file = "D:/work/astro/lighting-proton/src/pages/index.astro";
const $$url = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, createComponent as c, renderToString as r, ssr as s };
