// Museo – realistic Grand Museum room (three.js r160, Poly Haven CC0 assets)
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const $ = (id) => document.getElementById(id);
const stage = $('stage');
const mobile = matchMedia('(max-width:700px)').matches || /Mobi|Android|iPhone/i.test(navigator.userAgent);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------- renderer / scene ----------------
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile ? 1.5 : 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
stage.prepend(renderer.domElement);
RectAreaLightUniformsLib.init();

const scene = new THREE.Scene();
scene.background = new THREE.Color('#1c2420');
const cam = new THREE.PerspectiveCamera(55, 1, 0.05, 80);

const W = 8, L = 20, H = 5.6;
const manager = new THREE.LoadingManager();
manager.onProgress = (_u, done, total) => { $('loadpct').textContent = Math.round((done / total) * 100) + '%'; };
const texLoader = new THREE.TextureLoader(manager);
const gltfLoader = new GLTFLoader(manager);
const hdrLoader = new RGBELoader(manager);
const pmrem = new THREE.PMREMGenerator(renderer);

function tex(path, rx, ry, srgb) {
  const t = texLoader.load(path);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); t.anisotropy = 8;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function pbr(dir, rx, ry, opts = {}) {
  return new THREE.MeshStandardMaterial({
    map: tex(dir + '/diff.jpg', rx, ry, true),
    normalMap: tex(dir + '/nor.jpg', rx, ry),
    roughnessMap: tex(dir + '/rough.jpg', rx, ry),
    ...opts,
  });
}

// ---------------- lighting environment ----------------
// HDR lighting is stored as base64 inside JSON so it can be served with the page
manager.itemStart('hdri');
fetch('assets/hdri/museum_of_ethnography_1k.json').then((r) => r.json()).then((j) => {
  const bin = Uint8Array.from(atob(j.data), (c) => c.charCodeAt(0));
  const d = hdrLoader.parse(bin.buffer);
  const hdr = new THREE.DataTexture(d.data, d.width, d.height, THREE.RGBAFormat, d.type);
  hdr.colorSpace = THREE.LinearSRGBColorSpace; hdr.minFilter = hdr.magFilter = THREE.LinearFilter; hdr.generateMipmaps = false; hdr.flipY = true;
  hdr.mapping = THREE.EquirectangularReflectionMapping; hdr.needsUpdate = true;
  scene.environment = pmrem.fromEquirectangular(hdr).texture; hdr.dispose();
}).catch(() => {}).finally(() => manager.itemEnd('hdri'));

// ---------------- architecture ----------------
const room = new THREE.Group(); scene.add(room);
const plasterDir = 'assets/textures/painted_plaster_wall';
const marbleDir = 'assets/textures/marble_tiles';
const creamPaint = new THREE.MeshStandardMaterial({ color: '#F1ECE2', roughness: 0.5 });
const gilt = new THREE.MeshStandardMaterial({ color: '#C9A24B', metalness: 1, roughness: 0.28 });

// polished marble floor = real mirror reflection + translucent marble on top
const reflector = new Reflector(new THREE.PlaneGeometry(W, L), {
  textureWidth: Math.round(innerWidth * (mobile ? 0.5 : 0.8)),
  textureHeight: Math.round(innerHeight * (mobile ? 0.5 : 0.8)),
  color: 0x9a9a9a,
});
reflector.rotation.x = -Math.PI / 2; reflector.position.y = -0.002; room.add(reflector);
const floorMat = pbr(marbleDir, W / 3.6, L / 3.6, { transparent: true, opacity: 0.86, roughness: 0.9 });
const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, L), floorMat);
floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; room.add(floor);

function wall(len, x, z, ry) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry;
  const upper = pbr(plasterDir, len / 2.5, (H - 1.15) / 2.5, { color: '#5E8170' });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(len, H - 1.15), upper);
  m.position.y = 1.15 + (H - 1.15) / 2; m.receiveShadow = true; g.add(m);
  const lower = pbr(plasterDir, len / 2.5, 0.5, { color: '#3F5A4D' });
  const wn = new THREE.Mesh(new THREE.BoxGeometry(len, 1.15, 0.05), lower); wn.position.set(0, 0.575, 0.025); wn.receiveShadow = true; g.add(wn);
  const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 0.07, 0.09), creamPaint); rail.position.set(0, 1.15, 0.045); g.add(rail);
  const rail2 = new THREE.Mesh(new THREE.BoxGeometry(len, 0.025, 0.1), gilt); rail2.position.set(0, 1.105, 0.05); g.add(rail2);
  const sk = new THREE.Mesh(new THREE.BoxGeometry(len, 0.2, 0.07), creamPaint); sk.position.set(0, 0.1, 0.035); g.add(sk);
  const cr1 = new THREE.Mesh(new THREE.BoxGeometry(len, 0.3, 0.12), creamPaint); cr1.position.set(0, H - 0.15, 0.06); g.add(cr1);
  const cr2 = new THREE.Mesh(new THREE.BoxGeometry(len, 0.08, 0.22), creamPaint); cr2.position.set(0, H - 0.34, 0.11); g.add(cr2);
  const cr3 = new THREE.Mesh(new THREE.BoxGeometry(len, 0.03, 0.24), gilt); cr3.position.set(0, H - 0.4, 0.12); g.add(cr3);
  room.add(g);
}
wall(L, -W / 2, 0, Math.PI / 2); wall(L, W / 2, 0, -Math.PI / 2); wall(W, 0, -L / 2, 0); wall(W, 0, L / 2, Math.PI);

// coffered ceiling with long skylight
const ceilMat = new THREE.MeshStandardMaterial({ color: '#F4F0E8', roughness: 0.9 });
const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W, L), ceilMat); ceil.rotation.x = Math.PI / 2; ceil.position.y = H; room.add(ceil);
const skyW = 2.6, skyL = L - 5;
const sky = new THREE.Mesh(new THREE.PlaneGeometry(skyW, skyL), new THREE.MeshBasicMaterial({ color: '#FFF8EA' }));
sky.rotation.x = Math.PI / 2; sky.position.y = H - 0.004; room.add(sky);
for (let z = -skyL / 2; z <= skyL / 2 + 0.01; z += skyL / 6) { const b = new THREE.Mesh(new THREE.BoxGeometry(skyW + 0.3, 0.16, 0.12), creamPaint); b.position.set(0, H - 0.08, z); room.add(b); }
for (const x of [-skyW / 2, 0, skyW / 2]) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, skyL), creamPaint); b.position.set(x, H - 0.08, 0); room.add(b); }
for (const x of [-W / 2 + 1.1, W / 2 - 1.1]) for (let z = -L / 2 + 1; z <= L / 2 - 1; z += 2.25) { const c = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.12, 1.6), creamPaint); c.position.set(x, H - 0.06, z); room.add(c); }
const skyLight = new THREE.RectAreaLight('#FFF3E0', 4.5, skyW, skyL); skyLight.position.set(0, H - 0.05, 0); skyLight.rotation.x = -Math.PI / 2; room.add(skyLight);
room.add(new THREE.HemisphereLight('#fffaf2', '#a59a88', 0.45));
const sun = new THREE.DirectionalLight('#fff2dc', 1.1); sun.position.set(0.8, H + 6, 1.5); sun.target.position.set(0, 0, 0);
sun.castShadow = true; sun.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
Object.assign(sun.shadow.camera, { left: -W / 2, right: W / 2, top: L / 2, bottom: -L / 2, near: 1, far: 20 }); sun.shadow.bias = -0.0005; sun.shadow.radius = 6;
room.add(sun, sun.target);

// columns
const colMat = new THREE.MeshStandardMaterial({ color: '#EEE6D4', roughness: 0.35 });
for (const z of [-7.2, -3.6, 0, 3.6, 7.2]) for (const s of [-1, 1]) {
  const x = s * (W / 2 - 0.35);
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.23, H - 0.95, 40), colMat); shaft.position.set(x, 0.45 + (H - 0.95) / 2, z); shaft.castShadow = true; room.add(shaft);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.45, 0.62), colMat); base.position.set(x, 0.225, z); base.castShadow = true; room.add(base);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.235, 0.035, 12, 40), colMat); ring.rotation.x = Math.PI / 2; ring.position.set(x, 0.5, z); room.add(ring);
  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.22, 0.6), colMat); cap.position.set(x, H - 0.61, z); room.add(cap);
  const cap2 = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.06, 0.66), gilt); cap2.position.set(x, H - 0.48, z); room.add(cap2);
}

// ---------------- artworks ----------------
const examples = [
  ['Alps, first hike', '12/06/2021'], ['Autumn walk', '24/10/2020'], ['Beach at sunrise', '03/08/2019'],
  ['Evening by the harbour', '14/12/2022'], ['Frozen lake', '30/01/2023'], ['Hills at sunset', '08/08/2020'],
  ['Love-lock bridge', '14/02/2025'], ['Spring flowers', '02/04/2024'], ['Where it all began', '21/02/2018'],
];
const art = examples.map(([title, date], i) => ({ title, date, kind: 'Example photo', src: `assets/photos/p${i + 1}.jpg` }));
const FZ = [-5.4, -1.8, 1.8, 5.4];
const slots = [...FZ.map((z) => ({ x: -W / 2, z, ry: Math.PI / 2 })), ...FZ.map((z) => ({ x: W / 2, z, ry: -Math.PI / 2 })), { x: 0, z: -L / 2, ry: 0, big: true }];
const pictures = []; // canvas meshes
const labelMeshes = [];

function photoTexture(img, aspect) { // cover-fit into the canvas aspect
  const c = document.createElement('canvas'); const h = 1200; const w = Math.round(h * aspect); c.width = w; c.height = h;
  const g = c.getContext('2d'); const s = Math.max(w / img.width, h / img.height); const dw = img.width * s, dh = img.height * s;
  g.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
function labelTexture(a) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 200; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 512, 200); gr.addColorStop(0, '#d9b965'); gr.addColorStop(.5, '#f0d58b'); gr.addColorStop(1, '#b8913f');
  g.fillStyle = gr; g.fillRect(0, 0, 512, 200); g.strokeStyle = 'rgba(70,50,15,.6)'; g.lineWidth = 6; g.strokeRect(10, 10, 492, 180);
  g.fillStyle = '#3a2a10'; g.font = '600 44px Inter, Georgia, serif'; g.fillText(a.title.slice(0, 22), 34, 92);
  g.font = 'italic 32px Georgia, serif'; g.fillText(a.date, 34, 148);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function setArt(i) {
  const pic = pictures[i]; if (!pic) return; const a = art[i];
  const apply = (img) => { if (pic.material.map) pic.material.map.dispose(); pic.material.map = photoTexture(img, pic.userData.aspect); pic.material.color.set('#ffffff'); pic.material.needsUpdate = true; };
  if (a.img) apply(a.img); else { const im = new Image(); im.onload = () => { a.img = im; apply(im); }; im.src = a.src; }
  const lbl = labelMeshes[i]; if (lbl) { lbl.material.map?.dispose(); lbl.material.map = labelTexture(a); lbl.material.needsUpdate = true; }
}

gltfLoader.load('assets/models/fancy_picture_frame_02/fancy_picture_frame_02.json', (gltf) => {
  const base = gltf.scene;
  slots.forEach((s, i) => {
    const f = base.clone(true);
    let canvasMesh = null;
    f.traverse((o) => { if (o.isMesh) { o.castShadow = true; if (/canvas/i.test(o.material.name)) canvasMesh = o; else { o.material = o.material.clone(); o.material.envMapIntensity = 1.2; } } });
    canvasMesh.material = new THREE.MeshStandardMaterial({ roughness: 0.45, color: '#ddd' });
    canvasMesh.geometry.computeBoundingBox(); const bb = canvasMesh.geometry.boundingBox;
    canvasMesh.userData = { idx: i, big: !!s.big, aspect: (bb.max.x - bb.min.x) / (bb.max.y - bb.min.y) };
    const g = new THREE.Group(); g.add(f);
    const sc = s.big ? 4.3 : 2.7; f.scale.setScalar(sc);
    const y = s.big ? 2.75 : 2.15;
    g.position.set(s.x + (s.ry === 0 ? 0 : (s.x < 0 ? 0.01 : -0.01)), y, s.z + (s.ry === 0 ? 0.01 : 0)); g.rotation.y = s.ry; room.add(g);
    canvasMesh.userData.group = g; pictures[i] = canvasMesh;
    // brass museum label
    const lbl = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.133), new THREE.MeshStandardMaterial({ metalness: 0.75, roughness: 0.32 }));
    lbl.position.set((s.big ? 1.65 : 1.12), (s.big ? -1.25 : -0.75), 0.012); g.add(lbl); labelMeshes[i] = lbl;
    // picture light (real spotlight from the ceiling)
    const out = s.big ? 2.6 : 1.7;
    const n = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), s.ry);
    const spot = new THREE.SpotLight('#FFE6C4', s.big ? 90 : 45, 0, s.big ? 0.5 : 0.4, 0.75, 2);
    spot.position.copy(g.position).addScaledVector(n, out).setY(H - 0.35);
    spot.target.position.copy(g.position);
    if (s.big) { spot.castShadow = true; spot.shadow.mapSize.set(1024, 1024); spot.shadow.bias = -0.0004; }
    room.add(spot, spot.target);
    setArt(i);
  });
});

// ---------------- furniture & objects ----------------
function place(path, setup) { gltfLoader.load(path, (g) => { g.scene.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); setup(g.scene); }); }
place('assets/models/Ottoman_01/Ottoman_01.json', (m) => {
  for (const z of [-2.2, 3.4]) { const c = m.clone(true); c.scale.setScalar(1.55); c.rotation.y = Math.PI / 2; c.position.set(0, 0, z); room.add(c); }
});
const pedMat = new THREE.MeshStandardMaterial({ color: '#F1ECE2', roughness: 0.3 });
function pedestal(x, z, h) {
  const p = new THREE.Mesh(new THREE.BoxGeometry(0.5, h, 0.5), pedMat); p.position.set(x, h / 2, z); p.castShadow = p.receiveShadow = true; room.add(p);
  const t = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.05, 0.58), pedMat); t.position.set(x, h + 0.025, z); t.castShadow = true; room.add(t);
  return h + 0.05;
}
place('assets/models/marble_bust_01/marble_bust_01.json', (m) => {
  for (const [x, ry] of [[-2.7, 0.5], [2.7, -0.5]]) { const top = pedestal(x, -L / 2 + 1.7, 1.15); const c = m.clone(true); c.scale.setScalar(1.6); c.rotation.y = ry; c.position.set(x, top, -L / 2 + 1.7); room.add(c);
    const s = new THREE.SpotLight('#FFE6C4', 25, 0, 0.3, 0.8, 2); s.position.set(x * 0.6, H - 0.4, -L / 2 + 3.2); s.target.position.set(x, top + 0.4, -L / 2 + 1.7); room.add(s, s.target); }
});
place('assets/models/antique_ceramic_vase_01/antique_ceramic_vase_01.json', (m) => {
  for (const x of [-2.9, 2.9]) { const top = pedestal(x, 8.2, 0.95); const c = m.clone(true); c.scale.setScalar(1.5); c.position.set(x, top, 8.2); room.add(c); }
});
place('assets/models/Chandelier_01/Chandelier_01.json', (m) => {
  m.traverse((o) => { if (o.isMesh && Array.isArray(o.material) === false && /lamp/i.test(o.material.name)) { o.material = o.material.clone(); o.material.emissive = new THREE.Color('#FFD9A0'); o.material.emissiveIntensity = 2.2; } });
  for (const z of [-5.4, 5.4]) { const c = m.clone(true); c.scale.setScalar(1.7); c.position.set(0, H - 0.02, z); room.add(c);
    const pl = new THREE.PointLight('#FFD9A8', 18, 14, 2); pl.position.set(0, H - 1.1, z); room.add(pl); }
});
// velvet rope barrier in front of the main painting
const brassPost = new THREE.MeshStandardMaterial({ color: '#C9A24B', metalness: 1, roughness: 0.22 });
const rz = -L / 2 + 1.25;
for (const x of [-1.6, 0, 1.6]) {
  const p = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.95, 24), brassPost); p.position.set(x, 0.5, rz); p.castShadow = true; room.add(p);
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.19, 0.05, 40), brassPost); b.position.set(x, 0.025, rz); room.add(b);
  const t = new THREE.Mesh(new THREE.SphereGeometry(0.06, 24, 16), brassPost); t.position.set(x, 1, rz); room.add(t);
}
const velvet = new THREE.MeshStandardMaterial({ color: '#5E0F1C', roughness: 0.85 });
for (const [a, b] of [[-1.6, 0], [0, 1.6]]) {
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(a, 0.95, rz), new THREE.Vector3((a + b) / 2, 0.7, rz), new THREE.Vector3(b, 0.95, rz)]);
  const r = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.028, 12), velvet); r.castShadow = true; room.add(r);
}

// ---------------- post-processing ----------------
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, cam));
const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.22, 0.5, 0.92); composer.addPass(bloom);
composer.addPass(new OutputPass());

// ---------------- camera & walking ----------------
const START = new THREE.Vector3(0, 1.62, L / 2 - 0.8);
const pos = START.clone(); let yaw = 0, pitch = -0.02; let vel = 0, turn = 0;
let focus = null, tween = null;
function clampPos() { pos.x = Math.max(-W / 2 + 0.8, Math.min(W / 2 - 0.8, pos.x)); pos.z = Math.max(-L / 2 + 2.1, Math.min(L / 2 - 0.6, pos.z)); }
function setCam(t) { cam.position.copy(pos); cam.position.y += Math.sin(t * 6.5) * 0.008 * Math.min(1, Math.abs(vel)); cam.rotation.set(0, 0, 0); cam.rotateY(yaw); cam.rotateX(pitch); }
function nearAngle(a, b) { while (b - a > Math.PI) b -= 2 * Math.PI; while (b - a < -Math.PI) b += 2 * Math.PI; return b; }
function entrance() { pos.copy(START); yaw = 0; pitch = -0.02; if (!reduce) tween = { from: { p: pos.clone(), y: 0, pi: -0.02 }, to: { p: new THREE.Vector3(0, 1.62, L / 2 - 3), y: 0, pi: 0 }, t: 0, dur: 3.2 }; }

const keys = {}; const hold = { f: 0, b: 0, l: 0, r: 0 };
const inView = () => { const r = stage.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; };
addEventListener('keydown', (e) => { if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code) && inView()) { keys[e.code] = 1; e.preventDefault(); exitFocus(); } });
addEventListener('keyup', (e) => { keys[e.code] = 0; });
function bindHold(id, k) { const b = $(id); const on = (e) => { e.preventDefault(); hold[k] = 1; exitFocus(); hideHint(); }; const off = () => (hold[k] = 0); b.addEventListener('pointerdown', on); ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => b.addEventListener(ev, off)); }
bindHold('cF', 'f'); bindHold('cB', 'b'); bindHold('cL', 'l'); bindHold('cR', 'r');
const el = renderer.domElement; let drag = null;
el.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, y: e.clientY, yaw, pitch, moved: 0 }; el.setPointerCapture(e.pointerId); });
el.addEventListener('pointermove', (e) => { if (!drag || focus || tween) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.moved = Math.max(drag.moved, Math.abs(dx) + Math.abs(dy)); yaw = drag.yaw + dx * 0.0042; pitch = Math.max(-0.45, Math.min(0.45, drag.pitch + dy * 0.0035)); if (drag.moved > 6) hideHint(); });
el.addEventListener('pointerup', (e) => { if (drag && drag.moved < 8) tap(e); drag = null; });
const ray = new THREE.Raycaster();
function tap(e) { const r = el.getBoundingClientRect(); ray.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), cam); const hit = ray.intersectObjects(pictures.filter(Boolean))[0]; if (hit) focusOn(hit.object); else exitFocus(); }
function focusOn(pic) {
  hideHint(); const g = pic.userData.group; const n = new THREE.Vector3(0, 0, 1).applyQuaternion(g.quaternion); const dist = pic.userData.big ? 4.2 : 2.5;
  const to = g.position.clone().addScaledVector(n, dist); to.y = 1.62; const toYaw = Math.atan2(-(g.position.x - to.x), -(g.position.z - to.z)); const toPitch = Math.atan2(g.position.y - 1.62, dist);
  if (!focus) focus = { pos: pos.clone(), yaw, pitch };
  tween = { from: { p: pos.clone(), y: yaw, pi: pitch }, to: { p: to, y: nearAngle(yaw, toYaw), pi: toPitch }, t: 0, dur: 1.1 };
  const a = art[pic.userData.idx]; $('pKind').textContent = a.kind; $('pTitle').textContent = a.title; $('pDate').textContent = a.date;
  $('plaque').hidden = false; $('cX').hidden = false;
}
function exitFocus() { if (!focus) return; tween = { from: { p: pos.clone(), y: yaw, pi: pitch }, to: { p: focus.pos, y: focus.yaw, pi: focus.pitch }, t: 0, dur: 0.9 }; focus = null; $('plaque').hidden = true; $('cX').hidden = true; }
$('cX').addEventListener('click', exitFocus);
let hintGone = false; function hideHint() { if (hintGone) return; hintGone = true; $('hint').style.opacity = 0; }

// ---------------- your photos (local only) ----------------
const files = $('files');
['heroAdd', 'stageAdd', 'navAdd'].forEach((id) => $(id).addEventListener('click', () => files.click()));
$('heroWalk').addEventListener('click', () => $('room').scrollIntoView({ behavior: 'smooth', block: 'center' }));
files.addEventListener('change', async () => {
  const list = [...files.files].slice(0, art.length);
  for (let k = 0; k < list.length; k++) {
    const f = list[k];
    try {
      const img = await createImageBitmap(f);
      art[k] = { title: f.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').slice(0, 40) || 'Your photo', date: new Date(f.lastModified).toLocaleDateString('en-GB'), kind: 'Your photo', img };
      setArt(k);
    } catch (err) { /* skip unreadable file */ }
  }
  files.value = ''; $('room').scrollIntoView({ behavior: 'smooth', block: 'center' }); exitFocus(); entrance();
});

// ---------------- loop ----------------
function resize() { const r = stage.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); composer.setSize(r.width, r.height); cam.aspect = r.width / r.height; cam.fov = cam.aspect < 1 ? 68 : 55; cam.updateProjectionMatrix(); }
new ResizeObserver(resize).observe(stage); resize();

manager.onLoad = () => { $('loader').classList.add('done'); $('veil').classList.remove('on'); entrance(); };
let last = performance.now();
function tick(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now; const t = now / 1000;
  if (tween) {
    tween.t = Math.min(1, tween.t + dt / (reduce ? 0.01 : tween.dur)); const e = tween.t < 0.5 ? 4 * tween.t ** 3 : 1 - Math.pow(-2 * tween.t + 2, 3) / 2;
    pos.lerpVectors(tween.from.p, tween.to.p, e); yaw = tween.from.y + (tween.to.y - tween.from.y) * e; pitch = tween.from.pi + (tween.to.pi - tween.from.pi) * e; if (tween.t >= 1) tween = null; vel = 0;
  } else if (!focus) {
    const f = (keys.ArrowUp || keys.KeyW || hold.f ? 1 : 0) - (keys.ArrowDown || keys.KeyS || hold.b ? 1 : 0);
    const tr = (keys.ArrowLeft || keys.KeyA || hold.l ? 1 : 0) - (keys.ArrowRight || keys.KeyD || hold.r ? 1 : 0);
    vel += (f * 1.35 - vel) * Math.min(1, dt * 4); turn += (tr * 0.9 - turn) * Math.min(1, dt * 5); // eased, human walking pace
    yaw += turn * dt; pos.x -= Math.sin(yaw) * vel * dt; pos.z -= Math.cos(yaw) * vel * dt; clampPos();
  }
  setCam(t); composer.render(); requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
