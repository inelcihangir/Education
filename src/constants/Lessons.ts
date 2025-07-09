export interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'pieces' | 'moves' | 'strategy' | 'game';
  isCompleted: boolean;
  isLocked: boolean;
  steps: LessonStep[];
  icon: string;
  color: string;
}

export interface LessonStep {
  id: number;
  title: string;
  description: string;
  type: 'explanation' | 'interactive' | 'quiz';
  content: any;
}

export const Lessons: Lesson[] = [
  {
    id: 1,
    title: "Satranç Tahtası",
    description: "Satranç tahtasını ve kareleri öğrenelim!",
    difficulty: "beginner",
    category: "pieces",
    isCompleted: false,
    isLocked: false,
    icon: "🏁",
    color: "#4A90E2",
    steps: [
      {
        id: 1,
        title: "Satranç Tahtası Nedir?",
        description: "8x8 karelik bir tahta üzerinde oynanan bir oyundur.",
        type: "explanation",
        content: {
          text: "Satranç tahtası 8x8 = 64 kareden oluşur. Kareler sırayla açık ve koyu renktedir.",
          image: "board"
        }
      },
      {
        id: 2,
        title: "Kareleri Sayalım",
        description: "Tahtadaki kareleri birlikte sayalım.",
        type: "interactive",
        content: {
          task: "Tahtadaki toplam kare sayısını bul",
          answer: 64
        }
      }
    ]
  },
  {
    id: 2,
    title: "Piyonlar",
    description: "En küçük ama en önemli taşlar!",
    difficulty: "beginner",
    category: "pieces",
    isCompleted: false,
    isLocked: false,
    icon: "♟️",
    color: "#FF6B6B",
    steps: [
      {
        id: 1,
        title: "Piyon Nedir?",
        description: "Her oyuncunun 8 piyonu vardır.",
        type: "explanation",
        content: {
          text: "Piyonlar satranç tahtasının ön sırasında durur. İlk hamlede 1 veya 2 kare ileri gidebilir.",
          image: "pawn"
        }
      },
      {
        id: 2,
        title: "Piyon Hareketi",
        description: "Piyonlar nasıl hareket eder?",
        type: "interactive",
        content: {
          task: "Piyonu doğru şekilde hareket ettir",
          moves: ["forward"]
        }
      }
    ]
  },
  {
    id: 3,
    title: "Kale",
    description: "Düz çizgilerde hareket eden güçlü taş!",
    difficulty: "beginner",
    category: "pieces",
    isCompleted: false,
    isLocked: true,
    icon: "♜",
    color: "#FFD93D",
    steps: [
      {
        id: 1,
        title: "Kale Nedir?",
        description: "Kale düz çizgilerde hareket eder.",
        type: "explanation",
        content: {
          text: "Kale yatay ve dikey olarak istediği kadar kare hareket edebilir.",
          image: "rook"
        }
      }
    ]
  },
  {
    id: 4,
    title: "At",
    description: "L şeklinde hareket eden özel taş!",
    difficulty: "beginner",
    category: "pieces",
    isCompleted: false,
    isLocked: true,
    icon: "♞",
    color: "#4CAF50",
    steps: [
      {
        id: 1,
        title: "At Nedir?",
        description: "At L şeklinde hareket eder.",
        type: "explanation",
        content: {
          text: "At 2 kare düz, sonra 1 kare yan hareket eder.",
          image: "knight"
        }
      }
    ]
  },
  {
    id: 5,
    title: "Fil",
    description: "Çapraz hareket eden hızlı taş!",
    difficulty: "beginner",
    category: "pieces",
    isCompleted: false,
    isLocked: true,
    icon: "♝",
    color: "#9C27B0",
    steps: [
      {
        id: 1,
        title: "Fil Nedir?",
        description: "Fil çapraz hareket eder.",
        type: "explanation",
        content: {
          text: "Fil çapraz olarak istediği kadar kare hareket edebilir.",
          image: "bishop"
        }
      }
    ]
  },
  {
    id: 6,
    title: "Vezir",
    description: "En güçlü taş!",
    difficulty: "intermediate",
    category: "pieces",
    isCompleted: false,
    isLocked: true,
    icon: "♛",
    color: "#FF9800",
    steps: [
      {
        id: 1,
        title: "Vezir Nedir?",
        description: "Vezir hem düz hem çapraz hareket eder.",
        type: "explanation",
        content: {
          text: "Vezir hem kale hem de fil gibi hareket edebilir.",
          image: "queen"
        }
      }
    ]
  },
  {
    id: 7,
    title: "Şah",
    description: "Korunması gereken en önemli taş!",
    difficulty: "intermediate",
    category: "pieces",
    isCompleted: false,
    isLocked: true,
    icon: "♚",
    color: "#E91E63",
    steps: [
      {
        id: 1,
        title: "Şah Nedir?",
        description: "Şah her yöne 1 kare hareket eder.",
        type: "explanation",
        content: {
          text: "Şah her yöne 1 kare hareket edebilir. Şah yakalanırsa oyun biter.",
          image: "king"
        }
      }
    ]
  },
  {
    id: 8,
    title: "İlk Oyun",
    description: "Gerçek bir satranç oyunu oynayalım!",
    difficulty: "beginner",
    category: "game",
    isCompleted: false,
    isLocked: true,
    icon: "🎮",
    color: "#607D8B",
    steps: [
      {
        id: 1,
        title: "Oyun Kuralları",
        description: "Temel oyun kurallarını öğrenelim.",
        type: "explanation",
        content: {
          text: "Beyaz taşlarla başlar. Sırayla hamle yapılır. Şahı korumaya çalışın!",
          image: "game"
        }
      }
    ]
  }
]; 