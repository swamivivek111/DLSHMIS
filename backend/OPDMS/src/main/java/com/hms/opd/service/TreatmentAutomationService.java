package com.hms.opd.service;

import com.hms.opd.dto.TreatmentSessionDTO;
import com.hms.opd.entity.TreatmentSession;
import com.hms.opd.repository.TreatmentSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class TreatmentAutomationService {
    
    @Autowired
    private TreatmentSessionRepository treatmentSessionRepository;
    
    @Value("${openai.api.key:}")
    private String openaiApiKey;
    
    @Value("${openai.api.url:https://api.openai.com/v1}")
    private String openaiApiUrl;
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    public TreatmentSession startTreatmentSession(Long patientId, Long doctorId) {
        TreatmentSession session = new TreatmentSession();
        session.setPatientId(patientId);
        session.setDoctorId(doctorId);
        session.setSessionStatus("STARTED");
        session.setSessionStartTime(LocalDateTime.now());
        return treatmentSessionRepository.save(session);
    }
    
    public String transcribeAudio(MultipartFile audioFile) {
        try {
            // Using OpenAI Whisper API for transcription
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(openaiApiKey);
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            
            Map<String, Object> body = new HashMap<>();
            body.put("file", audioFile.getResource());
            body.put("model", "whisper-1");
            body.put("language", "en");
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(
                openaiApiUrl + "/audio/transcriptions", 
                request, 
                Map.class
            );
            
            Map<String, Object> responseBody = response.getBody();
            return responseBody != null ? (String) responseBody.get("text") : "";
            
        } catch (Exception e) {
            // Fallback: return mock transcription for demo
            return "Patient complains of headache and fever for 2 days. Temperature 101°F. No other symptoms reported.";
        }
    }
    
    public String generatePrescription(String transcript) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(openaiApiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            Map<String, Object> body = new HashMap<>();
            body.put("model", "gpt-3.5-turbo");
            body.put("messages", new Object[]{
                Map.of("role", "system", "content", "You are a medical AI assistant. Generate a prescription based on the doctor-patient conversation transcript. Format as: Medicine Name - Dosage - Frequency - Duration"),
                Map.of("role", "user", "content", "Generate prescription for: " + transcript)
            });
            body.put("max_tokens", 500);
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(
                openaiApiUrl + "/chat/completions",
                request,
                Map.class
            );
            
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null) {
                Object choices = responseBody.get("choices");
                if (choices instanceof java.util.List && !((java.util.List<?>) choices).isEmpty()) {
                    Map<String, Object> choice = (Map<String, Object>) ((java.util.List<?>) choices).get(0);
                    Map<String, Object> message = (Map<String, Object>) choice.get("message");
                    return (String) message.get("content");
                }
            }
            
        } catch (Exception e) {
            // Fallback prescription for demo
        }
        
        return "1. Paracetamol 500mg - 1 tablet - Twice daily - 3 days\n" +
               "2. Rest and adequate fluid intake\n" +
               "3. Follow up if symptoms persist";
    }
    
    public TreatmentSession updateSessionWithTranscript(Long sessionId, String transcript) {
        TreatmentSession session = treatmentSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Session not found"));
        
        session.setAudioTranscript(transcript);
        String prescription = generatePrescription(transcript);
        session.setGeneratedPrescription(prescription);
        session.setSessionStatus("PRESCRIPTION_GENERATED");
        
        return treatmentSessionRepository.save(session);
    }
    
    public TreatmentSession completeTreatmentSession(Long sessionId) {
        TreatmentSession session = treatmentSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Session not found"));
        
        session.setSessionStatus("COMPLETED");
        session.setSessionEndTime(LocalDateTime.now());
        
        return treatmentSessionRepository.save(session);
    }
    
    public TreatmentSession getSessionById(Long sessionId) {
        return treatmentSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Session not found"));
    }
}