# 🎮 Satranç Öğreniyorum - Chess Learning App

Çocuklar için özel olarak tasarlanmış, premium hissiyatlı satranç öğrenme uygulaması.

## 📱 Özellikler

### 🎯 Çocuk Dostu Tasarım
- Renkli ve eğlenceli arayüz
- Büyük, dokunması kolay butonlar
- Emoji ve görsel öğeler
- Premium görünüm ve hissiyat

### 📚 Kapsamlı Öğrenme Sistemi
- **Satranç Tahtası**: Temel kavramlar
- **Piyonlar**: En küçük ama önemli taşlar
- **Kale**: Düz çizgilerde hareket
- **At**: L şeklinde özel hareket
- **Fil**: Çapraz hareket
- **Vezir**: En güçlü taş
- **Şah**: Korunması gereken taş
- **İlk Oyun**: Gerçek oyun deneyimi

### 🎮 İnteraktif Özellikler
- Adım adım dersler
- İnteraktif satranç tahtası
- Pratik modları
- Bilgisayara karşı oyun
- Farklı zorluk seviyeleri

### 🏆 Başarı Sistemi
- Puan sistemi
- Başarı rozetleri
- İlerleme takibi
- Seviye sistemi

## 🛠️ Teknolojiler

- **React Native** - Cross-platform mobil uygulama
- **Expo** - Geliştirme ve dağıtım platformu
- **TypeScript** - Tip güvenliği
- **React Navigation** - Sayfa geçişleri
- **Expo Linear Gradient** - Gradient efektleri
- **React Native Reanimated** - Animasyonlar

## 🚀 Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn
- Expo CLI
- iOS Simulator veya Android Emulator

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd chess-learning-app
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
# veya
yarn install
```

3. **Expo CLI'yi yükleyin (eğer yüklü değilse)**
```bash
npm install -g @expo/cli
```

4. **Uygulamayı başlatın**
```bash
npm start
# veya
yarn start
```

5. **QR kodu tarayın veya emülatörde açın**
- iOS: Expo Go uygulamasıyla QR kodu tarayın
- Android: Expo Go uygulamasıyla QR kodu tarayın
- Emülatör: Terminal'de 'i' (iOS) veya 'a' (Android) tuşuna basın

## 📁 Proje Yapısı

```
chess-learning-app/
├── src/
│   ├── components/
│   │   └── ChessBoard.tsx          # Satranç tahtası bileşeni
│   ├── constants/
│   │   ├── Colors.ts               # Renk paleti
│   │   └── Lessons.ts              # Ders verileri
│   └── screens/
│       ├── WelcomeScreen.tsx       # Hoş geldin ekranı
│       ├── HomeScreen.tsx          # Ana sayfa
│       ├── LessonScreen.tsx        # Ders ekranı
│       ├── PracticeScreen.tsx      # Pratik ekranı
│       ├── GameScreen.tsx          # Oyun ekranı
│       └── ProfileScreen.tsx       # Profil ekranı
├── App.tsx                         # Ana uygulama bileşeni
├── app.json                        # Expo yapılandırması
├── package.json                    # Bağımlılıklar
└── README.md                       # Bu dosya
```

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Primary**: #4A90E2 (Mavi)
- **Secondary**: #FF6B6B (Kırmızı)
- **Accent**: #FFD93D (Sarı)
- **Success**: #4CAF50 (Yeşil)
- **Background**: #FFFFFF (Beyaz)

### Tipografi
- **Başlıklar**: 24-32px, 700-800 weight
- **Alt başlıklar**: 16-18px, 600 weight
- **Gövde metni**: 14-16px, 400-500 weight

### Bileşenler
- Yuvarlatılmış köşeler (12-16px)
- Gölge efektleri
- Gradient arka planlar
- İnteraktif durumlar

## 🎯 Hedef Kitle

- **Yaş**: 6-12 yaş arası çocuklar
- **Deneyim**: Satranç bilmeyenler
- **Amaç**: Eğlenceli ve etkili öğrenme

## 🔮 Gelecek Özellikler

- [ ] Çok oyunculu mod
- [ ] Ses efektleri ve müzik
- [ ] Daha fazla ders içeriği
- [ ] Ebeveyn kontrol paneli
- [ ] Çevrimdışı mod
- [ ] Sosyal özellikler

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Geliştirici**: [Adınız]
- **Email**: [email@example.com]
- **Proje Linki**: [https://github.com/username/chess-learning-app]

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! 