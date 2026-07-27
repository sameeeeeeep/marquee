// ../../../../../packages/protocol/dist/version.js
var PROVIDER_GLOBAL = "claude";

// ../../../../../packages/protocol/dist/storage.js
var STORAGE_KEY_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;
function isValidStorageKey(key) {
  return typeof key === "string" && STORAGE_KEY_RE.test(key);
}

// ../../../../../packages/protocol/dist/errors.js
var BYOPErrorCode = {
  /** User rejected the connect/consent request. (≈ 4001) */
  USER_REJECTED: 4001,
  /** Origin is not connected / has no grant for this method. (≈ 4100) */
  UNAUTHORIZED: 4100,
  /** Method exists but the origin's scope doesn't cover it (model/tool not granted). */
  SCOPE_EXCEEDED: 4110,
  /** A per-action write consent was denied by the user. */
  CONSENT_DENIED: 4120,
  /** Budget or rate limit hit (tokens/day or calls/min). */
  BUDGET_EXCEEDED: 4290,
  /** Unknown method. (≈ 4200) */
  UNSUPPORTED_METHOD: 4200,
  /** Bad params. (≈ -32602) */
  INVALID_PARAMS: -32602,
  /** The sidekick daemon is not installed / not reachable. The SDK maps this to its
   *  "install the sidekick" fallback. */
  PROVIDER_UNAVAILABLE: 4900,
  /** Backend error (model/tool failed for a non-policy reason). */
  BACKEND_ERROR: 4500
};

// ../../../../../packages/sdk/dist/connect-chip.js
function rungFromError(e) {
  if (e?.code !== BYOPErrorCode.PROVIDER_UNAVAILABLE)
    return null;
  return e?.data?.reason === "unpaired" ? { kind: "unpaired" } : { kind: "unreachable" };
}
var CHROME_STORE_URL = "https://chromewebstore.google.com/detail/injmjolmnekmahlnackakiamjepegagb";
var RELAY_DMG_URL = "https://github.com/sameeeeeeep/switchboard/releases/latest/download/Switchboard.dmg";
var STYLE = `
:host { all: initial; }
* { box-sizing: border-box; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; }
.chip, .btn { display: inline-flex; align-items: center; gap: 9px; cursor: pointer; border: 0;
  font-size: 13px; font-weight: 600; line-height: 1; border-radius: 10px; }
/* The canonical connect lockup \u2014 the SAME mark + wordmark on every wrapp, so users recognize
   "Connect Switchboard" the way they knew the MetaMask button. Dark pill, lime glyph, locked in
   the shadow root so a host app can't restyle it away. */
.btn { padding: 9px 15px 9px 11px; background: #12151C; color: #E8EDF4; border: 1px solid #2C3444; }
.btn.connect:hover { background: #161B24; border-color: #3A4A18; }
.btn.get { color: #C3CAD6; border-color: #262C38; }
.btn.get:hover { color: #E8EDF4; border-color: #3A4353; }
.btn .arr { color: #6E7C90; font-weight: 500; margin-left: -2px; }
/* The Switchboard mark: lime rounded square with the top-right notch (matches the side-panel brand).
   Muted to slate when the sidekick isn't installed yet \u2014 the mark "lights up" once you can connect. */
.glyph { position: relative; width: 16px; height: 16px; border-radius: 5px; background: #C8F250;
  box-shadow: 0 0 12px rgba(200,242,80,.45); flex: none; }
.glyph::after { content: ""; position: absolute; top: 4px; right: 4px; width: 4px; height: 4px;
  border-radius: 50%; background: #0A0C10; }
.btn.get .glyph { background: #6E7C90; box-shadow: none; }
.wrap { position: relative; display: inline-block; }
.chip { background: #1A1F29; border: 1px solid #262C38; padding: 6px 10px 6px 7px; color: #E8EDF4; }
.chip:hover { border-color: #3A4353; }
.av { width: 26px; height: 26px; border-radius: 7px; background: #C8F250; color: #0A0C10; display: grid;
  place-items: center; font-weight: 700; font-size: 12px; overflow: hidden; flex: none; }
.av img { width: 100%; height: 100%; object-fit: cover; }
.who { display: flex; flex-direction: column; gap: 3px; min-width: 0; text-align: left; }
.who .hi { font-size: 12.5px; font-weight: 600; white-space: nowrap; }
.who .proj { font-size: 10.5px; font-weight: 500; color: #99A3B7; white-space: nowrap; }
.caret { color: #6E7C90; font-size: 9px; margin-left: 2px; }
.menu { position: absolute; top: calc(100% + 6px); right: 0; z-index: 2147483000; width: 232px;
  background: #1A1F29; border: 1px solid #262C38; border-radius: 12px; padding: 7px;
  box-shadow: 0 18px 40px -20px rgba(0,0,0,.7); }
.menu .lbl { padding: 8px 10px 6px; font-size: 10px; font-weight: 600; letter-spacing: .06em;
  text-transform: uppercase; color: #6E7C90; }
.menu .proj-row { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 8px;
  background: #20262F; cursor: pointer; border: 0; width: 100%; color: #E8EDF4; font-size: 13px; font-weight: 600; }
.menu .proj-row:hover { background: #262d38; }
.menu .proj-row .go { margin-left: auto; color: #C8F250; font-size: 11px; font-weight: 600; }
.menu .sep { height: 1px; background: #262C38; margin: 6px 4px; }
.menu .item { display: block; width: 100%; text-align: left; padding: 8px 10px; border: 0; border-radius: 8px;
  background: transparent; color: #B4BECE; font-size: 13px; font-weight: 500; cursor: pointer; }
.menu .item:hover { background: #20262F; color: #E8EDF4; }
.menu .foot { padding: 8px 10px 4px; font-size: 11px; font-weight: 500; color: #6E7C90; line-height: 1.4; }
/* Setup-ladder pills (sidekick asleep / unpaired): quiet and informative, never red \u2014 nothing is
   broken. Amber only while the daemon is unreachable; the glyph stays muted until it's reachable. */
.dot { width: 7px; height: 7px; border-radius: 50%; background: #E8B84B; flex: none;
  box-shadow: 0 0 8px rgba(232,184,75,.45); }
.menu .body { padding: 8px 10px 2px; font-size: 12px; font-weight: 500; color: #B4BECE; line-height: 1.45; }
`;
function mountConnect(target, opts = {}) {
  const installUrl = opts.installUrl ?? "https://thelastprompt.ai/switchboard/";
  const host = document.createElement("div");
  host.style.display = "inline-block";
  const root = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = STYLE;
  root.append(style);
  const mount = document.createElement("div");
  root.append(mount);
  target.append(host);
  let state2 = { kind: "booting" };
  let menuOpen = false;
  let destroyed = false;
  let relay2 = null;
  let seq = 0;
  let wasConnected = false;
  let lastProjectKey;
  let sessionDisconnected = false;
  const onDocClick = (e) => {
    if (menuOpen && !host.contains(e.target)) {
      menuOpen = false;
      render2();
    }
  };
  document.addEventListener("click", onDocClick);
  const initEvent = `${PROVIDER_GLOBAL}#initialized`;
  let lateWatching = false;
  const onLateInit = () => {
    lateWatching = false;
    window.removeEventListener(initEvent, onLateInit);
    if (!destroyed)
      void refresh();
  };
  function watchForLateProvider() {
    if (lateWatching || destroyed)
      return;
    lateWatching = true;
    window.addEventListener(initEvent, onLateInit);
  }
  function el2(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls)
      n.className = cls;
    if (text != null)
      n.textContent = text;
    return n;
  }
  async function refresh() {
    const my = ++seq;
    const r = await whenRelayReady(2500, { installUrl });
    if (destroyed || my !== seq)
      return;
    if (!(r instanceof Relay)) {
      watchForLateProvider();
      state2 = { kind: "not-installed", installUrl };
      return render2();
    }
    relay2 = r;
    subscribe(r);
    const h = await r.health();
    if (destroyed || my !== seq)
      return;
    if (h && !h.reachable) {
      state2 = { kind: "unreachable", appMissing: h.installedHere === false };
      emitTransition(false);
      return render2();
    }
    if (h && !h.paired) {
      state2 = { kind: "unpaired" };
      emitTransition(false);
      return render2();
    }
    let permErr = null;
    const grant = sessionDisconnected ? null : await r.permissions().catch((e) => {
      permErr = e;
      return null;
    });
    if (destroyed || my !== seq)
      return;
    if (!grant) {
      const rung = !h ? rungFromError(permErr) : null;
      if (rung) {
        state2 = rung;
        emitTransition(false);
        return render2();
      }
      state2 = { kind: "disconnected", relay: r };
      emitTransition(false);
      return render2();
    }
    const wantsContext = opts.context !== "none";
    const [user, project] = await Promise.all([
      r.identity(),
      wantsContext ? r.context.active().catch(() => null) : Promise.resolve(null)
    ]);
    if (destroyed || my !== seq)
      return;
    const wasAlreadyConnected = wasConnected;
    state2 = { kind: "connected", relay: r, user, project };
    emitTransition(true);
    const projKey = project ? project.id ?? project.name : null;
    if (wasAlreadyConnected && lastProjectKey !== void 0 && projKey !== lastProjectKey)
      opts.onProjectChange?.(project);
    lastProjectKey = projKey;
    render2();
  }
  function emitTransition(connected) {
    if (connected === wasConnected)
      return;
    wasConnected = connected;
    if (connected && relay2)
      opts.onConnect?.(relay2);
    else if (!connected)
      opts.onDisconnect?.();
  }
  let subscribed = false;
  function subscribe(r) {
    if (subscribed)
      return;
    subscribed = true;
    r.on("permissionsChanged", () => {
      void refresh();
    });
    r.on("disconnect", () => {
      void refresh();
    });
    r.on("health", () => {
      void refresh();
    });
  }
  async function doConnect() {
    if (!relay2)
      return;
    try {
      sessionDisconnected = false;
      await relay2.connect(opts.scope);
      await refresh();
    } catch (e) {
      const err = e;
      if (err?.code !== BYOPErrorCode.PROVIDER_UNAVAILABLE)
        return;
      await refresh();
      if (state2.kind === "disconnected") {
        const rung = rungFromError(err);
        if (rung) {
          state2 = rung;
          emitTransition(false);
          render2();
        }
      }
    }
  }
  async function doPick() {
    if (!relay2)
      return;
    menuOpen = false;
    render2();
    await relay2.context.pick().catch(() => null);
    await refresh();
  }
  async function doDisconnect() {
    if (!relay2)
      return;
    menuOpen = false;
    sessionDisconnected = true;
    await relay2.disconnect().catch(() => {
    });
    await refresh();
  }
  function render2() {
    if (destroyed)
      return;
    mount.textContent = "";
    if (state2.kind === "booting")
      return;
    if (state2.kind === "not-installed") {
      const url = state2.installUrl;
      const wrap2 = el2("div", "wrap");
      const b = el2("button", "btn get");
      b.append(el2("span", "glyph"), el2("span", void 0, "Get Switchboard"), el2("span", "arr", "\u2197"));
      b.onclick = (e) => {
        e.stopPropagation();
        menuOpen = !menuOpen;
        render2();
      };
      wrap2.append(b);
      if (menuOpen) {
        const menu = el2("div", "menu");
        menu.append(el2("div", "body", "Two parts: the Chrome extension, then Switchboard for Mac."));
        const store = el2("button", "item", "1 \xB7 Add to Chrome \u2197");
        store.onclick = () => {
          menuOpen = false;
          render2();
          window.open(CHROME_STORE_URL, "_blank", "noopener");
        };
        const guide = el2("button", "item", "2 \xB7 Get Switchboard for Mac \u2197");
        guide.onclick = () => {
          menuOpen = false;
          render2();
          window.open(url, "_blank", "noopener");
        };
        menu.append(store, guide);
        wrap2.append(menu);
      }
      mount.append(wrap2);
      return;
    }
    if (state2.kind === "unreachable") {
      const appMissing = state2.appMissing === true;
      const wrap2 = el2("div", "wrap");
      const b = el2("button", "btn get");
      b.append(el2("span", "glyph"), el2("span", void 0, appMissing ? "Get Switchboard for Mac" : "Your sidekick is asleep"), el2("span", appMissing ? "arr" : "dot", appMissing ? "\u2197" : void 0), ...appMissing ? [] : [el2("span", "caret", "\u25BE")]);
      b.onclick = (e) => {
        e.stopPropagation();
        menuOpen = !menuOpen;
        render2();
      };
      wrap2.append(b);
      if (menuOpen) {
        const menu = el2("div", "menu");
        if (appMissing) {
          menu.append(el2("div", "body", "Extension \u2713 \u2014 now the other half: Switchboard, the Mac app that holds your Claude."));
          const dl = el2("button", "item", "Download Switchboard.dmg \u2197");
          dl.onclick = () => {
            menuOpen = false;
            render2();
            window.open(RELAY_DMG_URL, "_blank", "noopener");
          };
          menu.append(dl, el2("div", "sep"));
        } else {
          menu.append(el2("div", "body", "Open the Switchboard menubar app to wake it."));
          const retry = el2("button", "item", "Retry");
          retry.onclick = () => {
            menuOpen = false;
            render2();
            void refresh();
          };
          menu.append(retry, el2("div", "sep"));
        }
        const setup = el2("button", "item", "New here? Full setup \u2197");
        setup.onclick = () => {
          menuOpen = false;
          render2();
          window.open(installUrl, "_blank", "noopener");
        };
        menu.append(setup);
        wrap2.append(menu);
      }
      mount.append(wrap2);
      return;
    }
    if (state2.kind === "unpaired") {
      const wrap2 = el2("div", "wrap");
      const b = el2("button", "btn connect");
      b.append(el2("span", "glyph"), el2("span", void 0, "Almost there \u2014 pair in the side panel"), el2("span", "caret", "\u25BE"));
      b.onclick = (e) => {
        e.stopPropagation();
        menuOpen = !menuOpen;
        render2();
      };
      wrap2.append(b);
      if (menuOpen) {
        const menu = el2("div", "menu");
        menu.append(el2("div", "body", "Click the Switchboard icon in your Chrome toolbar and paste your pairing token."));
        const retry = el2("button", "item", "Retry");
        retry.onclick = () => {
          menuOpen = false;
          render2();
          void refresh();
        };
        menu.append(retry);
        wrap2.append(menu);
      }
      mount.append(wrap2);
      return;
    }
    if (state2.kind === "disconnected") {
      const b = el2("button", "btn connect");
      b.append(el2("span", "glyph"), el2("span", void 0, "Connect Switchboard"));
      b.onclick = doConnect;
      mount.append(b);
      return;
    }
    const { user, project } = state2;
    const rawName = user?.name?.trim();
    const collides = !!rawName && !!project?.name && rawName.toLowerCase() === project.name.toLowerCase();
    const name = !rawName || collides ? "there" : rawName;
    const wrap = el2("div", "wrap");
    const chip = el2("button", "chip");
    const av = el2("div", "av");
    if (user?.avatar) {
      const img = el2("img");
      img.src = user.avatar;
      img.alt = name;
      av.append(img);
    } else
      av.textContent = name.charAt(0).toUpperCase();
    const wantsContext = opts.context !== "none";
    const who = el2("div", "who");
    who.append(el2("div", "hi", `Hi ${name}`));
    who.append(el2("div", "proj", wantsContext ? project ? project.name : "No context lent" : "Connected"));
    chip.append(av, who, el2("span", "caret", "\u25BE"));
    chip.onclick = (e) => {
      e.stopPropagation();
      menuOpen = !menuOpen;
      render2();
    };
    wrap.append(chip);
    if (menuOpen) {
      const menu = el2("div", "menu");
      if (wantsContext) {
        menu.append(el2("div", "lbl", "Working on"));
        const row = el2("button", "proj-row");
        row.append(el2("span", void 0, project ? project.name : "Choose a context"));
        row.append(el2("span", "go", project ? "Switch \u25B8" : "Choose \u25B8"));
        row.onclick = doPick;
        menu.append(row, el2("div", "sep"));
      }
      const dc = el2("button", "item", "Disconnect this app");
      dc.onclick = doDisconnect;
      menu.append(dc);
      menu.append(el2("div", "foot", "Connectors, budgets & activity live in the Switchboard toolbar panel."));
      wrap.append(menu);
    }
    mount.append(wrap);
  }
  render2();
  void refresh();
  return {
    refresh: () => void refresh(),
    destroy: () => {
      destroyed = true;
      document.removeEventListener("click", onDocClick);
      window.removeEventListener(initEvent, onLateInit);
      host.remove();
    }
  };
}

// ../../../../../packages/sdk/dist/index.js
var warnedStorageKeys = /* @__PURE__ */ new Set();
function warnBadStorageKey(key) {
  if (isValidStorageKey(key) || warnedStorageKeys.has(key))
    return;
  warnedStorageKeys.add(key);
  const suggestion = String(key).replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^[^A-Za-z0-9]+/, "") || "key";
  console.warn(`[relay.storage] invalid key ${JSON.stringify(key)} \u2014 this write/read WILL be rejected by the daemon and silently do nothing.
  Keys map 1:1 to files (<key>.json) in this origin's folder, so they must match ${STORAGE_KEY_RE}.
  ":" is not allowed (illegal on NTFS; "a:b" is Alternate Data Stream syntax on Windows). Try ${JSON.stringify(suggestion)}.`);
}
var Relay = class {
  provider;
  constructor(provider) {
    this.provider = provider;
  }
  get version() {
    return this.provider.version;
  }
  capabilities() {
    return this.provider.request({ method: "claude_capabilities" });
  }
  connect(scope) {
    return this.provider.request({ method: "claude_connect", params: scope });
  }
  /** Drop this app's connection for the current page session. The grant persists (a later connect()
   *  won't reprompt) — this is "disconnect from this tab", not "revoke". Full revoke lives in the panel. */
  disconnect() {
    return this.provider.request({ method: "claude_disconnect" });
  }
  permissions() {
    return this.provider.request({ method: "claude_permissions" });
  }
  /** The setup-ladder snapshot (reachable/paired/connected), answered by the EXTENSION from its
   *  own state — never the daemon — so it resolves fast (<1s) in every degraded state, including
   *  the ones where every other method would hang. Resolves null when the extension is too old to
   *  know `claude_health` (or its worker is unreachable): callers MUST treat null as "unknown"
   *  and fall back to probing permissions() exactly as before — that skew guard is load-bearing
   *  while store users run an older extension against newer app bundles. */
  health() {
    const answer = this.provider.request({ method: "claude_health" }).catch(() => null);
    const timer = new Promise((resolve) => setTimeout(() => resolve(null), 1500));
    return Promise.race([answer, timer]);
  }
  /** The paired user's public identity (name/avatar), or null if unavailable. Convenience over
   *  capabilities().user — what the connect chip greets with ("Hi Sameep"). */
  identity() {
    return this.capabilities().then((c) => c.user ?? null).catch(() => null);
  }
  /** Synthesize speech ON-DEVICE via a local model/engine (no cloud, no connector, no credits).
   *  Returns audio as a playable data: URL, or null if no local TTS is available.
   *
   *    const clip = await relay.speak("hey, it's Maya");
   *    if (clip) new Audio(clip.audio).play();
   */
  speak(text, opts) {
    return this.provider.request({ method: "claude_speak", params: { text, voice: opts?.voice } }).catch(() => null);
  }
  listTools() {
    return this.provider.request({ method: "claude_listTools" }).then((r) => r.tools);
  }
  callTool(name, args) {
    const call = { name, arguments: args };
    return this.provider.request({ method: "claude_callTool", params: call });
  }
  complete(params) {
    return this.provider.request({ method: "claude_complete", params });
  }
  /** Streamed completion as an async iterator of deltas. Ends after a `done`/`error` delta. */
  async *stream(params) {
    const { streamId } = await this.provider.request({ method: "claude_stream", params });
    const queue = [];
    let notify = null;
    let ended = false;
    const handler = (payload) => {
      const p = payload;
      if (p.streamId !== streamId)
        return;
      queue.push(p);
      if (p.type === "done" || p.type === "error")
        ended = true;
      notify?.();
    };
    this.provider.on("delta", handler);
    try {
      while (true) {
        if (queue.length === 0) {
          if (ended)
            break;
          await new Promise((r) => notify = r);
          notify = null;
          continue;
        }
        yield queue.shift();
      }
    } finally {
      this.provider.removeListener("delta", handler);
    }
  }
  on(event, handler) {
    this.provider.on(event, handler);
  }
  /**
   * Per-origin local storage — a private on-disk key/value store for this app, plus `bind` to point
   * it at a real folder the user picks. Values are opaque strings (store JSON). Isolated per origin;
   * reads are free, writes need the site not to be read-only, and `bind` prompts for the exact path.
   *
   *   await relay.storage.set("workspace", JSON.stringify(data));
   *   const raw = await relay.storage.get("workspace");
   *   await relay.storage.bind("~/Documents/Projects/brandbrain/.data"); // existing files appear as records
   */
  get storage() {
    const req = (params) => this.provider.request({ method: "claude_storage", params });
    const k = (key) => {
      warnBadStorageKey(key);
      return key;
    };
    return {
      get: (key) => req({ op: "get", key: k(key) }).then((r) => r.value ?? null),
      set: (key, value) => req({ op: "set", key: k(key), value }).then(() => void 0),
      delete: (key) => req({ op: "delete", key: k(key) }).then((r) => r.ok),
      list: () => req({ op: "list" }).then((r) => r.keys ?? []),
      info: () => req({ op: "info" }).then((r) => r.info),
      /** Point this app's store at a real folder (triggers a path-consent click). */
      bind: (path) => req({ op: "bind", path }).then((r) => r.info),
      /** Open a NATIVE folder chooser on the daemon's machine (macOS today). The user picking a
       *  folder in an OS dialog that names this origin IS the path consent, so a successful pick
       *  comes back already bound. Resolves undefined on cancel or when no native picker exists —
       *  keep a typed-path `bind` as the fallback UI. */
      pick: (reason) => req({ op: "pick", reason }).then((r) => r.info).catch(() => void 0)
    };
  }
  /**
   * Shared, cross-app context — your portable brand knowledge. Publish a whole context; read the one
   * the user selected for this app; or open the picker. Selection happens in the side panel, so an
   * app only ever receives the context the user chose to lend it — never the whole library.
   *
   *   await relay.context.publish({ name: "Aamras", kind: "brand", data: brand });
   *   const active = await relay.context.active();   // the brand the user loaded for this app, or null
   */
  get context() {
    const req = (params) => this.provider.request({ method: "claude_context", params });
    return {
      publish: (context) => req({ op: "publish", context }).then((r) => r.id),
      list: () => req({ op: "list" }).then((r) => r.contexts ?? []),
      active: () => req({ op: "active" }).then((r) => r.context ?? null),
      pick: () => req({ op: "pick" }).then((r) => r.context ?? null),
      /** Read ONE context listed via `list()` in full, and make it this app's selection. Needs the
       *  kind granted at connect (ScopeRequest.contextKinds) — powers in-app brand dropdowns. */
      use: (id) => req({ op: "use", id }).then((r) => r.context ?? null)
    };
  }
};
var DEFAULT_INSTALL_URL = "https://thelastprompt.ai/switchboard/";
function getRelay(opts) {
  const provider = globalThis[PROVIDER_GLOBAL];
  if (provider?.isRelay)
    return new Relay(provider);
  return { installed: false, installUrl: opts?.installUrl ?? DEFAULT_INSTALL_URL };
}
function whenRelayReady(timeoutMs = 3e3, opts) {
  const now = getRelay(opts);
  if (now instanceof Relay)
    return Promise.resolve(now);
  return new Promise((resolve) => {
    const onInit = () => {
      cleanup();
      resolve(getRelay(opts));
    };
    const timer = setTimeout(() => {
      cleanup();
      resolve({ installed: false, installUrl: opts?.installUrl ?? DEFAULT_INSTALL_URL });
    }, timeoutMs);
    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener(`${PROVIDER_GLOBAL}#initialized`, onInit);
    }
    window.addEventListener(`${PROVIDER_GLOBAL}#initialized`, onInit);
  });
}

// src/marquee.js
var HIGGSFIELD = "mcp__claude_ai_Higgsfield__*";
var APP = {
  id: "marquee",
  name: "Marquee",
  installUrl: "https://thelastprompt.ai/switchboard/",
  scope: {
    reason: "Marquee \u2014 generates a cinematic scrolling landing page on your own Claude + Higgsfield, and edits it in place",
    models: ["sonnet"],
    tools: [HIGGSFIELD],
    contextKinds: ["brand"]
  },
  usesContext: "single"
};
var $ = (id) => document.getElementById(id);
var el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};
var uid = () => Math.random().toString(36).slice(2, 9);
var msg = (e) => String(e?.message || e).slice(0, 160);
var toastT = null;
function toast(text, err) {
  clearTimeout(toastT);
  let t = document.querySelector(".toast");
  if (!t) {
    t = el("div", "toast");
    document.body.append(t);
  }
  t.className = "toast" + (err ? " err" : "");
  t.textContent = text;
  toastT = setTimeout(() => t.remove(), 3200);
}
var relay = null;
var notInstalled = false;
var brand = null;
var wired = false;
mountConnect($("chip-dock"), {
  scope: APP.scope,
  context: APP.usesContext,
  installUrl: APP.installUrl,
  onConnect: (r) => {
    relay = r;
    wire(r);
    void onReady();
  },
  onDisconnect: () => {
    relay = null;
    render();
  },
  onProjectChange: () => {
    void syncContext();
  }
});
(async () => {
  const r = await whenRelayReady(2e3, { installUrl: APP.installUrl });
  if (r && "connect" in r) {
    const grant = await r.permissions().catch(() => null);
    if (grant) {
      relay = r;
      wire(r);
      void onReady();
      return;
    }
  } else if (r && r.installed === false) notInstalled = true;
  render();
})();
function wire(r) {
  if (wired) return;
  wired = true;
  r.on("permissionsChanged", () => void syncContext());
}
var hydrated = false;
async function onReady() {
  await syncContext();
  if (!hydrated) {
    hydrated = true;
    await loadState();
  }
  render();
  autostart();
}
async function syncContext() {
  if (!relay) return;
  if (APP.usesContext === "single") brand = await relay.context.active().catch(() => null);
  render();
}
var state = { run: null };
async function loadState() {
  try {
    const raw = await relay.storage.get(APP.id + "-state");
    if (raw) state = JSON.parse(raw);
  } catch {
    state = { run: null };
  }
}
async function saveState() {
  try {
    await relay.storage.set(APP.id + "-state", JSON.stringify(state));
  } catch {
  }
}
var STREAM_TIMEOUT_MS = 18e4;
async function streamText(params, onProgress) {
  const it = relay.stream(params);
  let text = "", settled = false, timer = null;
  try {
    return await Promise.race([
      (async () => {
        for await (const d of it) {
          if (d.type === "text") {
            text += d.text;
            onProgress && onProgress({ text });
          } else if (d.type === "tool_proposed") {
            onProgress && onProgress({ tool: d.call?.name });
          } else if (d.type === "error") throw new Error(d.error?.message || "stream error");
        }
        settled = true;
        return text;
      })(),
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          if (settled) return;
          try {
            it.return?.();
          } catch {
          }
          reject(new Error("Switchboard didn't respond \u2014 is the sidekick running? Reload this tab and try again."));
        }, STREAM_TIMEOUT_MS);
      })
    ]);
  } finally {
    clearTimeout(timer);
  }
}
async function askJson(parts) {
  return parseJson(await streamText({ prompt: parts.filter(Boolean).join("\n\n") }));
}
function parseJson(text) {
  const t = String(text || "").replace(/```[a-z]*\n?/gi, "").trim();
  const s = t.indexOf("{"), e = t.lastIndexOf("}");
  if (s === -1 || e <= s) return null;
  try {
    return JSON.parse(t.slice(s, e + 1));
  } catch {
    return null;
  }
}
var IMG_URL_RE = /(https?:\/\/[^\s"')]+\.(?:png|jpe?g|webp))|"(?:rawUrl|url|minUrl)"\s*:\s*"([^"]+)"/i;
async function genImage(promptText) {
  const instruction = `Use the Higgsfield generate_image tool to generate an image of: "${promptText}", aspect_ratio "16:9". Wait for it to finish (poll job status if needed), then reply with ONLY the final image URL on its own line.`;
  let url = null, acc = "";
  for await (const d of relay.stream({ prompt: instruction, agentic: true })) {
    if (d.type === "tool_result" && d.result?.ok) {
      const t = (d.result.content ?? []).map((x) => x.text ?? "").join("");
      const m = t.match(IMG_URL_RE);
      if (m) url = m[1] || m[2] || m[0];
    } else if (d.type === "text") acc += d.text;
    else if (d.type === "error") throw new Error(d.error.message);
  }
  if (!url) {
    const m = acc.match(IMG_URL_RE);
    if (m) url = m[1] || m[2] || m[0];
  }
  return url;
}
function researching(status) {
  const r = el("div", "researching");
  r.append(el("div", "scan"), el("span", null, status || "working\u2026"));
  return r;
}
function connectSteps() {
  const card = el("div", "steps-card");
  const steps = el("div", "steps");
  const s1 = el("div");
  s1.innerHTML = notInstalled ? "<b>1</b> \xB7 Install Switchboard (button, top-right)" : "<b>1</b> \xB7 Connect Switchboard (top-right) \u2014 lends this page your Claude";
  const s2 = el("div");
  s2.innerHTML = "<b>2</b> \xB7 One line in \u2014 the pipeline runs itself";
  const s3 = el("div");
  s3.innerHTML = "<b>3</b> \xB7 Pick a card, steer anywhere, keep what you like";
  steps.append(s1, s2, s3);
  card.append(steps);
  return card;
}
var running = false;
function autostart() {
  if (state.run) {
    state.run.status = "";
    render();
    return;
  }
  if (brand) {
    const seed = "a landing page for " + brand.name + (brand.data?.positioning ? " \u2014 " + brand.data.positioning : "");
    void start(seed);
  }
}
async function start(input) {
  if (!relay || running) return;
  input = String(input || "").trim();
  if (!input) {
    toast("One line on the page first.", true);
    return;
  }
  state.run = { id: uid(), input, html: "", edits: [], status: "", error: null, heroUrl: null };
  await saveState();
  render();
  await generate();
}
async function generate() {
  const r = state.run;
  if (!r || !relay) return;
  running = true;
  r.error = null;
  r.status = "writing the page\u2026";
  render();
  try {
    const html = await streamText({
      prompt: [
        "You are Marquee, writing a complete, cinematic, SCROLL-DRIVEN landing page as a single self-contained HTML document (inline CSS + a little inline JS; no external files except fonts from Google Fonts).",
        `THE BRIEF: "${r.input}"`,
        brand ? `LENT BRAND "${brand.name}" \u2014 match its voice, and use its palette: ${JSON.stringify(brand.data?.palette || brand.data).slice(0, 1200)}` : "",
        'Requirements: 5\u20137 FULL-VIEWPORT (100vh) sections stacked vertically; each reveals on scroll (IntersectionObserver toggling a class, with CSS transitions \u2014 fade + rise). Big display type, generous whitespace, one accent color, a sticky mini-nav, a final call-to-action. Feel: premium, editorial, a little dreamy \u2014 like a landing page that plays like a video as you scroll. Use a placeholder hero with id="hero-img" (a full-bleed <div> with a background gradient) that a real image can later replace. NO lorem ipsum \u2014 write real copy from the brief.',
        "Return ONLY the HTML document, starting with <!doctype html>. No prose, no fences."
      ].filter(Boolean).join("\n\n"),
      maxTokens: 8e3
    }, (p) => {
      if (p.text) {
        r.html = p.text;
        const fr = $("mq-frame");
        if (fr && p.text.length % 400 < 40) fr.srcdoc = stripFences(p.text);
      }
    });
    r.html = stripFences(r.html);
    if (!/<[a-z]/i.test(r.html)) throw new Error("the page didn't come back as HTML \u2014 try again");
  } catch (e) {
    r.error = msg(e);
  } finally {
    running = false;
    r.status = "";
    await saveState();
    render();
  }
  if (r.html && !r.error && !r.heroUrl) void paintHero();
}
async function paintHero() {
  const r = state.run;
  if (!r || !relay || !r.html.includes("hero-img")) return;
  r.status = "painting the hero on your Higgsfield\u2026";
  render();
  try {
    const url = await genImage(`Cinematic full-bleed hero image for a landing page: ${r.input}. Atmospheric, premium, no text.${brand?.data?.palette ? " Palette: " + brand.data.palette.slice(0, 3).join(", ") : ""}`);
    if (url) {
      const next = r.html.replace(/(id=["']hero-img["'][^>]*style=["'][^"']*)/i, `$1;background-image:url('${url}');background-size:cover;background-position:center`);
      if (next !== r.html) {
        r.html = next;
        r.heroUrl = url;
      } else {
        r.heroUrl = url;
        toast("Hero painted \u2014 add it via a refine if it didn't land.");
      }
    }
  } catch {
  }
  r.status = "";
  await saveState();
  render();
}
async function refine(instruction) {
  const r = state.run;
  if (!r || !relay || running) return;
  instruction = String(instruction || "").trim();
  if (!instruction) return;
  running = true;
  r.error = null;
  r.status = "editing the page\u2026";
  render();
  try {
    const out = await askJson([
      "You edit a landing page's HTML by returning ONE find/replace. The FIND must be an EXACT unique substring of the SOURCE.",
      `THE CHANGE THE FOUNDER WANTS: "${instruction}"`,
      'Return ONLY JSON: {"find":<exact unique substring to change, \u2264400 chars>,"replace":<the edited substring>}. If the change needs more than one edit, make the single most impactful one.',
      "SOURCE:\n" + r.html.slice(0, 12e3)
    ]);
    if (!out || !out.find || out.replace == null) throw new Error("no edit came back \u2014 rephrase");
    const applied = applyEdit(r.html, out.find, out.replace);
    if (!applied.ok) throw new Error("couldn't place that edit \u2014 try describing it differently");
    r.html = applied.next;
    r.edits.push(instruction);
  } catch (e) {
    r.error = msg(e);
  } finally {
    running = false;
    r.status = "";
    await saveState();
    render();
  }
}
function applyEdit(html, find, replace) {
  if (typeof find !== "string" || !find) return { ok: false };
  const first = html.indexOf(find);
  if (first !== -1 && html.indexOf(find, first + find.length) === -1) return { ok: true, next: html.slice(0, first) + replace + html.slice(first + find.length) };
  const pat = find.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  try {
    const re = new RegExp(pat, "g");
    const m = html.match(re);
    if (m && m.length === 1) {
      const x = new RegExp(pat).exec(html);
      return { ok: true, next: html.slice(0, x.index) + replace + html.slice(x.index + x[0].length) };
    }
  } catch {
  }
  return { ok: false };
}
function stripFences(s) {
  return String(s || "").replace(/^```[a-z]*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
}
function download() {
  const r = state.run;
  if (!r?.html) return;
  const blob = new Blob([r.html], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "landing.html";
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5e3);
}
function render() {
  const hero = $("hero"), view = $("view");
  const r = state.run;
  hero.hidden = !!r;
  view.textContent = "";
  if (!relay) {
    view.append(connectSteps());
    return;
  }
  if (!r) {
    const startBox = el("div", "start");
    if (brand) startBox.append(el("div", "ctx", "page for your lent brand \u2014 " + brand.name));
    const row = el("div", "bindrow");
    const input = el("input");
    input.placeholder = "one line \u2014 what's the landing page for?";
    const go = () => {
      if (input.value.trim()) void start(input.value);
    };
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") go();
    });
    const btn = el("button", "primary", "Build the page \u25B8");
    btn.onclick = go;
    row.append(input, btn);
    startBox.append(row);
    view.append(startBox);
    setTimeout(() => input.focus(), 30);
    return;
  }
  const bar = el("div", "runbar");
  bar.append(el("span", "kicker", "page"), el("span", "run-input", r.input), el("span", "grow"));
  if (r.html && !running) {
    const rg = el("button", "act", "\u21BB regenerate");
    rg.onclick = () => void generate();
    bar.append(rg);
    const dl = el("button", "act", "\u2B07 download .html");
    dl.onclick = download;
    bar.append(dl);
  }
  const nu = el("button", "act", "\xD7 new");
  nu.onclick = () => {
    state.run = null;
    void saveState();
    render();
  };
  bar.append(nu);
  view.append(bar);
  if (r.status) view.append(researching(r.status));
  if (r.error) {
    view.append(el("div", "err", r.error));
  }
  const wrap = el("div", "mq-wrap");
  const frame = el("iframe");
  frame.id = "mq-frame";
  frame.className = "mq-frame";
  frame.setAttribute("sandbox", "allow-scripts allow-same-origin");
  if (r.html) frame.srcdoc = r.html;
  wrap.append(frame);
  view.append(wrap);
  if (r.html && !running) {
    view.append(el("div", "kicker sect", "refine it \u2014 describe any change"));
    const refBox = el("div", "bindrow");
    const input = el("input");
    input.placeholder = "e.g. make the headline bigger and the hero darker";
    const go = () => {
      const t = input.value.trim();
      if (t) {
        input.value = "";
        void refine(t);
      }
    };
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") go();
    });
    const b = el("button", "primary", "Edit");
    b.onclick = go;
    refBox.append(input, b);
    view.append(refBox);
    if (r.edits.length) {
      const log = el("div", "mq-edits");
      log.textContent = "edits: " + r.edits.slice(-4).join(" \xB7 ");
      view.append(log);
    }
  }
}
render();
//# sourceMappingURL=marquee.js.map
