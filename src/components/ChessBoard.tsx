import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { responsiveWidth, responsiveHeight } from '../constants/responsive';

const { width, height } = Dimensions.get('window');
// Ekranın hem genişliğine hem yüksekliğine göre kare boyut belirle
const BOARD_SIZE = Math.min(responsiveWidth(90), responsiveHeight(50));
const SQUARE_SIZE = BOARD_SIZE / 8;

interface ChessPiece {
  type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
  color: 'white' | 'black';
  position: { row: number; col: number };
}

interface ChessBoardProps {
  pieces?: ChessPiece[];
  onSquarePress?: (row: number, col: number) => void;
  selectedSquare?: { row: number; col: number } | null;
  validMoves?: { row: number; col: number }[];
  interactive?: boolean;
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  pieces = [],
  onSquarePress,
  selectedSquare,
  validMoves = [],
  interactive = true,
}) => {
  const renderSquare = (row: number, col: number) => {
    const isLight = (row + col) % 2 === 0;
    const isSelected = selectedSquare?.row === row && selectedSquare?.col === col;
    const isValidMove = validMoves.some((move: { row: number; col: number }) => move.row === row && move.col === col);
    
    const piece: ChessPiece | undefined = pieces.find((p: ChessPiece) => p.position.row === row && p.position.col === col);
    
    let squareColor = isLight ? Colors.boardLight : Colors.boardDark;
    if (isSelected) {
      squareColor = Colors.boardSelected;
    } else if (isValidMove) {
      squareColor = Colors.boardMove;
    }

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[
          styles.square,
          {
            backgroundColor: squareColor,
            width: SQUARE_SIZE,
            height: SQUARE_SIZE,
          },
        ]}
        onPress={() => onSquarePress?.(row, col)}
        disabled={!interactive}
      >
        {piece && (
          <View style={styles.pieceContainer}>
            <Text style={[
              styles.piece,
              { color: piece.color === 'white' ? '#FFFFFF' : '#000000' }
            ]}>
              {getPieceSymbol(piece.type)}
            </Text>
          </View>
        )}
        {isValidMove && !piece && (
          <View style={styles.moveIndicator}>
            <View style={styles.moveDot} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

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

  const renderBoard = () => {
    const board: React.ReactElement[] = [];
    for (let row = 0; row < 8; row++) {
      const rowSquares: React.ReactElement[] = [];
      for (let col = 0; col < 8; col++) {
        rowSquares.push(renderSquare(row, col));
      }
      board.push(
        <View key={row} style={styles.row}>
          {rowSquares}
        </View>
      );
    }
    return board;
  };

  return (
    <View style={styles.container}>
      <View style={styles.boardContainer}>
        {renderBoard()}
      </View>
      <View style={styles.coordinates}>
        <View style={styles.fileLabels}>
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((file, index) => (
            <Text key={file} style={styles.coordinateLabel}>
              {file}
            </Text>
          ))}
        </View>
        <View style={styles.rankLabels}>
          {[8, 7, 6, 5, 4, 3, 2, 1].map((rank) => (
            <Text key={rank} style={styles.coordinateLabel}>
              {rank}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  boardContainer: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieceContainer: {
    width: SQUARE_SIZE * 0.8,
    height: SQUARE_SIZE * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  piece: {
    fontSize: SQUARE_SIZE * 0.6,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  moveIndicator: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moveDot: {
    width: SQUARE_SIZE * 0.3,
    height: SQUARE_SIZE * 0.3,
    borderRadius: SQUARE_SIZE * 0.15,
    backgroundColor: 'rgba(255, 182, 193, 0.6)',
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  coordinates: {
    position: 'absolute',
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    pointerEvents: 'none',
  },
  fileLabels: {
    position: 'absolute',
    bottom: -responsiveHeight(3),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SQUARE_SIZE / 2,
  },
  rankLabels: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: -responsiveWidth(6),
    justifyContent: 'space-around',
    paddingVertical: SQUARE_SIZE / 2,
  },
  coordinateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});

export default ChessBoard; 