@echo off
chcp 65001 >nul

echo 🎮 Satranç Öğreniyorum - Kurulum Başlatılıyor...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js bulunamadı. Lütfen Node.js'i yükleyin: https://nodejs.org/
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1,2,3 delims=." %%a in ('node --version') do set NODE_VERSION=%%a
set NODE_VERSION=%NODE_VERSION:~1%
if %NODE_VERSION% lss 16 (
    echo ❌ Node.js 16 veya üzeri gerekli. Mevcut sürüm: 
    node --version
    pause
    exit /b 1
)

echo ✅ Node.js sürümü: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm bulunamadı. Lütfen npm'i yükleyin.
    pause
    exit /b 1
)

echo ✅ npm sürümü: 
npm --version

REM Install dependencies
echo.
echo 📦 Bağımlılıklar yükleniyor...
npm install

if %errorlevel% neq 0 (
    echo ❌ Bağımlılık yükleme hatası!
    pause
    exit /b 1
)

echo ✅ Bağımlılıklar başarıyla yüklendi!

REM Check if Expo CLI is installed
expo --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo 📱 Expo CLI yükleniyor...
    npm install -g @expo/cli
    
    if %errorlevel% neq 0 (
        echo ❌ Expo CLI yükleme hatası!
        pause
        exit /b 1
    )
    
    echo ✅ Expo CLI başarıyla yüklendi!
) else (
    echo ✅ Expo CLI zaten yüklü: 
    expo --version
)

echo.
echo 🎉 Kurulum tamamlandı!
echo.
echo 🚀 Uygulamayı başlatmak için:
echo    npm start
echo.
echo 📱 Mobil cihazda test etmek için:
echo    1. Expo Go uygulamasını indirin
echo    2. QR kodu tarayın
echo.
echo 💻 Emülatörde test etmek için:
echo    - iOS: Terminal'de 'i' tuşuna basın
echo    - Android: Terminal'de 'a' tuşuna basın
echo.
echo 📚 Daha fazla bilgi için README.md dosyasını okuyun.

pause 