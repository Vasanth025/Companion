import { useState, useEffect } from "react";
import {
  HiOutlineSparkles,
  HiOutlineArrowPath,
  HiOutlinePlay,
  HiOutlinePause,
  HiOutlineCheckBadge
} from "react-icons/hi2";
import { IoGameControllerOutline } from "react-icons/io5";

const EMOJIS = ["🌱", "🌸", "☀️", "🌊", "🌙", "⭐", "🍃", "🦋"];

const Games = () => {
  // Breathing State
  const [breathPhase, setBreathPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  const [breathTimer, setBreathTimer] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPattern, setBreathPattern] = useState<"4-4-4" | "4-7-8">("4-4-4");

  // Memory Game State
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(() => {
    const saved = localStorage.getItem("memory_best_score");
    return saved ? parseInt(saved, 10) : null;
  });

  const initGame = () => {
    const deck = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }));
    setCards(deck);
    setFlippedCards([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev > 1) return prev - 1;

          if (breathPattern === "4-4-4") {
            if (breathPhase === "Inhale") {
              setBreathPhase("Hold");
              return 4;
            } else if (breathPhase === "Hold") {
              setBreathPhase("Exhale");
              return 4;
            } else {
              setBreathPhase("Inhale");
              return 4;
            }
          } else {
            if (breathPhase === "Inhale") {
              setBreathPhase("Hold");
              return 7;
            } else if (breathPhase === "Hold") {
              setBreathPhase("Exhale");
              return 8;
            } else {
              setBreathPhase("Inhale");
              return 4;
            }
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, breathPhase, breathPattern]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newCards = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const nextMoves = moves + 1;
      setMoves(nextMoves);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          setCards((prev) => {
            const updated = prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, matched: true } : c
            );
            if (updated.every((c) => c.matched)) {
              if (bestScore === null || nextMoves < bestScore) {
                setBestScore(nextMoves);
                localStorage.setItem("memory_best_score", nextMoves.toString());
              }
            }
            return updated;
          });
          setFlippedCards([]);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c))
          );
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  const isGameWon = cards.length > 0 && cards.every((c) => c.matched);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-7 rounded-2xl border border-gray-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#841DED] bg-purple-50 px-3 py-1 rounded-md w-fit">
            <IoGameControllerOutline size={16} /> Relax & Mindfulness
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Relaxation & Mindful Games</h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            De-stress with guided box breathing and test your memory.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-center">
          <p className="text-xs text-gray-500 font-semibold">Best Memory Score</p>
          <p className="text-lg font-bold text-gray-900">{bestScore ? `${bestScore} Moves` : "--"}</p>
        </div>
      </div>

      {/* Main Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Breathing Tool (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-7 border border-gray-200 flex flex-col justify-between items-center text-center shadow-xs">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#841DED] bg-[#F3ECFF] px-3 py-1 rounded-md">
              Breathing Assistant
            </span>

            {/* Pattern Switcher */}
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200">
              <button
                onClick={() => {
                  setBreathPattern("4-4-4");
                  setBreathPhase("Inhale");
                  setBreathTimer(4);
                }}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition ${breathPattern === "4-4-4"
                    ? "bg-[#841DED] text-white"
                    : "text-gray-600 hover:text-[#841DED]"
                  }`}
              >
                Box 4-4-4
              </button>
              <button
                onClick={() => {
                  setBreathPattern("4-7-8");
                  setBreathPhase("Inhale");
                  setBreathTimer(4);
                }}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition ${breathPattern === "4-7-8"
                    ? "bg-[#841DED] text-white"
                    : "text-gray-600 hover:text-[#841DED]"
                  }`}
              >
                Calm 4-7-8
              </button>
            </div>
          </div>

          <div className="my-6">
            <h2 className="text-xl font-bold text-gray-900">
              {breathPattern === "4-4-4" ? "Box Breathing" : "Relaxing 4-7-8 Breath"}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {breathPattern === "4-4-4"
                ? "Inhale 4s • Hold 4s • Exhale 4s"
                : "Inhale 4s • Hold 7s • Exhale 8s"}
            </p>
          </div>

          {/* Minimal Concentric Ring Breathing Circle */}
          <div className="my-6 relative flex items-center justify-center">
            <div className="w-56 h-56 rounded-full border-2 border-purple-100 flex items-center justify-center bg-purple-50/30">
              <div
                className={`w-44 h-44 rounded-full bg-[#F3ECFF] border border-purple-200 text-[#841DED] flex flex-col items-center justify-center transition-transform duration-1000 shadow-sm ${breathPhase === "Inhale"
                    ? "scale-110"
                    : breathPhase === "Hold"
                      ? "scale-105"
                      : "scale-95"
                  }`}
              >
                <span className="text-xs font-bold uppercase tracking-widest text-[#841DED]">
                  {breathPhase}
                </span>
                <span className="text-4xl font-extrabold text-[#1F1B2D] mt-1">{breathTimer}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsBreathingActive(!isBreathingActive)}
            className="w-full flex items-center justify-center gap-2 bg-[#841DED] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#7418D9] transition cursor-pointer shadow-sm"
          >
            {isBreathingActive ? <HiOutlinePause size={18} /> : <HiOutlinePlay size={18} />}
            {isBreathingActive ? "Pause Exercise" : "Start Guided Breathing"}
          </button>
        </div>

        {/* Memory Match Game (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-7 border border-gray-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HiOutlineSparkles className="text-[#841DED]" size={18} />
                <h2 className="text-lg font-bold text-gray-900">Memory Match</h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-600 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                  Moves: <strong className="text-[#841DED]">{moves}</strong>
                </span>

                <button
                  onClick={initGame}
                  className="flex items-center gap-1 text-xs font-semibold text-[#841DED] bg-purple-50 px-3 py-1 rounded-lg hover:bg-purple-100 transition cursor-pointer"
                >
                  <HiOutlineArrowPath size={16} /> Reset
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-5">Flip matching pairs to clear the board.</p>

            {/* Game Grid */}
            <div className="grid grid-cols-4 gap-3">
              {cards.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCardClick(c.id)}
                  className={`h-16 rounded-xl text-2xl flex items-center justify-center transition border cursor-pointer ${c.flipped || c.matched
                      ? "bg-purple-50 border-[#841DED]"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                    }`}
                >
                  {c.flipped || c.matched ? c.emoji : "❓"}
                </button>
              ))}
            </div>
          </div>

          {isGameWon && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold text-sm">
                <HiOutlineCheckBadge size={20} /> Puzzle Cleared!
              </div>
              <p className="text-xs text-emerald-600 mt-1">
                You completed the game in <strong>{moves}</strong> moves.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Games;
