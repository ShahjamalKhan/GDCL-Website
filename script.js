// ১. ডিরেক্টরদের তালিকা
// ডিরেক্টরদের তালিকা (ম্যাডাম এবং স্যার উভয়ই যুক্ত)
const directors = [
    {
        name: "Most Munera Khatun",
        designation: "Managing Director",
        image: "assets/directors/Munera Khatun.jpg",
        education: [
            "B.Sc. in Textile Engineering",
            "M.Sc. in Geo Science, Hubei, China"
        ],
        bio: "Leading Global Dyes Chem Limited with extensive expertise in textile processing, technical innovations, and international academic excellence from China."
    },
    {
        name: "Anamul Haque",
        designation: "Director",
        image: "assets/directors/anamul.jpg", // ছবিটির নাম assets/directors/ ফোল্ডারে anamul.jpg সেভ করবেন
        education: [
            "Accounting & Financial Management"
        ],
        bio: "Overseeing financial planning, accounting, and corporate fiscal management at Global Dyes Chem Limited."
    }
];

// ২. প্রোডাক্টের তালিকা
const products = [
    {
        name: "Reactive Blue 19 (Brilliant Blue R)",
        category: "Reactive Dyes",
        desc: "High fixation vinyl sulphone dye ideal for cotton knit and woven exhaustion dyeing."
    },
    {
        name: "Reactive Red 195 (ME 4BL)",
        category: "Reactive Dyes",
        desc: "Bifunctional reactive dye with superior wash and light fastness properties."
    },
    {
        name: "Disperse Red 60 (E-FB)",
        category: "Disperse Dyes",
        desc: "Low-energy disperse dye engineered for uniform polyester dyeing."
    },
    {
        name: "Disperse Blue 79 (Navy Blue)",
        category: "Disperse Dyes",
        desc: "High-temperature disperse dye with excellent sublimation fastness."
    },
    {
        name: "GD-Fix Eco (Formaldehyde-Free)",
        category: "Auxiliaries",
        desc: "OEKO-TEX compliant wet fastness improver for reactive and direct dyed fabrics."
    },
    {
        name: "GD-Scour Wetting Agent",
        category: "Auxiliaries",
        desc: "Low-foaming scouring and penetrating agent for cotton pretreatment."
    }
];

// ৩. ডিরেক্টর কার্ড রেন্ডার করা
function renderDirectors() {
    const container = document.getElementById("directors-container");
    if (!container) return;
    
    container.innerHTML = directors.map(dir => {
        const eduItems = dir.education.map(ed => 
            `<li><i class="fa-solid fa-graduation-cap"></i> <span>${ed}</span></li>`
        ).join("");

        return `
            <div class="director-card">
                <div class="director-img-wrap">
                    <img src="${dir.image}" alt="${dir.name}" 
                         style="width: 100%; height: 100%; object-fit: cover;"
                         oncontextmenu="return false;" draggable="false"
                         onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(dir.name)}&size=400&background=0f766e&color=fff'">
                    <span class="role-badge">${dir.designation}</span>
                </div>
                <div class="director-body">
                    <h3>${dir.name}</h3>
                    <div class="edu-box">
                        <div class="edu-title">Educational Background</div>
                        <ul class="edu-list">${eduItems}</ul>
                    </div>
                    <p class="director-bio">${dir.bio}</p>
                </div>
            </div>
        `;
    }).join("");
}

// ৪. প্রোডাক্ট কার্ড লোড ও ফিল্টার করা
function renderProducts(category = "All") {
    const container = document.getElementById("products-container");
    if (!container) return;

    const filtered = category === "All" 
        ? products 
        : products.filter(p => p.category === category);

    container.innerHTML = filtered.map(prod => `
        <div class="product-card">
            <div>
                <span class="product-cat">${prod.category}</span>
                <h3>${prod.name}</h3>
                <p>${prod.desc}</p>
            </div>
            <button class="btn btn-primary full-width" onclick="selectProductForQuote('${prod.name}')">
                Request Sample / Quote
            </button>
        </div>
    `).join("");
}

function filterProducts(category, btnElement) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");
    renderProducts(category);
}

function selectProductForQuote(productName) {
    const msgBox = document.getElementById("clientMessage");
    if (msgBox) {
        msgBox.value = `I would like to request a price quote / lab sample for: ${productName}`;
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
        msgBox.focus();
    }
}

// ৫. ডাই ও কেমিক্যাল ক্যালকুলেটর লজিক
function calculateDosage() {
    const fabricElem = document.getElementById("fabricWeight");
    const ratioElem = document.getElementById("liquorRatio");
    const shadeElem = document.getElementById("dyeShade");
    const saltElem = document.getElementById("saltDosage");

    if (!fabricElem) return;

    const fabric = parseFloat(fabricElem.value) || 0;
    const ratio = parseFloat(ratioElem.value) || 0;
    const shade = parseFloat(shadeElem.value) || 0;
    const salt = parseFloat(saltElem.value) || 0;

    const totalWater = fabric * ratio; 
    const totalDye = (fabric * shade) / 100; 
    const totalSalt = (totalWater * salt) / 1000; 

    document.getElementById("resWater").innerText = `${totalWater.toLocaleString()} Liters`;
    document.getElementById("resDye").innerText = `${totalDye.toFixed(2)} kg`;
    document.getElementById("resSalt").innerText = `${totalSalt.toFixed(2)} kg`;
}

// ৬. মোবাইল মেনু ও ফর্ম হ্যান্ডলিং
const mobileBtn = document.getElementById("mobile-menu-btn");
if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
        document.getElementById("nav-links").classList.toggle("active");
    });
}

const inquiryForm = document.getElementById("inquiryForm");
if (inquiryForm) {
    inquiryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("clientName").value;
        alert(`ধন্যবাদ ${name}! আপনার ইনকোয়ারি সফলভাবে গ্রহণ করা হয়েছে। আমাদের টিম শীঘ্রই যোগাযোগ করবে।`);
        e.target.reset();
    });
}

// পেজ লোড হলে ফাংশনগুলো রান করা
window.addEventListener("DOMContentLoaded", () => {
    renderDirectors();
    renderProducts();
    calculateDosage();
});

// এমপ্লয়ীদের তালিকা (প্রয়োজনমতো নাম ও পদবী পরিবর্তন করে নিতে পারেন)
const employees = [
    {
        name: "Md. Rahim Uddin",
        designation: "Senior Lab Chemist",
        department: "R&D & Quality Control",
        image: "assets/directors/anamul.jpg", // আপাতত ডেমো ছবি, পরবর্তীতে এমপ্লয়ীর ছবি দিতে পারেন
        phone: "+880 1700-XXXXXX"
    },
    {
        name: "Nazmul Islam",
        designation: "Technical Sales Executive",
        department: "Marketing & Sales",
        image: "assets/directors/anamul.jpg",
        phone: "+880 1800-XXXXXX"
    },
    {
        name: "Tanvir Ahmed",
        designation: "Store & Inventory Officer",
        department: "Supply Chain",
        image: "assets/directors/anamul.jpg",
        phone: "+880 1900-XXXXXX"
    }
];

// এমপ্লয়ী লিস্ট নতুন পেজে রেন্ডার করার ফাংশন
function renderEmployeesPage() {
    const container = document.getElementById("full-employees-container");
    if (!container) return;

    container.innerHTML = employees.map(emp => `
        <div class="director-card">
            <div class="director-img-wrap" style="height: 220px; display: flex; justify-content: center; align-items: center; background-color: #f8fafc;">
                <img src="${emp.image}" alt="${emp.name}" 
                     style="width: 100%; height: 100%; object-fit: contain; object-position: center;"
                     oncontextmenu="return false;" draggable="false"
                     onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&size=300&background=0f766e&color=fff'">
                <span class="role-badge">${emp.designation}</span>
            </div>
            <div class="director-body" style="text-align: center; padding: 20px;">
                <h3 style="margin-bottom: 5px; color: #0f172a;">${emp.name}</h3>
                <p style="color: #0f766e; font-weight: 600; font-size: 14px; margin-bottom: 10px;">${emp.department}</p>
                <p style="color: #64748b; font-size: 13px;"><i class="fa-solid fa-phone"></i> ${emp.phone}</p>
            </div>
        </div>
    `).join("");
}

// উইন্ডো লোড হওয়ার সময় ফাংশনটি কল করা
window.addEventListener("DOMContentLoaded", () => {
    renderDirectors();
    renderProducts();
    calculateDosage();
    renderEmployeesPage(); // নতুন পেজের জন্য এমপ্লয়ী লোড করবে
});

// গ্যালারির ছবি ও বিবরণ (পরে আপনার কোম্পানির আসল ছবিগুলোর পাথ দিয়ে দিতে পারবেন)
const galleryItems = [
    {
        title: "Office Visit",
        category: "visit",
        image: "assets/gallery/nfc.png" // ডেমো হিসেবে বর্তমান ছবি ব্যবহার করা হয়েছে, আপনার মতো করে ছবি দিতে পারেন
    },
    {
        title: "Tex Fare",
        category: "visit",
        image: "assets/gallery/komol.jpg"
    },
    {
        title: "Lab visit",
        category: "Corporate",
        image: "assets/gallery/dean.jpg"
    },
    {
        title: "Corporate Office visit",
        category: "Corporate",
        image: "assets/gallery/nfc2.jpg"
    }
];

// গ্যালারি পেজে ছবি রেন্ডার করার ফাংশন
function renderGalleryPage() {
    const container = document.getElementById("gallery-container");
    if (!container) return;

    container.innerHTML = galleryItems.map(item => `
        <div class="director-card" style="padding: 10px;">
            <div class="director-img-wrap" style="height: 240px; display: flex; justify-content: center; align-items: center; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
                <img src="${item.image}" alt="${item.title}" 
                     style="width: 100%; height: 100%; object-fit: cover; object-position: center;"
                     oncontextmenu="return false;" draggable="false">
                <span class="role-badge">${item.category}</span>
            </div>
            <div class="director-body" style="text-align: center; padding: 15px 10px;">
                <h3 style="font-size: 18px; color: #0f172a; margin-bottom: 0;">${item.title}</h3>
            </div>
        </div>
    `).join("");
}

// উইন্ডো লোড হওয়ার সময় গ্যালারি ফাংশন রান করা
window.addEventListener("DOMContentLoaded", () => {
    // আগের ফাংশনগুলোর সাথে এটি যুক্ত হবে
    renderGalleryPage();
});