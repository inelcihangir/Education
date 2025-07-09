import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import ChessBoard from '../components/ChessBoard';

const { width } = Dimensions.get('window');

interface GameScreenProps {
  navigation: any;
  route: {
    params: {
      difficulty: 'easy' | 'medium' | 'hard';
    };
  };
}

const GameScreen: React.FC<GameScreenProps> = ({ navigation, route }) => {
  const { difficulty } = route.params;
  const [gameState, setGameState] = useState<'playing' | 'checkmate' | 'stalemate'>('playing');
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const [selectedSquare, setSelectedSquare] = useState<{ row: number; col: number } | null>(null);
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>([]);
  const [moveCount, setMoveCount] = useState(0);

  const getDifficultyName = (diff: string) => {
    switch (diff) {
      case 'easy': return 'Kolay';
      case 'medium': return 'Orta';
      case 'hard': return 'Zor';
      default: return 'Kolay';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return Colors.success;
      case 'medium': return Colors.accent;
      case 'hard': return Colors.secondary;
      default: return Colors.success;
    }
  };

  const handleSquarePress = (row: number, col: number) => {
    if (gameState !== 'playing') return;

    if (selectedSquare) {
      // Make a move
      const isValidMove = validMoves.some(move => move.row === row && move.col === col);
      if (isValidMove) {
        // Execute move logic here
        setMoveCount(moveCount + 1);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        
        // Simple AI move for demo
        setTimeout(() => {
          if (currentPlayer === 'white') {
            // AI makes a move
            setCurrentPlayer('black');
            setMoveCount(moveCount + 2);
          }
        }, 1000);
      }
      
      setSelectedSquare(null);
      setValidMoves([]);
    } else {
      // Select a piece
      setSelectedSquare({ row, col });
      // Generate valid moves for the selected piece
      setValidMoves([
        { row: row + 1, col },
        { row: row - 1, col },
        { row, col: col + 1 },
        { row, col: col - 1 },
      ]);
    }
  };

  const handleResign = () => {
    Alert.alert(
      'Oyundan Çık',
      'Oyundan çıkmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Çık', onPress: () => navigation.goBack() },
      ]
    );
  };

  const handleNewGame = () => {
    setGameState('playing');
    setCurrentPlayer('white');
    setSelectedSquare(null);
    setValidMoves([]);
    setMoveCount(0);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[getDifficultyColor(difficulty), `${getDifficultyColor(difficulty)}CC`]}
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
            <Text style={styles.headerTitle}>
              🎮 Satranç Oyunu
            </Text>
            <Text style={styles.headerSubtitle}>
              {getDifficultyName(difficulty)} Seviye
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Game Info */}
      <View style={styles.gameInfoContainer}>
        <View style={styles.gameInfo}>
          <View style={styles.playerInfo}>
            <Text style={styles.playerLabel}>
              {currentPlayer === 'white' ? 'Sen (Beyaz)' : 'Bilgisayar (Siyah)'}
            </Text>
            <Text style={styles.playerStatus}>
              {currentPlayer === 'white' ? 'Senin sıran' : 'Bilgisayar düşünüyor...'}
            </Text>
          </View>
          
          <View style={styles.gameStats}>
            <Text style={styles.statLabel}>Hamle</Text>
            <Text style={styles.statValue}>{moveCount}</Text>
          </View>
        </View>
      </View>

      {/* Chess Board */}
      <View style={styles.boardContainer}>
        <ChessBoard
          onSquarePress={handleSquarePress}
          selectedSquare={selectedSquare}
          validMoves={validMoves}
          interactive={currentPlayer === 'white' && gameState === 'playing'}
        />
      </View>

      {/* Game Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.controlButtons}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleNewGame}
          >
            <Text style={styles.controlButtonText}>🔄 Yeni Oyun</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.controlButton, styles.resignButton]}
            onPress={handleResign}
          >
            <Text style={styles.controlButtonText}>🏳️ Pes Et</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Game Over Modal */}
      {gameState !== 'playing' && (
        <View style={styles.gameOverOverlay}>
          <View style={styles.gameOverModal}>
            <Text style={styles.gameOverTitle}>
              {gameState === 'checkmate' ? 'Şah Mat!' : 'Beraberlik!'}
            </Text>
            <Text style={styles.gameOverText}>
              {gameState === 'checkmate' 
                ? 'Tebrikler! Oyunu kazandınız!' 
                : 'Oyun beraberlikle sonuçlandı.'}
            </Text>
            
            <View style={styles.gameOverButtons}>
              <TouchableOpacity
                style={styles.gameOverButton}
                onPress={handleNewGame}
              >
                <Text style={styles.gameOverButtonText}>Yeni Oyun</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.gameOverButton, styles.menuButton]}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.gameOverButtonText}>Ana Menü</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    paddingBottom: 20,
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
  gameInfoContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  playerInfo: {
    flex: 1,
  },
  playerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  playerStatus: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  gameStats: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  controlsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: 34,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  resignButton: {
    backgroundColor: Colors.secondary,
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  gameOverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverModal: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: 32,
    marginHorizontal: 40,
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  gameOverTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  gameOverText: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
  },
  gameOverButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  gameOverButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  menuButton: {
    backgroundColor: Colors.secondary,
  },
  gameOverButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textWhite,
  },
});

export default GameScreen; 