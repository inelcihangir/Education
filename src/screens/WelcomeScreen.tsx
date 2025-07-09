import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from '../constants/responsive';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  navigation: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>🎮 Satranç Öğreniyorum</Text>
            <Text style={styles.subtitle}>
              Satranç dünyasına hoş geldin! Eğlenceli derslerle satranç öğrenelim.
            </Text>
          </View>

          {/* Chess Board Illustration */}
          <View style={styles.chessIllustration}>
            <View style={styles.boardContainer}>
              {Array.from({ length: 8 }, (_, row) => (
                <View key={row} style={styles.boardRow}>
                  {Array.from({ length: 8 }, (_, col) => (
                    <View
                      key={col}
                      style={[
                        styles.boardSquare,
                        {
                          backgroundColor:
                            (row + col) % 2 === 0
                              ? Colors.boardLight
                              : Colors.boardDark,
                        },
                      ]}
                    />
                  ))}
                </View>
              ))}
            </View>
            <View style={styles.pieceOverlay}>
              <Text style={styles.pieceText}>♟♜♞♝♛♚</Text>
            </View>
          </View>

          {/* Features */}
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📚</Text>
              <Text style={styles.featureText}>Kolay Dersler</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureText}>Pratik Yap</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🏆</Text>
              <Text style={styles.featureText}>Başarı Kazan</Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[Colors.accent, Colors.accentDark]}
                style={styles.buttonGradient}
              >
                <Text style={styles.primaryButtonText}>Başlayalım! 🚀</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>
                Zaten biliyorum, oyuna geçelim
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Çocuklar için özel olarak tasarlandı ✨
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: responsiveHeight(5),
  },
  title: {
    fontSize: responsiveFontSize(32),
    fontWeight: '800',
    color: Colors.textWhite,
    textAlign: 'center',
    marginBottom: responsiveHeight(2),
    letterSpacing: 0.8,
    lineHeight: responsiveFontSize(38),
  },
  subtitle: {
    fontSize: responsiveFontSize(18),
    color: Colors.textWhite,
    textAlign: 'center',
    lineHeight: responsiveFontSize(24),
    opacity: 0.9,
  },
  chessIllustration: {
    alignItems: 'center',
    marginVertical: responsiveHeight(5),
  },
  boardContainer: {
    width: responsiveWidth(60),
    height: responsiveWidth(60),
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  boardRow: {
    flexDirection: 'row',
    flex: 1,
  },
  boardSquare: {
    flex: 1,
  },
  pieceOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieceText: {
    fontSize: responsiveFontSize(48),
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: responsiveHeight(2.5),
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: responsiveFontSize(32),
    marginBottom: 8,
  },
  featureText: {
    fontSize: responsiveFontSize(14),
    color: Colors.textWhite,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: responsiveHeight(5),
  },
  primaryButton: {
    borderRadius: 16,
    marginBottom: responsiveHeight(2),
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    minHeight: 48,
    justifyContent: 'center',
  },
  buttonGradient: {
    paddingVertical: responsiveHeight(2.2),
    paddingHorizontal: responsiveWidth(8),
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: responsiveFontSize(20),
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  secondaryButton: {
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(8),
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: responsiveFontSize(16),
    color: Colors.textWhite,
    fontWeight: '500',
    opacity: 0.8,
  },
  footer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(2.5),
  },
  footerText: {
    fontSize: responsiveFontSize(14),
    color: Colors.textWhite,
    opacity: 0.7,
  },
});

export default WelcomeScreen; 