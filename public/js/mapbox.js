export const dispalyMap = (locations) => {
  // نعمل خريطة جديدة
  const map = L.map('map', {
    scrollWheelZoom: false,
  });

  // نضيف tiles من OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // نضيف markers لكل location
  const points = [];
  locations.forEach((loc) => {
    const [lng, lat] = loc.coordinates; // لاحظ: في MongoDB الإحداثيات [lng, lat]

    const marker = L.marker([lat, lng]).addTo(map);
    marker
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
        autoClose: false,
      })
      .openPopup();

    points.push([lat, lng]);
  });

  // نضبط حدود الخريطة على كل النقاط
  const bounds = L.latLngBounds(points);
  map.fitBounds(bounds, {
    padding: [50, 50],
  });
};
