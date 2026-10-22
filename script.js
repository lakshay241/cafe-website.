// =========================================================
// Tumbler & Dabara - script.js
// Menu filter, order tray (with GST), open/closed status,
// table booking form, copy address, mobile menu
// =========================================================

// ---------- Menu data ----------
// To add a photo for any item: save it in the images folder with the
// file name shown in "img". If the photo is missing, a drawn card is shown.
const MENU = [
  // Coffee & Drinks
  { id: 1,  name: "Filter Coffee",      desc: "Traditional South Indian filter coffee.",              price: 40,  cat: "Coffee",       img: "images/filter-coffee.jpg", popular: true },
  { id: 2,  name: "Masala Chai",        desc: "Freshly brewed tea with aromatic spices.",             price: 30,  cat: "Coffee",       img: "images/masala-chai.jpg" },
  { id: 3,  name: "Cappuccino",         desc: "Smooth coffee topped with creamy foam.",               price: 100, cat: "Coffee",       img: "images/cappuccino.jpg" },
  { id: 7,  name: "Cold Coffee",        desc: "Chilled coffee blended with milk and ice cream.",      price: 90,  cat: "Coffee",       img: "images/cold-coffee.jpg" },
  { id: 8,  name: "Badam Milk",         desc: "Warm milk with almonds, saffron and cardamom.",        price: 60,  cat: "Coffee",       img: "images/badam-milk.jpg" },
  { id: 9,  name: "Fresh Lime Soda",    desc: "Sweet or salted, with fresh lime and mint.",           price: 50,  cat: "Coffee",       img: "images/lime-soda.jpg" },
  { id: 10, name: "Mango Lassi",        desc: "Thick curd blended with Alphonso mango pulp.",         price: 80,  cat: "Coffee",       img: "images/mango-lassi.jpg" },

  // South Indian
  { id: 4,  name: "Masala Dosa",        desc: "Crispy dosa served with traditional accompaniments.",  price: 90,  cat: "South Indian", img: "images/masala-dosa.jpg", popular: true },
  { id: 11, name: "Idli (2 pcs)",       desc: "Soft steamed idlis with sambar and chutney.",          price: 50,  cat: "South Indian", img: "images/idli-plate.jpg" },
  { id: 12, name: "Medu Vada (2 pcs)",  desc: "Crispy urad dal vadas with coconut chutney.",          price: 60,  cat: "South Indian", img: "images/medu-vada.jpg" },
  { id: 13, name: "Onion Uttapam",      desc: "Thick rice pancake topped with onion and chilli.",     price: 100, cat: "South Indian", img: "images/uttapam.jpg" },
  { id: 14, name: "Rava Dosa",          desc: "Thin, lacy semolina dosa with cumin and pepper.",      price: 110, cat: "South Indian", img: "images/rava-dosa.jpg" },
  { id: 15, name: "Ven Pongal",         desc: "Rice and moong dal cooked with ghee and pepper.",      price: 70,  cat: "South Indian", img: "images/pongal.jpg" },
  { id: 16, name: "Mysore Masala Dosa", desc: "Dosa with spicy red chutney and potato masala.",       price: 110, cat: "South Indian", img: "images/mysore-dosa.jpg" },

  // Fast Food
  { id: 17, name: "Veg Burger",         desc: "Crunchy veg patty, cheese, lettuce and mayo.",         price: 99,  cat: "Fast Food",    img: "images/veg-burger.jpg", popular: true },
  { id: 18, name: "Paneer Tikka Wrap",  desc: "Grilled paneer tikka rolled in a soft tortilla.",      price: 130, cat: "Fast Food",    img: "images/paneer-wrap.jpg" },
  { id: 19, name: "Margherita Pizza",   desc: "7-inch pizza with tomato sauce and mozzarella.",       price: 180, cat: "Fast Food",    img: "images/pizza.jpg" },
  { id: 20, name: "Pav Bhaji",          desc: "Buttery mashed vegetable curry with 2 soft pavs.",     price: 120, cat: "Fast Food",    img: "images/pav-bhaji.jpg" },
  { id: 21, name: "Veg Hakka Noodles",  desc: "Wok-tossed noodles with crunchy vegetables.",          price: 130, cat: "Fast Food",    img: "images/noodles.jpg" },
  { id: 22, name: "French Fries",       desc: "Golden salted fries with peri-peri dip.",              price: 80,  cat: "Fast Food",    img: "images/fries.jpg" },
  { id: 23, name: "Cheese Garlic Bread", desc: "Toasted bread with garlic butter and cheese.",        price: 110, cat: "Fast Food",    img: "images/garlic-bread.jpg" },

  // Snacks
  { id: 5,  name: "Veg Sandwich",       desc: "A delicious sandwich with fresh vegetables.",          price: 80,  cat: "Snacks",       img: "images/veg-sandwich.jpg" },
  { id: 24, name: "Samosa (2 pcs)",     desc: "Potato and pea samosas with mint chutney.",            price: 40,  cat: "Snacks",       img: "images/samosa.jpg" },
  { id: 25, name: "Vada Pav",           desc: "Mumbai-style potato vada in a pav with chutneys.",     price: 35,  cat: "Snacks",       img: "images/vada-pav.jpg" },
  { id: 26, name: "Paneer Pakoda",      desc: "Paneer fritters in spiced gram flour batter.",         price: 90,  cat: "Snacks",       img: "images/paneer-pakoda.jpg" },
  { id: 27, name: "Mysore Bonda (4 pcs)", desc: "Fluffy fried dumplings with coconut chutney.",       price: 50,  cat: "Snacks",       img: "images/bonda.jpg" },

  // Sweets & Desserts
  { id: 6,  name: "Chocolate Brownie",  desc: "A rich and chocolatey sweet treat.",                   price: 70,  cat: "Sweets",       img: "images/brownie.jpg" },
  { id: 28, name: "Gulab Jamun (2 pcs)", desc: "Soft khoya dumplings in warm sugar syrup.",           price: 60,  cat: "Sweets",       img: "images/gulab-jamun.jpg", popular: true },
  { id: 29, name: "Rasmalai (2 pcs)",   desc: "Chenna discs soaked in saffron milk.",                 price: 80,  cat: "Sweets",       img: "images/rasmalai.jpg" },
  { id: 30, name: "Mysore Pak",         desc: "Classic gram flour and ghee sweet. Melts in the mouth.", price: 50, cat: "Sweets",      img: "images/mysore-pak.jpg" },
  { id: 31, name: "Kesari Bath",        desc: "Saffron semolina halwa with cashews and raisins.",     price: 60,  cat: "Sweets",       img: "images/kesari.jpg" },
  { id: 32, name: "Gajar Halwa",        desc: "Slow-cooked carrot halwa with khoya and nuts.",        price: 90,  cat: "Sweets",       img: "images/gajar-halwa.jpg" },
  { id: 33, name: "Kesar Pista Kulfi",  desc: "Traditional frozen kulfi with saffron and pistachio.", price: 60,  cat: "Sweets",       img: "images/kulfi.jpg" }
];

// Drawn icon + colour used when an item has no photo yet
const CATEGORY_LOOK = {
  "Coffee":       { color: "#5a3a22", icon: '<path d="M5 11h12v3a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5zM17 12h1.5a2 2 0 0 1 0 4H17M9 4c0 2 2 2 2 4M13 4c0 2 2 2 2 4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' },
  "South Indian": { color: "#2f5a3a", icon: '<path d="M3 15c3-6 15-6 18 0zM3 15h18M8 12l2 3M13 11l1 4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' },
  "Fast Food":    { color: "#8a3b24", icon: '<path d="M4 11a8 5 0 0 1 16 0zM4 14h16M5 17h14a1 1 0 0 1-1 2H6a1 1 0 0 1-1-2zM9 8h.01M12 7h.01M15 8h.01" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' },
  "Snacks":       { color: "#7a5a1e", icon: '<path d="M12 4l8 15H4zM9 14h6M10.5 11h3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>' },
  "Sweets":       { color: "#7a2e45", icon: '<path d="M3 12h18a9 6 0 0 1-18 0zM8 9a2 2 0 1 1 4 0M12 8a2 2 0 1 1 4 0" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' }
};

function placeholderHTML(item) {
  const look = CATEGORY_LOOK[item.cat] || CATEGORY_LOOK.Coffee;
  return `<div class="img-placeholder" style="--ph:${look.color}">
            <svg viewBox="0 0 24 24" aria-hidden="true">${look.icon}</svg>
            <span>${item.name}</span>
          </div>`;
}

const GST_RATE = 0.05;
const OPEN_HOUR = 8;    // 8:00 AM
const CLOSE_HOUR = 22;  // 10:00 PM

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const rupee = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

let activeCategory = "All";
let orderType = "Dine In";
let cart = loadCart();   // { itemId: quantity }

function loadCart() {
  try { return JSON.parse(localStorage.getItem("td_cart")) || {}; }
  catch (e) { return {}; }
}
function saveCart() {
  try { localStorage.setItem("td_cart", JSON.stringify(cart)); } catch (e) { /* storage blocked */ }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => (toast.hidden = true), 2200);
}

// ---------- Render menu cards ----------
function renderMenu() {
  const grid = $("#menuGrid");
  const items = activeCategory === "All" ? MENU : MENU.filter((m) => m.cat === activeCategory);

  if (items.length === 0) {
    grid.innerHTML = `<p class="empty-menu">No items in this category yet.</p>`;
    return;
  }

  grid.innerHTML = items.map((item) => {
    const qty = cart[item.id] || 0;
    const control = qty
      ? `<div class="qty-control">
           <button data-action="minus" data-id="${item.id}" aria-label="Remove one ${item.name}">−</button>
           <span>${qty}</span>
           <button data-action="plus" data-id="${item.id}" aria-label="Add one ${item.name}">+</button>
         </div>`
      : `<button class="add-btn" data-action="plus" data-id="${item.id}">+ Add</button>`;

    return `
      <article class="menu-card">
        <div class="card-img">
          ${placeholderHTML(item)}
          <img src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.remove()">
          ${item.popular ? `<span class="tag-popular">Popular</span>` : ""}
        </div>
        <div class="card-body">
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
          <div class="card-foot">
            <span class="price">${rupee(item.price)}</span>
            ${control}
          </div>
        </div>
      </article>`;
  }).join("");
}

// ---------- Render order tray ----------
function renderOrder() {
  const ids = Object.keys(cart);
  const list = $("#orderItems");
  const count = ids.reduce((sum, id) => sum + cart[id], 0);

  // badge on Order button
  const badge = $("#cartBadge");
  badge.hidden = count === 0;
  badge.textContent = count;

  if (ids.length === 0) {
    list.innerHTML = `<p class="order-empty">Your order is empty.<br>Add something from the menu.</p>`;
    $("#orderTotals").hidden = true;
    $("#placeOrder").disabled = true;
    return;
  }

  let subtotal = 0;
  list.innerHTML = ids.map((id) => {
    const item = MENU.find((m) => m.id === Number(id));
    if (!item) { delete cart[id]; return ""; }   // item removed from menu
    const qty = cart[id];
    subtotal += item.price * qty;
    const look = CATEGORY_LOOK[item.cat] || CATEGORY_LOOK.Coffee;
    return `
      <div class="order-line">
        <div class="thumb" style="--ph:${look.color}">
          <span>${item.name.charAt(0)}</span>
          <img src="${item.img}" alt="" onerror="this.remove()">
        </div>
        <div>
          <h5>${item.name}</h5>
          <span class="line-price">${rupee(item.price)}</span>
        </div>
        <div class="line-actions">
          <div class="qty-control">
            <button data-action="minus" data-id="${item.id}" aria-label="Remove one ${item.name}">−</button>
            <span>${qty}</span>
            <button data-action="plus" data-id="${item.id}" aria-label="Add one ${item.name}">+</button>
          </div>
          <button class="remove-btn" data-action="remove" data-id="${item.id}" aria-label="Remove ${item.name}">
            <svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>`;
  }).join("");

  const gst = subtotal * GST_RATE;
  $("#subtotal").textContent = rupee(subtotal);
  $("#gst").textContent = rupee(gst);
  $("#total").textContent = rupee(subtotal + gst);
  $("#orderTotals").hidden = false;
  $("#placeOrder").disabled = false;
}

// ---------- Cart actions ----------
function updateCart(id, action) {
  const item = MENU.find((m) => m.id === id);
  if (action === "plus") {
    cart[id] = (cart[id] || 0) + 1;
    if (cart[id] === 1) showToast(`${item.name} added to your order`);
  } else if (action === "minus") {
    cart[id] = (cart[id] || 0) - 1;
    if (cart[id] <= 0) delete cart[id];
  } else if (action === "remove") {
    delete cart[id];
  }
  saveCart();
  renderMenu();
  renderOrder();
}

// One click handler for all +, −, Add and remove buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  updateCart(Number(btn.dataset.id), btn.dataset.action);
});

// ---------- Category filter ----------
$$(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    renderMenu();
  });
});

// ---------- Dine In / Takeaway ----------
$$(".type-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".type-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    orderType = btn.dataset.type;
  });
});

// ---------- Place order ----------
$("#placeOrder").addEventListener("click", () => {
  const total = $("#total").textContent;
  const token = Math.floor(100 + Math.random() * 900);
  cart = {};
  saveCart();
  renderMenu();
  renderOrder();
  $("#orderItems").innerHTML =
    `<div class="order-success">✓ Order placed (${orderType})<br>Token no. <strong>#${token}</strong> · Total ${total}</div>`;
  showToast("Order placed! Token #" + token);
});

// ---------- Open / closed status (India time) ----------
function updateOpenStatus() {
  const hour = Number(new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata", hour: "2-digit", hour12: false
  }).format(new Date())) % 24;

  const isOpen = hour >= OPEN_HOUR && hour < CLOSE_HOUR;
  const dot = $("#openDot");
  const text = $("#openText");

  dot.classList.toggle("open", isOpen);
  dot.classList.toggle("closed", !isOpen);
  dot.title = isOpen ? "Open now" : "Closed now";
  text.textContent = isOpen ? "● Open now" : "● Closed now · opens 8:00 AM";
  text.className = "open-text " + (isOpen ? "is-open" : "is-closed");
}

// ---------- Booking form ----------
(function setupDate() {
  const today = new Date();
  const toISO = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  $("#visitDate").min = toISO(today);
})();

$("#bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#name").value.trim();
  const phone = $("#phone").value.trim();
  const date = $("#visitDate").value;
  const guests = $("#guests").value;
  const error = $("#formError");

  if (name.length < 2) return showError("Please enter your name.");
  if (!/^[6-9]\d{9}$/.test(phone)) return showError("Please enter a valid 10-digit mobile number.");
  if (!date) return showError("Please choose your visit date.");

  error.hidden = true;
  const niceDate = new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long"
  });

  e.target.hidden = true;
  const success = $("#formSuccess");
  success.hidden = false;
  success.textContent = `Thank you, ${name}! Your table for ${guests} on ${niceDate} is requested. We will call you on ${phone} to confirm.`;

  function showError(msg) {
    error.textContent = msg;
    error.hidden = false;
  }
});

// Only allow numbers in phone field
$("#phone").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
});

// ---------- Copy address ----------
$("#copyAddress").addEventListener("click", async () => {
  const address = "Tumbler & Dabara, " + $("#address").textContent;
  try {
    await navigator.clipboard.writeText(address);
    showToast("Address copied");
  } catch (err) {
    showToast(address);
  }
});

// ---------- Learn more ----------
$("#learnMore").addEventListener("click", () => {
  const more = $("#storyMore");
  more.hidden = !more.hidden;
  $("#learnMore").firstChild.textContent = more.hidden ? "Learn More " : "Show Less ";
});

// ---------- Mobile menu ----------
$("#menuToggle").addEventListener("click", () => {
  const links = $("#navLinks");
  const open = links.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", open);
});
$$("#navLinks a").forEach((a) =>
  a.addEventListener("click", () => {
    $$("#navLinks a").forEach((x) => x.classList.remove("active"));
    a.classList.add("active");
    $("#navLinks").classList.remove("open");
  })
);

// ---------- Start ----------
$("#year").textContent = new Date().getFullYear();
renderMenu();
renderOrder();
updateOpenStatus();
setInterval(updateOpenStatus, 60000);