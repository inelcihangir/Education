import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [userStats] = useState({
    totalGames: 15,
    gamesWon: 8,
    gamesLost: 5,
    gamesDrawn: 2,
    totalMoves: 342,
    averageMoves: 23,
    lessonsCompleted: 3,
    totalScore: 1250,
  });

  const [achievements] = useState([
    { id: 1, title: 'İlk Hamle', description: 'İlk satranç hamleni yaptın', icon: '🎯', unlocked: true },
    { id: 2, title: 'Piyon Ustası', description: 'Piyon dersini tamamladın', icon: '♟️', unlocked: true },
    { id: 3, title: 'İlk Zafer', description: 'İlk oyununu kazandın', icon: '🏆', unlocked: true },
    { id: 4, title: 'Kale Ustası', description: 'Kale dersini tamamladın', icon: '♜', unlocked: false },
    { id: 5, title: 'At Ustası', description: 'At dersini tamamladın', icon: '♞', unlocked: false },
    { id: 6, title: 'Şah Mat', description: 'İlk şah matını yaptın', icon: '♚', unlocked: false },
  ]);

  const getWinRate = () => {
    if (userStats.totalGames === 0) return 0;
    return Math.round((userStats.gamesWon / userStats.totalGames) * 100);
  };

  const getLevel = () => {
    if (userStats.totalScore < 100) return { level: 1, title: 'Çaylak' };
    if (userStats.totalScore < 300) return { level: 2, title: 'Öğrenci' };
    if (userStats.totalScore < 600) return { level: 3, title: 'Oyuncu' };
    if (userStats.totalScore < 1000) return { level: 4, title: 'Uzman' };
    return { level: 5, title: 'Usta' };
  };

  const levelInfo = getLevel();

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Geri</Text>
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>👤</Text>
            </View>
            <Text style={styles.headerTitle}>Oyuncu Profili</Text>
            <Text style={styles.headerSubtitle}>
              Seviye {levelInfo.level} - {levelInfo.title}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsOverview}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userStats.totalGames}</Text>
            <Text style={styles.statLabel}>Toplam Oyun</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{getWinRate()}%</Text>
            <Text style={styles.statLabel}>Kazanma Oranı</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userStats.totalScore}</Text>
            <Text style={styles.statLabel}>Toplam Puan</Text>
          </View>
        </View>

        {/* Detailed Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Detaylı İstatistikler</Text>
          <View style={styles.detailedStats}>
            <View style={styles.statRow}>
              <Text style={styles.statName}>Kazanılan Oyunlar</Text>
              <Text style={styles.statNumber}>{userStats.gamesWon}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statName}>Kaybedilen Oyunlar</Text>
              <Text style={styles.statNumber}>{userStats.gamesLost}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statName}>Beraberlikler</Text>
              <Text style={styles.statNumber}>{userStats.gamesDrawn}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statName}>Toplam Hamle</Text>
              <Text style={styles.statNumber}>{userStats.totalMoves}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statName}>Ortalama Hamle</Text>
              <Text style={styles.statNumber}>{userStats.averageMoves}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statName}>Tamamlanan Dersler</Text>
              <Text style={styles.statNumber}>{userStats.lessonsCompleted}</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Başarılar</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.lockedAchievement,
                ]}
              >
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                </View>
                {achievement.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <Text style={styles.unlockedText}>✓</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Ayarlar</Text>
          <View style={styles.settingsContainer}>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🔊</Text>
              <Text style={styles.settingText}>Ses Ayarları</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🎨</Text>
              <Text style={styles.settingText}>Görünüm</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>📱</Text>
              <Text style={styles.settingText}>Hakkında</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  headerInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textWhite,
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textWhite,
    opacity: 0.9,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  statsOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  detailedStats: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  statName: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  unlockedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textWhite,
  },
  settingsContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  settingArrow: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  bottomSpacing: {
    height: 40,
  },
});

export default ProfileScreen; 