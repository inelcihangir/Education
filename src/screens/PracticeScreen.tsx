import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import ChessBoard from '../components/ChessBoard';

const { width } = Dimensions.get('window');

interface PracticeScreenProps {
  navigation: any;
  route: {
    params: {
      pieceType?: string;
    };
  };
}

const PracticeScreen: React.FC<PracticeScreenProps> = ({ navigation, route }) => {
  const { pieceType = 'pawn' } = route.params;
  const [selectedSquare, setSelectedSquare] = useState<{ row: number; col: number } | null>(null);
  const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  const getPieceSymbol = (type: string) => {
    const symbols: { [key: string]: string } = {
      pawn: '♟',
      rook: '♜',
      knight: '♞',
      bishop: '♝',
      queen: '♛',
      king: '♚',
    };
    return symbols[type] || '♟';
  };

  const getPieceName = (type: string) => {
    const names: { [key: string]: string } = {
      pawn: 'Piyon',
      rook: 'Kale',
      knight: 'At',
      bishop: 'Fil',
      queen: 'Vezir',
      king: 'Şah',
    };
    return names[type] || 'Piyon';
  };

  const generateValidMoves = (row: number, col: number, piece: string) => {
    const moves: { row: number; col: number }[] = [];
    
    switch (piece) {
      case 'pawn':
        // Pawn moves forward
        if (row > 0) moves.push({ row: row - 1, col });
        if (row === 6) moves.push({ row: row - 2, col }); // First move can be 2 squares
        break;
      case 'rook':
        // Rook moves horizontally and vertically
        for (let i = 0; i < 8; i++) {
          if (i !== row) moves.push({ row: i, col });
          if (i !== col) moves.push({ row, col: i });
        }
        break;
      case 'knight':
        // Knight moves in L-shape
        const knightMoves = [
          { row: row - 2, col: col - 1 }, { row: row - 2, col: col + 1 },
          { row: row - 1, col: col - 2 }, { row: row - 1, col: col + 2 },
          { row: row + 1, col: col - 2 }, { row: row + 1, col: col + 2 },
          { row: row + 2, col: col - 1 }, { row: row + 2, col: col + 1 },
        ];
        knightMoves.forEach(move => {
          if (move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8) {
            moves.push(move);
          }
        });
        break;
      case 'bishop':
        // Bishop moves diagonally
        for (let i = 1; i < 8; i++) {
          if (row - i >= 0 && col - i >= 0) moves.push({ row: row - i, col: col - i });
          if (row - i >= 0 && col + i < 8) moves.push({ row: row - i, col: col + i });
          if (row + i < 8 && col - i >= 0) moves.push({ row: row + i, col: col - i });
          if (row + i < 8 && col + i < 8) moves.push({ row: row + i, col: col + i });
        }
        break;
      case 'queen':
        // Queen moves like rook + bishop
        for (let i = 0; i < 8; i++) {
          if (i !== row) moves.push({ row: i, col });
          if (i !== col) moves.push({ row, col: i });
        }
        for (let i = 1; i < 8; i++) {
          if (row - i >= 0 && col - i >= 0) moves.push({ row: row - i, col: col - i });
          if (row - i >= 0 && col + i < 8) moves.push({ row: row - i, col: col + i });
          if (row + i < 8 && col - i >= 0) moves.push({ row: row + i, col: col - i });
          if (row + i < 8 && col + i < 8) moves.push({ row: row + i, col: col + i });
        }
        break;
      case 'king':
        // King moves one square in any direction
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        }
        break;
    }
    
    return moves;
  };

  const handleSquarePress = (row: number, col: number) => {
    if (selectedSquare) {
      // Check if the move is valid
      const isValidMove = validMoves.some(move => move.row === row && move.col === col);
      if (isValidMove) {
        setScore(score + 10);
        setMoves(moves + 1);
      }
      setSelectedSquare(null);
      setValidMoves([]);
    } else {
      // Select a piece
      setSelectedSquare({ row, col });
      const moves = generateValidMoves(row, col, pieceType);
      setValidMoves(moves);
    }
  };

  const resetPractice = () => {
    setSelectedSquare(null);
    setValidMoves([]);
    setScore(0);
    setMoves(0);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
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
              {getPieceSymbol(pieceType)} {getPieceName(pieceType)} Pratiği
            </Text>
            <Text style={styles.headerSubtitle}>
              Taşın nasıl hareket ettiğini öğrenelim
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Puan</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Hamle</Text>
          <Text style={styles.statValue}>{moves}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Ortalama</Text>
          <Text style={styles.statValue}>
            {moves > 0 ? Math.round(score / moves) : 0}
          </Text>
        </View>
      </View>

      {/* Chess Board */}
      <View style={styles.boardContainer}>
        <ChessBoard
          onSquarePress={handleSquarePress}
          selectedSquare={selectedSquare}
          validMoves={validMoves}
          interactive={true}
        />
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Nasıl Oynanır?</Text>
        <Text style={styles.instructionsText}>
          1. Bir taşa dokunun{'\n'}
          2. Yeşil noktalar geçerli hamleleri gösterir{'\n'}
          3. Geçerli bir hamle yapın ve puan kazanın{'\n'}
          4. Doğru hamleler 10 puan verir
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetPractice}
        >
          <Text style={styles.resetButtonText}>Yeniden Başla</Text>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 24,
    marginTop: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  instructionsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  controlsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: 34,
  },
  resetButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textWhite,
  },
});

export default PracticeScreen; 