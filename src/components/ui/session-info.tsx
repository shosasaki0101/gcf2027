import React from "react";

interface Speaker {
  name: string;
  role?: string;
  color?: string;
}

interface SessionInfoProps {
  title: string;
  subtitle?: string;
  speakers?: Speaker[];
  description?: string;
  note?: string;
}

export const SessionInfo: React.FC<SessionInfoProps> = ({
  title,
  subtitle,
  speakers = [],
  description,
  note,
}) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-blue-200 mb-4">{title}</h3>
      
      {subtitle && (
        <h4 className="text-lg font-semibold text-blue-300 mb-3">{subtitle}</h4>
      )}
      
      {speakers.length > 0 && (
        <div className="mb-4">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 text-xl mb-2 ${
                speaker.color || "text-blue-300"
              }`}
            >
              <span>🎤</span>
              <span>
                {speaker.name}
                {speaker.role && ` (${speaker.role})`}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {description && (
        <p className="text-xs text-neutral-300 leading-relaxed mb-2">
          {description}
        </p>
      )}
      
      {note && (
        <p className="text-xs text-neutral-300 leading-relaxed">
          {note}
        </p>
      )}
    </div>
  );
};
