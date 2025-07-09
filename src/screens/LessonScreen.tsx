import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import { Lessons, Lesson, LessonStep } from '../constants/Lessons';
import ChessBoard from '../components/ChessBoard';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from '../constants/responsive';

const { width, height } = Dimensions.get('window');

interface LessonScreenProps {
  navigation: any;
  route: {
    params: {
      lessonId: number;
      lessonTitle: string;
    };
  };
}

const LessonScreen: React.FC<LessonScreenProps> = ({ navigation, route }) => {
  const { lessonId, lessonTitle } = route.params;
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState<{ row: number; col: number } | null>(null);
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>([]);
  const [pawnPosition, setPawnPosition] = useState({ row: 6, col: 3 }); // Piyon başlangıç pozisyonu
  const [stepCompleted, setStepCompleted] = useState(false); // Adım tamamlandı mı?
  const [moveCount, setMoveCount] = useState(0); // Hamle sayısı

  const lesson = Lessons.find(l => l.id === lessonId);
  const currentLessonStep = lesson?.steps[currentStep];

  if (!lesson || !currentLessonStep) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <Text style={{ fontSize: responsiveFontSize(18), color: Colors.textSecondary }}>
          Ders bulunamadı veya adım eksik.
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: responsiveHeight(3), padding: 16, backgroundColor: Colors.primary, borderRadius: 12 }}>
          <Text style={{ color: Colors.textWhite, fontSize: responsiveFontSize(16) }}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Adım tamamlanma kontrolü
  const checkStepCompletion = () => {
    if (!lesson || !currentLessonStep) return false;
    if (lesson.id === 2 && currentStep === 1) { // Piyon dersi, 2. adım
      // Piyon en az 1 hamle yapmış olmalı
      return moveCount >= 1;
    }
    return true; // Diğer adımlar için varsayılan olarak tamamlandı
  };

  const handleNextStep = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedSquare(null);
      setValidMoves([]);
      setStepCompleted(false);
      setMoveCount(0);
      if (lesson.id === 2) {
        setPawnPosition({ row: 6, col: 3 });
      }
    } else {
      // Lesson completed
      navigation.navigate('Home');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedSquare(null);
      setValidMoves([]);
      setStepCompleted(false);
      setMoveCount(0);
      if (lesson.id === 2) {
        setPawnPosition({ row: 6, col: 3 });
      }
    }
  };

  const handleSquarePress = (row: number, col: number) => {
    if (currentLessonStep.type === 'interactive') {
      if (selectedSquare) {
        const isValidMove = validMoves.some(move => move.row === row && move.col === col);
        if (isValidMove) {
          if (lesson.id === 2 && currentStep === 1) {
            setPawnPosition({ row, col });
            setMoveCount(moveCount + 1);
            setStepCompleted(true); // Piyon hareket ettiyse adım tamamlandı
          }
          setSelectedSquare(null);
          setValidMoves([]);
        } else {
          setSelectedSquare({ row, col });
          generateValidMoves(row, col);
        }
      } else {
        if (lesson.id === 2 && currentStep === 1 && row === pawnPosition.row && col === pawnPosition.col) {
          setSelectedSquare({ row, col });
          generateValidMoves(row, col);
        }
      }
    }
  };

  const generateValidMoves = (row: number, col: number) => {
    if (lesson.id === 2 && currentStep === 1) { // Piyon dersi
      const moves = [];
      if (row > 0) moves.push({ row: row - 1, col });
      if (row === 6) moves.push({ row: row - 2, col });
      setValidMoves(moves);
    } else {
      setValidMoves([
        { row: row + 1, col },
        { row: row - 1, col },
        { row, col: col + 1 },
        { row, col: col - 1 },
      ]);
    }
  };

  const renderStepContent = () => {
    switch (currentLessonStep.type) {
      case 'explanation':
        return (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationText}>
              {currentLessonStep.content.text}
            </Text>
            <View style={styles.illustrationContainer}>
              <Text style={styles.illustrationText}>
                {currentLessonStep.content.image === 'board' && '🏁'}
                {currentLessonStep.content.image === 'pawn' && '♟'}
                {currentLessonStep.content.image === 'rook' && '♜'}
                {currentLessonStep.content.image === 'knight' && '♞'}
                {currentLessonStep.content.image === 'bishop' && '♝'}
                {currentLessonStep.content.image === 'queen' && '♛'}
                {currentLessonStep.content.image === 'king' && '♚'}
                {currentLessonStep.content.image === 'game' && '🎮'}
              </Text>
            </View>
          </View>
        );

      case 'interactive':
        // Piyon dersi için özel taş yerleştirme
        const pieces: Array<{
          type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
          color: 'white' | 'black';
          position: { row: number; col: number };
        }> = [];
        if (lesson.id === 2 && currentStep === 1) { // Piyon dersi, 2. adım
          pieces.push({
            type: 'pawn' as const,
            color: 'white' as const,
            position: pawnPosition // Dinamik piyon pozisyonu
          });
        }
        
        return (
          <View style={styles.interactiveContainer}>
            <Text style={styles.interactiveText}>
              {currentLessonStep.content.task}
            </Text>
            <View style={styles.chessBoardWrapper}>
              <ChessBoard
                pieces={pieces}
                onSquarePress={handleSquarePress}
                selectedSquare={selectedSquare}
                validMoves={validMoves}
                interactive={true}
              />
            </View>
          </View>
        );

      case 'quiz':
        return (
          <View style={styles.quizContainer}>
            <Text style={styles.quizText}>
              {currentLessonStep.content.question}
            </Text>
            {/* Quiz options would go here */}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[lesson.color, `${lesson.color}CC`]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>← Geri</Text>
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{lessonTitle}</Text>
            <Text style={styles.headerSubtitle}>
              Adım {currentStep + 1} / {lesson.steps.length}
            </Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((currentStep + 1) / lesson.steps.length) * 100}%` },
                ]}
              />
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>{currentLessonStep.title}</Text>
          <Text style={styles.stepDescription}>
            {currentLessonStep.description}
          </Text>
          
          {renderStepContent()}
        </View>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.previousButton,
            currentStep === 0 && styles.disabledButton,
          ]}
          onPress={handlePreviousStep}
          disabled={currentStep === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.navButtonText}>← Önceki</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            (!checkStepCompletion() || stepCompleted === false) && styles.disabledButton,
          ]}
          onPress={handleNextStep}
          disabled={!checkStepCompletion() || stepCompleted === false}
          activeOpacity={0.8}
        >
          <Text style={styles.navButtonText}>
            {currentStep === lesson.steps.length - 1 ? 'Bitir ✓' : 'Sonraki →'}
          </Text>
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
    paddingTop: responsiveHeight(7),
    paddingBottom: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(6),
  },
  headerContent: {
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? responsiveHeight(2) : responsiveHeight(7),
    left: responsiveWidth(6),
    zIndex: 1,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: Colors.textWhite,
  },
  headerInfo: {
    alignItems: 'center',
    marginBottom: responsiveHeight(2.5),
  },
  headerTitle: {
    fontSize: responsiveFontSize(24),
    fontWeight: '700',
    color: Colors.textWhite,
    marginBottom: responsiveHeight(1),
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: responsiveFontSize(14),
    color: Colors.textWhite,
    opacity: 0.9,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    height: responsiveHeight(0.8),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
  },
  stepContainer: {
    paddingVertical: responsiveHeight(3),
  },
  stepTitle: {
    fontSize: responsiveFontSize(22),
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: responsiveHeight(1.5),
    lineHeight: responsiveFontSize(28),
  },
  stepDescription: {
    fontSize: responsiveFontSize(16),
    color: Colors.textSecondary,
    lineHeight: responsiveFontSize(24),
    marginBottom: responsiveHeight(4),
  },
  explanationContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: responsiveWidth(6),
    marginBottom: responsiveHeight(3),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  explanationText: {
    fontSize: responsiveFontSize(18),
    color: Colors.textPrimary,
    lineHeight: responsiveFontSize(26),
    marginBottom: responsiveHeight(2),
  },
  illustrationContainer: {
    alignItems: 'center',
    padding: responsiveHeight(2),
  },
  illustrationText: {
    fontSize: responsiveFontSize(64),
  },
  interactiveContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  interactiveText: {
    fontSize: responsiveFontSize(18),
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: responsiveHeight(2),
    lineHeight: responsiveFontSize(26),
  },
  chessBoardWrapper: {
    width: responsiveWidth(90),
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: responsiveWidth(6),
    marginBottom: responsiveHeight(3),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quizText: {
    fontSize: responsiveFontSize(18),
    color: Colors.textPrimary,
    lineHeight: responsiveFontSize(26),
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(2.5),
    paddingBottom: Platform.OS === 'web' ? responsiveHeight(2) : responsiveHeight(4),
    backgroundColor: Colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  navButton: {
    flex: 1,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: responsiveWidth(2),
    minHeight: 44,
    justifyContent: 'center',
  },
  previousButton: {
    backgroundColor: Colors.backgroundDark,
  },
  nextButton: {
    backgroundColor: Colors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});

export default LessonScreen; 