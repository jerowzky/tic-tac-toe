import { Footer } from "@/components/footer";
import { Game } from "@/components/game";
import { GameInstructions } from "@/components/game-instructions";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className=" w-full flex-1 px-4 pb-6 sm:px-6 grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] max-[830px]:grid-cols-[minmax(0,1fr)] gap-8">
        <Game />
        <GameInstructions />
      </main>
      <Footer />
    </div>
  );
}
