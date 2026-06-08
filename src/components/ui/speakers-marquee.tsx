import { cn } from "../../lib/utils";

type Speaker = {
  name: string;
  title: string;
  img: string;
  bio: string;
  sessions: string[];
};

interface SpeakersMarqueeProps {
  speakers: Speaker[];
  onSpeakerClick: (speaker: Speaker) => void;
}

const SpeakerCard = ({
  speaker,
  onSpeakerClick,
}: {
  speaker: Speaker;
  onSpeakerClick: (speaker: Speaker) => void;
}) => {
  return (
    <figure
      className={cn(
        "relative p-8 h-full w-64 cursor-pointer overflow-hidden rounded-sm border bg-[rgba(255,255,255,0.05)]",
        // light styles
        "border-blue-400/20 bg-blue-950/10 hover:bg-blue-950/20",
        "backdrop-blur-sm transition-all duration-300 hover:scale-105"
      )}
      onClick={() => onSpeakerClick(speaker)}
    >
      <div className="flex flex-col items-center gap-4">
        <img 
          className="rounded-full border-2 border-blue-400/30" 
          width="80" 
          height="80" 
          alt={speaker.name} 
          src={speaker.img}
          style={{ 
            objectFit: 'cover', 
            aspectRatio: '1/1',
            objectPosition: speaker.name === 'Mark Gough' ? '50% 10%' : '50% 50%'
          }}
        />
        <div className="flex flex-col text-center">
          <figcaption className="text-lg font-bold text-blue-200">
            {speaker.name}
          </figcaption>
          <p className="speaker-card-title text-xs">{speaker.title}</p>
        </div>
      </div>
    </figure>
  );
};

export function SpeakersMarquee({ speakers, onSpeakerClick }: SpeakersMarqueeProps) {
  return (
    <div className="relative w-full py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {speakers.map((speaker, index) => (
          <SpeakerCard
            key={`${speaker.name}-${index}`}
            speaker={speaker}
            onSpeakerClick={onSpeakerClick}
          />
        ))}
      </div>
    </div>
  );
}
