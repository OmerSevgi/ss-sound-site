# Organizasyon Web Sitesi Projesi: To-Do List (React & Express)

Bu dosya, projenin geliştirme adımlarını ve tamamlanma durumunu takip etmek için oluşturulmuştur.

**Teknoloji Yığını:**
- **Frontend:** React (Create React App) + React Router + Tailwind CSS
- **Backend:** Node.js + Express
- **Veritabanı:** MongoDB

---

## Aşama 1: Proje Kurulumu ve Temel Yapı
- [ ] Proje ana klasörü içinde `client` (React) ve `server` (Express) adında iki klasör oluştur.
- [ ] `client` klasöründe Create React App ile yeni bir proje başlat.
- [ ] React projesine Tailwind CSS'i kur ve yapılandır.
- [ ] `server` klasöründe `npm init` ile Node.js projesini başlat ve Express'i kur.
- [ ] Gerekli klasör yapılarını oluştur (`client/src/components`, `server/routes` vb.).

## Aşama 2: Frontend Geliştirmeleri (Client)
- [ ] `react-router-dom` kurarak sayfa yönlendirme yapısını oluştur (Ana Sayfa, Etkinlikler, Admin vb.).
- [ ] Statik olarak Ana Sayfa, Etkinlikler Sayfası ve diğer tüm bileşenleri (Slider, Galeri, Formlar) oluştur.
- [ ] Animasyonları ve mobil uyumluluğu sağla.

## Aşama 3: Backend Geliştirmeleri (Server)
- [ ] Express sunucusunu kur ve temel ayarları yap (CORS, body-parser vb.).
- [ ] MongoDB bağlantısını ve Event (Etkinlik) modelini oluştur.
- [ ] Etkinlikler için CRUD (Oluştur, Oku, Güncelle, Sil) API endpoint'lerini yaz.
- [ ] Admin girişi için yetkilendirme (authentication) endpoint'lerini yaz.

## Aşama 4: Admin Paneli ve Entegrasyon
- [ ] React tarafında Admin giriş sayfasını oluştur ve backend'deki login API'sine bağla.
- [ ] Token tabanlı yetkilendirme sistemi kur (örn: JWT).
- [ ] Admin'e özel, korunmuş sayfalar (Dashboard, Ekle/Düzenle) oluştur.
- [ ] Admin panelindeki formları, backend API'leri ile konuşturarak etkinlik yönetimini işlevsel hale getir.

## Aşama 5: Dinamik Veri ve Tamamlama
- [ ] Client tarafındaki tüm statik sayfaları (Ana Sayfa, Etkinlikler) backend'den veri çekecek şekilde dinamik hale getir.
- [ ] `concurrently` paketi ile client ve server'ı tek komutla başlatacak script'i ayarla.
- [ ] Genel test ve hata ayıklaması yap.
- [ ] Kodun son kez gözden geçirilmesi ve yorum satırlarının eklenmesi.