const influencers = [
    { name: "지니", category: "it", platform: "YouTube", followers: "25만", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
    { name: "로즈", category: "beauty", platform: "Instagram", followers: "12만", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400" },
    { name: "맛탐", category: "food", platform: "TikTok", followers: "50만", image: "https://images.unsplash.com/photo-1502301103665-0b95cc738def?w=400" },
    { name: "민수", category: "it", platform: "Blog", followers: "8만", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" }
];

function displayInfluencers(data) {
    const grid = document.getElementById('influencer-grid');
    grid.innerHTML = data.map(person => `
        <div class="card">
            <img src="${person.image}" class="card-img">
            <div class="card-body">
                <span style="color: #ff4757; font-weight:bold; font-size: 0.8rem;">#${person.category.toUpperCase()}</span>
                <h3>${person.name} <small style="color: #666;">(${person.platform})</small></h3>
                <p style="font-size: 0.9rem; color: #444;">팔로워: ${person.followers}</p>
                <button class="contact-btn" style="width:100%; padding:10px; background:#f4f7fa; border:none; border-radius:8px; cursor:pointer; font-weight:600;">상세보기</button>
            </div>
        </div>
    `).join('');
}

window.onload = () => displayInfluencers(influencers);