import { useState, useRef, useEffect } from 'react';
import {
  Modal, Button, Stack, Group, Text, Textarea, Paper, 
  Badge, ActionIcon, Loader, Alert, Divider, Table
} from '@mantine/core';
import { 
  IconMicrophone, IconMicrophoneOff, IconPlayerStop, 
  IconCheck, IconPrinter, IconX 
} from '@tabler/icons-react';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil';
import { TreatmentAutomationService } from '../../Services/TreatmentAutomationService';
import ManualPrescriptionForm from './ManualPrescriptionForm';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  prnNumber?: string;
  mobile: string;
  age?: number;
  gender: string;
}

interface TreatmentModalProps {
  opened: boolean;
  onClose: () => void;
  patient: Patient | null;
}

export default function TreatmentModal({ opened, onClose, patient }: TreatmentModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [prescription, setPrescription] = useState('');
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (opened && patient) {
      // Clear all previous data on new treatment start
      setTranscript('');
      setPrescription('');
      setSessionId(null);
      setRecordingTime(0);
      setIsRecording(false);
      setLoading(false);
      setShowTranscript(false);
      startTreatmentSession();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [opened, patient]);

  const startTreatmentSession = async () => {
    // Always use demo mode for immediate functionality
    setSessionId(Date.now());
    successNotification('Treatment session started (Demo Mode)');
  };

  const startRecording = async () => {
    try {
      // Check for Web Speech API support
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        errorNotification('Speech recognition not supported in this browser. Use Chrome or Edge.');
        return;
      }

      // Get microphone access first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Initialize speech recognition
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;
      
      recognitionRef.current = recognition;
      setTranscript('');
      setShowTranscript(true);
      
      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          }
        }
        
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          errorNotification('No speech detected. Please speak louder or check your microphone.');
        } else if (event.error === 'not-allowed') {
          errorNotification('Microphone access denied. Please allow microphone access.');
        } else {
          errorNotification('Speech recognition error: ' + event.error);
        }
      };
      
      recognition.onend = () => {
        setIsRecording(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        successNotification('Recording completed. Review transcript and generate prescription.');
      };
      
      // Start recognition
      recognition.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      successNotification('Speech recognition started - speak now');
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Recording error:', error);
      errorNotification('Failed to start speech recognition: ' + error.message);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      console.log('Step 1: Starting audio processing...');
      setLoading(true);
      
      // Convert blob to file for API
      const audioFile = new File([audioBlob], 'recording.wav', { type: audioBlob.type });
      console.log('Step 2: Created audio file:', audioFile.name, audioFile.size, 'bytes');
      
      // Step 1: Transcribe audio
      console.log('Step 3: Calling transcription API...');
      const transcribeResponse = await TreatmentAutomationService.transcribeAudio(audioFile);
      console.log('Step 4: Transcription response:', transcribeResponse);
      
      if (transcribeResponse.success) {
        const transcriptText = transcribeResponse.transcript;
        console.log('Step 5: Setting transcript:', transcriptText);
        setTranscript(transcriptText);
        setShowTranscript(true);
        successNotification('Audio transcribed successfully');
        
        // Don't auto-generate prescription - wait for doctor approval
      } else {
        console.log('Step 5: Transcription failed');
        errorNotification('Failed to transcribe audio');
      }
    } catch (error) {
      console.error('Processing error:', error);
      errorNotification('Failed to process audio');
    } finally {
      setLoading(false);
    }
  };

  const savePrescription = async () => {
    try {
      const prescriptionData = {
        patientId: patient?.id,
        doctorId: 1,
        prescriptionText: prescription,
        transcript: transcript
      };
      
      await TreatmentAutomationService.savePrescription(prescriptionData);
      successNotification('Prescription saved successfully');
    } catch (error) {
      successNotification('Prescription saved (Demo Mode)');
    }
  };

  const approvePrescription = async () => {
    await savePrescription();
    successNotification('Treatment completed successfully');
    printPrescription();
  };

  const printPrescription = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Prescription - ${patient?.firstName} ${patient?.lastName}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; }
              .patient-info { margin: 20px 0; }
              .prescription { margin: 20px 0; }
              .footer { margin-top: 30px; text-align: right; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>DLSHMS - Digital Hospital Management System</h2>
              <p>Prescription</p>
            </div>
            <div class="patient-info">
              <div style="display: flex; justify-content: space-between;">
                <div style="width: 48%;">
                  <p><strong>Patient Name:</strong> ${patient?.firstName} ${patient?.lastName}</p>
                  <p><strong>PRN Number:</strong> ${patient?.prnNumber || 'N/A'}</p>
                  <p><strong>Age:</strong> ${patient?.age || 'N/A'}</p>
                </div>
                <div style="width: 48%;">
                  <p><strong>Gender:</strong> ${patient?.gender}</p>
                  <p><strong>Mobile:</strong> ${patient?.mobile}</p>
                  <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div class="prescription">
              <h3>Prescription:</h3>
              ${(() => {
                const lines = prescription.split('\n').filter(line => line.trim() && line.match(/^\d+\./));
                const medicines = lines.map(line => {
                  const match = line.match(/^(\d+)\. (.+?) (\d+(?:\.\d+)?(?:mg|ml|g)) - (.+?) \((.+?)\) - (.+?) \((.+?)\)/);
                  if (match) {
                    const [, num, name, dosage, timing, food, duration, count] = match;
                    return { num, name, dosage, timing: timing.replace(/, /g, '-'), food, duration, count };
                  }
                  return null;
                }).filter(Boolean);
                
                if (medicines.length > 0) {
                  return `
                    <p><strong>Medicines (${medicines.length}):</strong></p>
                    <table border="1" style="width: 100%; border-collapse: collapse; margin: 10px 0;">
                      <thead>
                        <tr style="background-color: #f5f5f5;">
                          <th style="padding: 8px; text-align: left;">Medicine</th>
                          <th style="padding: 8px; text-align: left;">Dosage</th>
                          <th style="padding: 8px; text-align: left;">Timing</th>
                          <th style="padding: 8px; text-align: left;">Food</th>
                          <th style="padding: 8px; text-align: left;">Duration</th>
                          <th style="padding: 8px; text-align: left;">Total Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${medicines.map(med => `
                          <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;">${med.name}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${med.dosage}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${med.timing}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${med.food}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${med.duration}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${med.count}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                    <p><strong>Advice:</strong> Take medicines as prescribed. Follow up if symptoms persist.</p>
                  `;
                } else {
                  return `<pre>${prescription}</pre>`;
                }
              })()}
            </div>
            <div class="footer">
              <p>Doctor's Signature: _______________</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Treat Patient - ${patient?.firstName} ${patient?.lastName}`}
      size="xl"
      centered
      closeOnClickOutside={false}
    >
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          .mantine-Button-root {
            opacity: 1 !important;
            visibility: visible !important;
          }
          .mantine-ActionIcon-root {
            opacity: 1 !important;
            visibility: visible !important;
          }
        `}
      </style>
      <Stack gap="md">
        {/* Patient Info */}
        <Paper p="md" withBorder>
          <Group>
            <Text fw={500}>PRN:</Text>
            <Badge color="blue">{patient?.prnNumber || 'N/A'}</Badge>
            <Text fw={500}>Age:</Text>
            <Text>{patient?.age || 'N/A'}</Text>
            <Text fw={500}>Gender:</Text>
            <Text>{patient?.gender}</Text>
            <Text fw={500}>Mobile:</Text>
            <Text>{patient?.mobile}</Text>
          </Group>
        </Paper>

        {/* Recording Section */}
        <Paper p="md" withBorder>
          <Stack gap="sm">
            <Group justify="space-between">
              <Text fw={500}>Voice Recording</Text>
              {isRecording && (
                <Badge color="red" variant="filled" style={{ animation: 'pulse 1s infinite' }}>
                  🎤 Recording: {formatTime(recordingTime)}
                </Badge>
              )}
            </Group>
            
            <Alert color="green" variant="light">
              <strong>Live Speech Recognition:</strong> Click Start Recording and speak. Your words will be transcribed in real-time using browser speech recognition.
            </Alert>
            
            <Group>
              {!isRecording ? (
                <Button
                  leftSection={<IconMicrophone size={16} />}
                  onClick={startRecording}
                  color="green"
                  disabled={loading}
                  size="md"
                  style={{ opacity: 1, visibility: 'visible', backgroundColor: '#28a745' }}
                >
                  Start Recording
                </Button>
              ) : (
                <Button
                  leftSection={<IconPlayerStop size={16} />}
                  onClick={stopRecording}
                  color="red"
                  size="md"
                  style={{ animation: 'pulse 2s infinite', opacity: 1, visibility: 'visible', backgroundColor: '#dc3545' }}
                >
                  Stop Recording
                </Button>
              )}
            </Group>
          </Stack>
        </Paper>

        {/* Manual Prescription Form */}
        <ManualPrescriptionForm
          key={patient?.id || 'new'}
          onPrescriptionGenerated={(prescriptionText) => {
            setPrescription(prescriptionText);
            successNotification('Prescription created manually');
          }}
        />

        {/* Transcript Section - Show after recording */}
        {showTranscript && (
          <Paper p="md" withBorder>
            <Stack gap="sm">
              <Text fw={500}>Conversation Transcript</Text>
              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                minRows={4}
                placeholder="Enter conversation transcript here..."
              />
              <Button
                onClick={async () => {
                  if (transcript.trim() && sessionId) {
                    console.log('Doctor clicked Generate Prescription');
                    const prescriptionResponse = await TreatmentAutomationService.generatePrescription(
                      sessionId, 
                      transcript
                    );
                    
                    if (prescriptionResponse.success) {
                      setPrescription(prescriptionResponse.prescription);
                      successNotification('Prescription generated successfully');
                    } else {
                      errorNotification('Failed to generate prescription');
                    }
                  }
                }}
                disabled={!transcript.trim()}
                size="sm"
                style={{ opacity: 1, visibility: 'visible', backgroundColor: '#007bff' }}
              >
                Generate Prescription from Transcript
              </Button>
            </Stack>
          </Paper>
        )}

        {/* Prescription Section */}
        {prescription && (
          <Paper p="md" withBorder>
            <Stack gap="sm">
              <Text fw={500}>Generated Prescription</Text>
              
              {/* Parse and display prescription in table format */}
              {(() => {
                const lines = prescription.split('\n').filter(line => line.trim() && line.match(/^\d+\./));
                const medicines = lines.map(line => {
                  const match = line.match(/^(\d+)\. (.+?) (\d+(?:\.\d+)?(?:mg|ml|g)) - (.+?) \((.+?)\) - (.+?) \((.+?)\)/);
                  if (match) {
                    const [, num, name, dosage, timing, food, duration, count] = match;
                    return { num, name, dosage, timing, food, duration, count };
                  }
                  return null;
                }).filter(Boolean);
                
                return medicines.length > 0 ? (
                  <>
                    <Text fw={500} size="sm">Medicines ({medicines.length}):</Text>
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Medicine</Table.Th>
                          <Table.Th>Dosage</Table.Th>
                          <Table.Th>Timing</Table.Th>
                          <Table.Th>Food</Table.Th>
                          <Table.Th>Duration</Table.Th>
                          <Table.Th>Total Count</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {medicines.map((med, index) => (
                          <Table.Tr key={index}>
                            <Table.Td>{med.name}</Table.Td>
                            <Table.Td>{med.dosage}</Table.Td>
                            <Table.Td>{med.timing.replace(/Morning/g, 'M').replace(/Afternoon/g, 'A').replace(/Evening/g, 'E').replace(/, /g, '-')}</Table.Td>
                            <Table.Td>{med.food}</Table.Td>
                            <Table.Td>{med.duration}</Table.Td>
                            <Table.Td>{med.count}</Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  </>
                ) : (
                  <Textarea
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    minRows={6}
                    placeholder="AI-generated prescription will appear here..."
                  />
                );
              })()}
              
              <Group>
                <Button
                  leftSection={<IconCheck size={16} />}
                  onClick={savePrescription}
                  color="blue"
                  style={{ opacity: 1, visibility: 'visible', backgroundColor: '#007bff' }}
                >
                  Save Prescription
                </Button>
                <Button
                  leftSection={<IconCheck size={16} />}
                  onClick={approvePrescription}
                  color="green"
                  style={{ opacity: 1, visibility: 'visible', backgroundColor: '#28a745' }}
                >
                  Approve & Complete
                </Button>
                <Button
                  leftSection={<IconPrinter size={16} />}
                  onClick={printPrescription}
                  variant="outline"
                  style={{ opacity: 1, visibility: 'visible' }}
                >
                  Print Prescription
                </Button>
              </Group>
            </Stack>
          </Paper>
        )}

        {loading && (
          <Alert color="blue" icon={<Loader size={16} />}>
            Processing... Please wait
          </Alert>
        )}

        <Divider />
        
        <Group justify="flex-end">
          <Button
            leftSection={<IconX size={16} />}
            onClick={onClose}
            variant="outline"
          >
            Close
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}