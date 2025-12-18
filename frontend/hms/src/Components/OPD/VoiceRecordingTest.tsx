import { useState, useRef } from 'react';
import { Button, Stack, Text, Alert, Badge } from '@mantine/core';
import { IconMicrophone, IconPlayerStop } from '@tabler/icons-react';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil';

export default function VoiceRecordingTest() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
        successNotification(`Recording completed: ${audioBlob.size} bytes`);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      successNotification('Recording started');
    } catch (error) {
      console.error('Recording error:', error);
      errorNotification('Failed to start recording: ' + error.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Stack gap="md" p="md">
      <Text size="lg" fw={500}>Voice Recording Test</Text>
      
      <Alert color="blue">
        Test your microphone and browser compatibility here before using the treatment feature.
      </Alert>

      {isRecording && (
        <Badge color="red" size="lg">
          🎤 Recording: {formatTime(recordingTime)}
        </Badge>
      )}

      {!isRecording ? (
        <Button
          leftSection={<IconMicrophone size={16} />}
          onClick={startRecording}
          color="green"
          size="lg"
        >
          Start Test Recording
        </Button>
      ) : (
        <Button
          leftSection={<IconPlayerStop size={16} />}
          onClick={stopRecording}
          color="red"
          size="lg"
        >
          Stop Recording
        </Button>
      )}

      {audioUrl && (
        <Stack gap="sm">
          <Text fw={500}>Recorded Audio:</Text>
          <audio controls src={audioUrl} />
          <Button 
            onClick={() => setAudioUrl(null)} 
            variant="outline" 
            size="sm"
          >
            Clear Recording
          </Button>
        </Stack>
      )}
    </Stack>
  );
}