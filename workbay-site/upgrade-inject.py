import sys
p=sys.argv[1]; s=open(p).read()
def once(marker):
    assert s.count(marker)==1, (marker, s.count(marker))
for m in ['<section class="statement wrap">','<section class="story" id="story">','<section class="sect wrap" style="padding-top:30px">','</style>','</body>']: once(m)

CSS='''
/* ===== upgrade: trust strip, real screens, real-app walkthrough, setup steps, sticky trial bar ===== */
.trust{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:8px auto 0;position:relative;z-index:1}
.trust div{display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.7);border:1px solid var(--line);border-radius:16px;padding:12px 14px;font-size:14px;line-height:1.3;min-width:0}
.trust svg{flex:0 0 22px;width:22px;height:22px}
@media(max-width:820px){.trust{grid-template-columns:repeat(2,minmax(0,1fr))}}
.screens{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:center;margin-top:34px}
@media(max-width:820px){.screens{grid-template-columns:1fr;gap:22px}}
.stabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px}
.stabs button{border:1px solid var(--line);background:#fff;color:var(--ink);border-radius:999px;padding:9px 15px;font-size:15px;font-weight:500;cursor:pointer;transition:background .3s,color .3s}
.stabs button[aria-selected="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
.scopy h3{font-size:clamp(26px,3.2vw,36px);margin-bottom:10px}
.scopy p{color:var(--muted);font-size:18px;max-width:38ch}
.scopy .cap{font-size:13px;color:var(--muted);margin-top:16px}
.sphone{position:relative;width:min(320px,78vw);margin:0 auto;aspect-ratio:390/844;border-radius:46px;background:#141414;padding:12px;box-shadow:0 40px 80px -30px rgba(0,0,0,.45)}
.sphone .sscr{position:absolute;inset:12px;border-radius:36px;overflow:hidden;background:#f5f5f0}
.sphone img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.02);transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .9s cubic-bezier(.22,.61,.36,1)}
.sphone img.on{opacity:1;transform:none}
.desk{margin-top:56px;text-align:center}
.desk h3{font-size:clamp(24px,3vw,34px);margin-bottom:8px}
.desk p{color:var(--muted);margin:0 auto 24px;max-width:46ch}
.browser{max-width:960px;margin:0 auto;border-radius:16px;overflow:hidden;background:#fff;border:1px solid var(--line);box-shadow:0 40px 80px -40px rgba(0,0,0,.35)}
.browser .bar{display:flex;gap:6px;padding:10px 14px;background:#ecece6}
.browser .bar i{width:10px;height:10px;border-radius:50%;background:#d0d0c8}
.browser img{display:block;width:100%;height:auto}
.walk{background:var(--dark);color:#fff;padding-block:90px;margin-top:40px;position:relative;overflow:hidden}
.walk .eyebrow{color:#9a9a9f}
.walk h2{color:#fff}
.walk .lead{color:#a1a1a6}
.wgrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;margin-top:40px}
@media(max-width:980px){.wgrid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:560px){.wgrid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:14px;padding-bottom:10px;margin-left:-20px;margin-right:-20px;padding-left:20px;padding-right:20px;scrollbar-width:none}.wgrid::-webkit-scrollbar{display:none}.wcard{flex:0 0 72%;scroll-snap-align:center}}
.wcard{min-width:0}
.wphone{aspect-ratio:540/1168;border-radius:30px;background:#000;padding:8px;box-shadow:0 30px 60px -30px rgba(0,0,0,.8);border:1px solid #2a2a2c}
.wphone video{width:100%;height:100%;object-fit:cover;border-radius:23px;display:block;background:#111}
.wcard .wn{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--lime);color:#141414;font-weight:700;font-size:14px;margin-top:16px}
.wcard h3{font-size:20px;margin:10px 0 6px;color:#fff}
.wcard p{color:#a1a1a6;font-size:15px}
.steps3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:34px;counter-reset:s}
@media(max-width:820px){.steps3{grid-template-columns:1fr}}
.steps3 article{background:#fff;border:1px solid var(--line);border-radius:24px;padding:26px;min-width:0}
.steps3 article::before{counter-increment:s;content:counter(s);display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--ink);color:var(--lime);font-weight:700;margin-bottom:16px}
.steps3 h3{font-size:22px;margin-bottom:8px}
.steps3 p{color:var(--muted)}
.stick{position:fixed;left:0;right:0;bottom:0;z-index:60;padding:10px max(16px,env(safe-area-inset-right,0px)) calc(10px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));background:rgba(20,20,20,.92);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);color:#fff;display:flex;align-items:center;justify-content:space-between;gap:12px;transform:translateY(110%);transition:transform .6s cubic-bezier(.22,.61,.36,1)}
.stick.on{transform:none}
.stick b{display:block;font-size:15px}.stick span{font-size:13px;color:#a1a1a6}
.stick a{background:var(--lime);color:#141414;font-weight:600;border-radius:999px;padding:11px 18px;white-space:nowrap}
@media(min-width:821px){.stick{display:none}}
@media (prefers-reduced-motion:reduce){.sphone img,.stick{transition:none}}
'''
ICON=lambda d:f'<svg viewBox="0 0 24 24" fill="none" stroke="#86c51a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{d}</svg>'
TRUST=f'''
  <section class="wrap"><div class="trust" aria-label="Why garages pick Workbay">
    <div>{ICON('<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>')}<span>Works on your phone, tablet and garage computer</span></div>
    <div>{ICON('<path d="M12 3v12m0 0l-4-4m4 4l4-4"/><path d="M5 21h14"/>')}<span>Add it to your home screen. No app store</span></div>
    <div>{ICON('<path d="M20 6L9 17l-5-5"/>')}<span>No contract, no setup fee, cancel any time</span></div>
    <div>{ICON('<path d="M4 4h16v12H5l-1 4z"/><path d="M8 9h8M8 12h5"/>')}<span>Back up and export your data whenever you like</span></div>
  </div></section>
'''
TABS=[('home','Home','Your day at a glance.','Who owes you, who to chase, MOTs and services due, and the month’s takings closing like rings.'),
('jobs','Jobs','Every job in one list.','Booked, in progress, done and paid, with the reg, customer and price on each. Filter it with one tap.'),
('calendar','Calendar','The diary, without the diary.','Every booking on the day it’s in. Tap a day to see what’s coming through the door.'),
('jobcard','Job card','Everything about the car.','Customer, reg, mileage, parts status, MOT and service dates, and a health check in colour.'),
('invoice','Invoice','Invoices in seconds.','Itemised labour and parts, your garage name on top. Share it as a PDF or send it on WhatsApp.'),
('reminders','MOT reminders','Never miss an MOT.','Every MOT and service due in the next 30 days, with the message already written. One tap to send.'),
('customers','Customers','All your customers, sorted.','Name, number and reg for every customer and car. Search by any of them.')]
btns=''.join(f'<button type="button" role="tab" id="st-{k}" aria-selected="{"true" if i==0 else "false"}" data-s="{k}">{lab}</button>' for i,(k,lab,_,_) in enumerate(TABS))
imgs=''.join(f'<img src="media/screen-{k}.webp" alt="Workbay {lab} screen" class="{"on" if i==0 else ""}" data-s="{k}" loading="{"eager" if i==0 else "lazy"}">' for i,(k,lab,_,_) in enumerate(TABS))
SCREENS=f'''
  <section class="sect wrap" id="screens">
    <div class="sect-h"><p class="eyebrow reveal">Take a look around</p><h2 class="reveal d1">The screens you'll use every day.</h2><p class="lead reveal d2">Real Workbay screens, with a made-up garage and made-up customers.</p></div>
    <div class="screens">
      <div class="scopy">
        <div class="stabs" role="tablist" aria-label="Workbay screens">{btns}</div>
        <h3 id="sTitle">{TABS[0][2]}</h3><p id="sText">{TABS[0][3]}</p>
        <p class="cap">Tap a screen name to see it.</p>
      </div>
      <div class="sphone"><div class="sscr">{imgs}</div></div>
    </div>
    <div class="desk"><h3 class="reveal">Same garage on the computer in the office.</h3><p class="reveal d1">Sign in on any screen and everything is there: the same jobs, customers and money.</p>
      <div class="browser reveal d2"><div class="bar"><i></i><i></i><i></i></div><img src="media/screen-desktop.webp" alt="Workbay on a desktop computer" loading="lazy"></div></div>
  </section>
'''
W=[('book','Book it in','Pick the customer, tap the work, choose a time and add the price. It’s on your board.'),
('check','Check it','Open the job card and mark tyres, brakes and lights Good, Advise or Urgent.'),
('invoice','Invoice it','The invoice builds itself from the job. Share the PDF or send it on WhatsApp.'),
('remind','Bring them back','Every MOT and service due is listed with the reminder written for you.')]
cards=''.join(f'<article class="wcard reveal d{min(i,3)}"><div class="wphone"><video muted playsinline loop preload="none" poster="media/walk-{k}.jpg" aria-label="{t}: screen recording"><source src="media/walk-{k}.mp4" type="video/mp4"></video></div><span class="wn">{i+1}</span><h3>{t}</h3><p>{d}</p></article>' for i,(k,t,d) in enumerate(W))
WALK=f'''
  <section class="walk" id="watch"><div class="wrap">
    <div class="sect-h"><p class="eyebrow reveal">Watch the real app</p><h2 class="reveal d1">One job, start to finish.</h2><p class="lead reveal d2">Real screen recordings from the Workbay demo garage. No mock-ups.</p></div>
    <div class="wgrid">{cards}</div>
  </div></section>

  <section class="sect wrap" id="start">
    <div class="sect-h"><p class="eyebrow reveal">Getting started</p><h2 class="reveal d1">Up and running before your next brew.</h2><p class="lead reveal d2">Three steps. No training, no setup call.</p></div>
    <div class="steps3">
      <article class="reveal"><h3>Start your free week</h3><p>Make an account in about two minutes. Everything is unlocked for 7 days.</p></article>
      <article class="reveal d1"><h3>Add your garage details</h3><p>Your garage name, bank details and logo, so they show on every invoice.</p></article>
      <article class="reveal d2"><h3>Book in your first job</h3><p>Add the customer and the car, pick the work and the time. It's on your board.</p></article>
    </div>
    <p style="text-align:center;margin-top:28px"><a class="btn primary" href="#" data-app="trial">Try it free</a></p>
  </section>
'''
STICK='''
<div class="stick" id="stick" aria-hidden="true"><div><b>7 days free</b><span>Then £29 a month. No contract.</span></div><a href="#" data-app="trial">Try it free</a></div>
<script>
(function(){
  var tabs=document.querySelectorAll('.stabs button'),imgs=document.querySelectorAll('.sphone img'),T='''+__import__('json').dumps({k:[t,d] for k,_,t,d in TABS},ensure_ascii=False)+''';
  tabs.forEach(function(b){b.addEventListener('click',function(){var k=b.dataset.s;tabs.forEach(function(x){x.setAttribute('aria-selected',String(x===b));});imgs.forEach(function(i){i.classList.toggle('on',i.dataset.s===k);});document.getElementById('sTitle').textContent=T[k][0];document.getElementById('sText').textContent=T[k][1];});});
  var vids=document.querySelectorAll('.wphone video');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){});}else v.pause();});},{threshold:.5});vids.forEach(function(v){io.observe(v);});}
  var st=document.getElementById('stick');
  function upd(){var home=document.querySelector('[data-view="home"]');var on=window.scrollY>700&&(!home||home.classList.contains('on'));st.classList.toggle('on',on);st.setAttribute('aria-hidden',String(!on));}
  addEventListener('scroll',upd,{passive:true});addEventListener('hashchange',upd);upd();
})();
</script>
'''
s=s.replace('</style>',CSS+'</style>',1)
s=s.replace('<section class="statement wrap">',TRUST+'  <section class="statement wrap">',1)
s=s.replace('<section class="story" id="story">',SCREENS+'  <section class="story" id="story">',1)
s=s.replace('<section class="sect wrap" style="padding-top:30px">',WALK+'  <section class="sect wrap" style="padding-top:30px">',1)
s=s.replace('</body>',STICK+'</body>',1)
open(p,'w').write(s)
print('ok')
