#!/bin/bash

echo "🎮 Satranç Öğreniyorum - Kurulum Başlatılıyor..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js bulunamadı. Lütfen Node.js'i yükleyin: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js 16 veya üzeri gerekli. Mevcut sürüm: $(node -v)"
    exit 1
fi

echo "✅ Node.js sürümü: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm bulunamadı. Lütfen npm'i yükleyin."
    exit 1
fi

echo "✅ npm sürümü: $(npm -v)"

# Install dependencies
echo ""
echo "📦 Bağımlılıklar yükleniyor..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Bağımlılıklar başarıyla yüklendi!"
else
    echo "❌ Bağımlılık yükleme hatası!"
    exit 1
fi

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo ""
    echo "📱 Expo CLI yükleniyor..."
    npm install -g @expo/cli
    
    if [ $? -eq 0 ]; then
        echo "✅ Expo CLI başarıyla yüklendi!"
    else
        echo "❌ Expo CLI yükleme hatası!"
        exit 1
    fi
else
    echo "✅ Expo CLI zaten yüklü: $(expo --version)"
fi

echo ""
echo "🎉 Kurulum tamamlandı!"
echo ""
echo "🚀 Uygulamayı başlatmak için:"
echo "   npm start"
echo ""
echo "📱 Mobil cihazda test etmek için:"
echo "   1. Expo Go uygulamasını indirin"
echo "   2. QR kodu tarayın"
echo ""
echo "💻 Emülatörde test etmek için:"
echo "   - iOS: Terminal'de 'i' tuşuna basın"
echo "   - Android: Terminal'de 'a' tuşuna basın"
echo ""
echo "📚 Daha fazla bilgi için README.md dosyasını okuyun." 