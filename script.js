// Tumbler & Dabara - menu, order tray, hours and booking
const MENU = {
  "Coffee": [
    {id:"c1",name:"Filter coffee",desc:"Our house decoction with boiled milk, frothed by pouring.",price:40,tag:"Bestseller"},
    {id:"c2",name:"Strong 'by-two'",desc:"One coffee split into two tumblers. Extra decoction, less milk.",price:45},
    {id:"c3",name:"Sugarless filter coffee",desc:"Same brew, no sugar. Ask for jaggery on the side.",price:40},
    {id:"c4",name:"Cold filter coffee",desc:"Decoction over ice with chilled milk, shaken.",price:80},
    {id:"c5",name:"Masala chai",desc:"Assam tea boiled with ginger, cardamom and clove.",price:35},
    {id:"c6",name:"Badam milk",desc:"Warm milk with ground almonds and saffron.",price:60}
  ],
  "Tiffin": [
    {id:"t1",name:"Idli (2 pcs)",desc:"Soft rice idlis with coconut chutney and sambar.",price:50,tag:"Bestseller"},
    {id:"t2",name:"Masala dosa",desc:"Crisp ghee-roast dosa with potato palya and red chutney.",price:90,tag:"Bestseller"},
    {id:"t3",name:"Medu vada (2 pcs)",desc:"Urad dal vadas, crisp outside, soft inside.",price:60},
    {id:"t4",name:"Rava idli",desc:"Semolina idli with cashew, mustard and curry leaves.",price:60},
    {id:"t5",name:"Khara bath",desc:"Spiced semolina with vegetables, served with chutney.",price:55},
    {id:"t6",name:"Set dosa (3 pcs)",desc:"Spongy small dosas with sagu and chutney.",price:80},
    {id:"t7",name:"Pongal",desc:"Rice and moong dal with pepper, cumin and ghee.",price:65}
  ],
  "Meals": [
    {id:"m1",name:"Mini meals",desc:"Rice, sambar, rasam, two palyas, curd and pickle.",price:140},
    {id:"m2",name:"Bisi bele bath",desc:"Rice, lentils and vegetables cooked with our own masala.",price:95},
    {id:"m3",name:"Curd rice",desc:"With pomegranate, ginger and a mustard tadka.",price:70},
    {id:"m4",name:"Lemon rice",desc:"With peanuts, curry leaves and green chilli.",price:65}
  ],
  "Sweets": [
    {id:"s1",name:"Mysore pak",desc:"Gram flour, sugar and lots of ghee. Melts in the mouth.",price:45},
    {id:"s2",name:"Kesari bath",desc:"Saffron semolina halwa with pineapple.",price:50},
    {id:"s3",name:"Holige",desc:"Thin flatbread stuffed with chana dal and jaggery.",price:55},
    {id:"s4",name:"Payasa",desc:"Vermicelli kheer with cardamom and cashews.",price:50}
  ]
};
const ALL = Object.values(MENU).flat();
const $ = s => document.querySelector(s);
const rs = n => "₹" + n.toLocaleString("en-IN", {minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2});

let cat = "Coffee", cart = {}, mode = "Dine in";
try { cart = JSON.parse(localStorage.getItem("td-cart") || "{}"); } catch (e) { cart = {}; }
const save = () => { try { localStorage.setItem("td-cart", JSON.stringify(cart)); } catch (e) {} };

/* ---------- menu ---------- */
function renderTabs(){
  const box = $("#tabs"); box.innerHTML = "";
  Object.keys(MENU).forEach(c => {
    const b = document.createElement("button");
    b.className = "tab"; b.type = "button"; b.role = "tab"; b.textContent = c;
    b.setAttribute("aria-selected", c === cat);
    b.onclick = () => { cat = c; renderTabs(); renderItems(); };
    box.appendChild(b);
  });
}
function renderItems(){
  const box = $("#items"); box.innerHTML = "";
  MENU[cat].forEach(it => {
    const q = cart[it.id] || 0;
    const el = document.createElement("div");
    el.className = "item";
    el.innerHTML = `<h3><span class="veg" title="Vegetarian"></span>${it.name}${it.tag ? `<span class="tag">${it.tag}</span>` : ""}</h3>
      <span class="price">${rs(it.price)}</span>
      <p>${it.desc}</p>
      ${q ? `<div class="qty"><button type="button" aria-label="Remove one ${it.name}" data-d="-1">−</button><span class="mono">${q}</span><button type="button" aria-label="Add one ${it.name}" data-d="1">+</button></div>`
          : `<button class="add" type="button">Add</button>`}`;
    el.querySelectorAll("button").forEach(b => b.onclick = () => change(it.id, b.dataset.d ? +b.dataset.d : 1));
    box.appendChild(el);
  });
}
function change(id, d){
  cart[id] = (cart[id] || 0) + d;
  if (cart[id] <= 0) delete cart[id];
  save(); renderItems(); renderTray();
}

/* ---------- tray ---------- */
function renderTray(){
  const ids = Object.keys(cart);
  const count = ids.reduce((a, id) => a + cart[id], 0);
  const badge = $("#badge"); badge.hidden = !count; badge.textContent = count;
  const lines = $("#lines");
  if (!ids.length){
    lines.innerHTML = `<p class="empty">Your tray is empty.</p>`;
    $("#sum").hidden = true; $("#placeOrder").disabled = true;
    $("#trayNote").textContent = "Add items from the menu to start your order.";
    return;
  }
  let sub = 0;
  lines.innerHTML = ids.map(id => {
    const it = ALL.find(x => x.id === id); const amt = it.price * cart[id]; sub += amt;
    return `<div class="line"><span>${cart[id]} × ${it.name}</span><span class="mono">${rs(amt)}</span></div>`;
  }).join("");
  const gst = Math.round(sub * 0.05 * 100) / 100;
  $("#sub").textContent = rs(sub); $("#gst").textContent = rs(gst); $("#total").textContent = rs(Math.round(sub + gst));
  $("#sum").hidden = false; $("#placeOrder").disabled = false;
  $("#trayNote").textContent = mode === "Dine in" ? "Pay at the counter. Your token number will be called out." : "Ready for pickup in about 15 minutes.";
}
function setMode(m){
  mode = m;
  $("#dineIn").setAttribute("aria-pressed", m === "Dine in");
  $("#takeAway").setAttribute("aria-pressed", m === "Takeaway");
  renderTray();
}
$("#dineIn").onclick = () => setMode("Dine in");
$("#takeAway").onclick = () => setMode("Takeaway");
$("#placeOrder").onclick = () => {
  const token = 100 + Math.floor(Math.random() * 900);
  const total = $("#total").textContent;
  cart = {}; save(); renderItems(); renderTray();
  $("#lines").innerHTML = `<p class="ok">Order placed (${mode}). Token #${token}, total ${total}.</p><p class="note">This is a demo, so no real order was sent.</p>`;
};

/* ---------- hours & open status (IST) ---------- */
const HOURS = [ // 0 = Sunday
  {d:"Sunday",o:"07:00",c:"21:00"},{d:"Monday",o:null,c:null},{d:"Tuesday",o:"06:30",c:"21:30"},
  {d:"Wednesday",o:"06:30",c:"21:30"},{d:"Thursday",o:"06:30",c:"21:30"},{d:"Friday",o:"06:30",c:"21:30"},{d:"Saturday",o:"06:30",c:"22:00"}
];
const fmt = t => { const [h, m] = t.split(":").map(Number); return `${(h % 12) || 12}:${String(m).padStart(2,"0")} ${h < 12 ? "am" : "pm"}`; };
function istNow(){
  const p = new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date());
  const get = t => p.find(x => x.type === t).value;
  const day = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(get("weekday"));
  return {day, mins: (+get("hour") % 24) * 60 + +get("minute")};
}
function renderHours(){
  const {day, mins} = istNow();
  const order = [1,2,3,4,5,6,0];
  $("#hours").innerHTML = order.map(i => {
    const h = HOURS[i];
    return `<tr class="${i === day ? "today" : ""}"><td>${h.d}${i === day ? " (today)" : ""}</td><td>${h.o ? fmt(h.o) + " – " + fmt(h.c) : "Closed"}</td></tr>`;
  }).join("");
  const h = HOURS[day];
  const toM = t => { const [a, b] = t.split(":").map(Number); return a * 60 + b; };
  const open = h.o && mins >= toM(h.o) && mins < toM(h.c);
  $("#openDot").classList.toggle("open", !!open);
  $("#openText").textContent = open ? `Open now · till ${fmt(h.c)}` : "Closed now";
}
renderHours(); setInterval(renderHours, 60000);

/* ---------- booking ---------- */
(function initBooking(){
  const times = [];
  for (let m = 7 * 60; m <= 21 * 60; m += 30) times.push(`${String(Math.floor(m / 60)).padStart(2,"0")}:${String(m % 60).padStart(2,"0")}`);
  $("#bTime").innerHTML = times.map(t => `<option value="${t}" ${t === "08:00" ? "selected" : ""}>${fmt(t)}</option>`).join("");
  const d = new Date(); d.setDate(d.getDate() + 1);
  const iso = x => x.toISOString().slice(0, 10);
  $("#bDate").min = iso(new Date()); $("#bDate").value = iso(d);
})();
$("#bookForm").addEventListener("submit", e => {
  e.preventDefault();
  const err = $("#bErr"), name = $("#bName").value.trim(), phone = $("#bPhone").value.trim(), date = $("#bDate").value;
  const fail = m => { err.textContent = m; err.hidden = false; };
  if (!name) return fail("Please enter your name.");
  if (!/^[6-9]\d{9}$/.test(phone)) return fail("Enter a 10-digit mobile number starting with 6, 7, 8 or 9.");
  if (!date) return fail("Please pick a date.");
  const day = new Date(date + "T00:00:00").getDay();
  if (!HOURS[day].o) return fail("We are closed on Mondays. Please choose another day.");
  err.hidden = true;
  const nice = new Date(date + "T00:00:00").toLocaleDateString("en-IN", {weekday:"long", day:"numeric", month:"long"});
  e.target.hidden = true;
  const ok = $("#bOk"); ok.hidden = false;
  ok.textContent = `Thanks, ${name}! Table for ${$("#bGuests").value} (${$("#bSeat").value.toLowerCase()}) requested for ${nice} at ${fmt($("#bTime").value)}. In a live site we would confirm by SMS on ${phone}.`;
});

$("#copyAddr").addEventListener("click", async e => {
  const t = $("#addrText").textContent;
  try { await navigator.clipboard.writeText(t); e.target.textContent = "Copied"; }
  catch (_) { const r = document.createRange(); r.selectNodeContents($("#addrText")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); e.target.textContent = "Selected, press Ctrl+C"; }
  setTimeout(() => e.target.textContent = "Copy address", 2000);
});

renderTabs(); renderItems(); renderTray();
