# ✈️ Susi Air Pilot App

Aplikasi mobile-first untuk pilot Susi Air.

## 🚀 Setup & Installation

git clone
npm install
npm install pinia @pinia/nuxt lucide-vue-next
npm run dev
npm run build
npm run preview

## 📚 Library yang Digunakan

| Nuxt.js 3 | SSR + file-based routing |
| Pinia |
| Chart.js / Recharts | Visualisasi Hours to Limit |
| SCSS | Styling modular |
| Lucide Icons |

## 🔧 Fitur yang ingin ditambahkan dan perbaikan jika Ada Waktu Lebih

- Unit testing pada logika Rolling Sum untuk memastikan perhitungan flight hours tetap akurat dan stabil.
- Animasi transisi halaman yang lebih halus
  Saya ingin mempelajari dan mengerjakan fitur-fitur berikut yang menurut saya pas untuk melengkapi fungsionalitas web ini :
- Implementasi Service Worker untuk Offline Fallback — data tetap dapat diakses tanpa koneksi internet, kondisi yang sangat relevan di lingkungan penerbangan.
- Integrasi Weather Briefing — integrasi data METAR/TAF real-time
  Fitur ini dapat dikembangkan sebagai modul briefing cuaca penerbangan pada dashboard pilot di Nuxt dengan mengambil data real-time METAR dan TAF dari API aviasi seperti Aviation Weather Center atau CheckWX. Sistem menampilkan kondisi cuaca bandara keberangkatan dan tujuan seperti visibility, wind, cloud, pressure, serta forecast beberapa jam ke depan dalam bentuk card dan indikator visual berwarna (normal, caution, warning). Di sisi frontend, data dapat di-fetch menggunakan composable/service Nuxt lalu disimpan di Pinia store agar dapat dipakai lintas component seperti dashboard, next flight card, dan weather alert banner.
- Fuel & Weight Balance Calculator — kalkulasi perencanaan penerbangan yang lebih efisien dan aman
  Fitur ini dapat dibuat sebagai kalkulator interaktif untuk membantu pilot menghitung estimasi fuel requirement dan distribusi berat pesawat sebelum penerbangan. Pengguna menginput data seperti jumlah penumpang, baggage, cargo, fuel load, serta route distance, lalu sistem menghitung total weight, center of gravity estimation, dan sisa fuel berdasarkan konsumsi rata-rata pesawat. Fitur ini juga dipadukan dengan alert system yang memberi warning jika payload atau fuel melebihi batas aircraft limitation.
