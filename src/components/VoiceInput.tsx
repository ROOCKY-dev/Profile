'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Command } from 'lucide-react';

interface VoiceInputProps {
  onCommand: (text: string) => void;
  onLevelChange: (level: number) => void;
}

export default function VoiceInput({ onCommand, onLevelChange }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      // @ts-ignore
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
        if (event.results[current].isFinal) {
          onCommand(transcriptText);
          setTranscript('');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [onCommand]);

  // Audio Analyzer Loop
  const updateLevel = () => {
    if (!analyserRef.current) return;
    const array = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(array);
    const average = array.reduce((a, b) => a + b, 0) / array.length;
    onLevelChange(average / 255); // Normalize 0-1
    rafRef.current = requestAnimationFrame(updateLevel);
  };

  const toggleListening = async () => {
    if (isListening) {
      recognitionRef.current?.stop();
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      onLevelChange(0);
      setIsListening(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Setup Audio Context for Visualizer
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        sourceRef.current = source;
        
        updateLevel(); // Start loop

        // Start Speech Rec
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error('Microphone access denied:', err);
      }
    }
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-cyan-400 font-mono text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            &quot;{transcript}&quot;
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleListening}
        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] ${
          isListening 
            ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.4)]' 
            : 'bg-white/5 border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400'
        }`}
      >
        {isListening ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
      </motion.button>
      
      <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
        {isListening ? 'Listening...' : 'Click to Speak'}
      </div>
    </div>
  );
}
