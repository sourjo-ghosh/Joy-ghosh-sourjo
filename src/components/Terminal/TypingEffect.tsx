import { useTypingEffect } from '../../hooks/useTypingEffect';

interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
}

export const TypingEffect = ({ text, speed = 50, className = '', showCursor = true }: TypingEffectProps) => {
  const { displayedText, isTyping } = useTypingEffect(text, speed);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && isTyping && (
        <span className="inline-block w-2 h-5 bg-terminal-green ml-1 animate-blink" />
      )}
    </span>
  );
};

