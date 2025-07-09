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
import { Lessons, Lesson } from '../constants/Lessons';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const getProgressPercentage = () => {
    const totalLessons = Lessons.length;
    const completed = completedLessons.length;
    return Math.round((completed / totalLessons) * 100);
  };

  const renderLessonCard = (lesson: Lesson) => {
    const isCompleted = completedLessons.includes(lesson.id);
    const isLocked = lesson.isLocked;

    return (
      <TouchableOpacity
        key={lesson.id}
        style={[
          styles.lessonCard,
          isLocked && styles.lockedCard,
        ]}
        onPress={() => {
          if (!isLocked) {
            navigation.navigate('Lesson', {
              lessonId: lesson.id,
              lessonTitle: lesson.title,
            });
          }
        }}
        disabled={isLocked}
      >
        <LinearGradient
          colors={[lesson.color, `${lesson.color}CC`]}
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.lessonIcon}>{lesson.icon}</Text>
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDescription}>{lesson.description}</Text>
            </View>
            {isCompleted && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>✓</Text>
              </View>
            )}
            {isLocked && (
              <View style={styles.lockedBadge}>
                <Text style={styles.lockedText}>🔒</Text>
              </View>
            )}
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.difficultyContainer}>
              <Text style={styles.difficultyText}>
                {lesson.difficulty === 'beginner' ? 'Başlangıç' :
                 lesson.difficulty === 'intermediate' ? 'Orta' : 'İleri'}
              </Text>
            </View>
            <Text style={styles.stepCount}>{lesson.steps.length} adım</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>🎯 Satranç Öğreniyorum</Text>
          <Text style={styles.headerSubtitle}>
            İlerleme: %{getProgressPercentage()}
          </Text>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${getProgressPercentage()}%` },
                ]}
              />
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Practice', { pieceType: 'pawn' })}
          >
            <Text style={styles.quickActionIcon}>♟️</Text>
            <Text style={styles.quickActionText}>Piyon Pratiği</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Game', { difficulty: 'easy' })}
          >
            <Text style={styles.quickActionIcon}>🎮</Text>
            <Text style={styles.quickActionText}>Kolay Oyun</Text>
          </TouchableOpacity>
        </View>

        {/* Lessons Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Dersler</Text>
          <Text style={styles.sectionSubtitle}>
            Satranç taşlarını ve kurallarını öğrenelim
          </Text>
        </View>

        {/* Lesson Cards */}
        <View style={styles.lessonsContainer}>
          {Lessons.map(renderLessonCard)}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textWhite,
    marginBottom: 8,
    letterSpacing: 0.8,
    lineHeight: 34,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textWhite,
    opacity: 0.9,
    marginBottom: 16,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 32,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 6,
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
  quickActionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  lessonsContainer: {
    marginBottom: 20,
  },
  lessonCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  lockedCard: {
    opacity: 0.6,
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  lessonIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textWhite,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: Colors.textWhite,
    opacity: 0.9,
    lineHeight: 20,
  },
  completedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textWhite,
  },
  lockedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedText: {
    fontSize: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  stepCount: {
    fontSize: 14,
    color: Colors.textWhite,
    opacity: 0.8,
  },
  bottomSpacing: {
    height: 100,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 34,
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
});

export default HomeScreen; 