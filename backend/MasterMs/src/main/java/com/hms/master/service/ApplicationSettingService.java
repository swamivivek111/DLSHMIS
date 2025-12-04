package com.hms.master.service;

import com.hms.master.dto.ApplicationSettingDTO;
import com.hms.master.entity.ApplicationSetting;
import com.hms.master.repository.ApplicationSettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ApplicationSettingService {
    
    @Autowired
    private ApplicationSettingRepository settingRepository;
    
    public ApplicationSetting createSetting(ApplicationSettingDTO dto) throws RuntimeException {
        if (settingRepository.existsBySettingKey(dto.getSettingKey())) {
            throw new RuntimeException("Setting with key '" + dto.getSettingKey() + "' already exists");
        }
        
        ApplicationSetting setting = new ApplicationSetting();
        setting.setSettingKey(dto.getSettingKey());
        setting.setSettingValue(dto.getSettingValue());
        setting.setCategory(dto.getCategory());
        setting.setDataType(dto.getDataType());
        setting.setDescription(dto.getDescription());
        setting.setActive(dto.getActive());
        
        return settingRepository.save(setting);
    }
    
    public ApplicationSetting updateSetting(String settingKey, String settingValue) throws RuntimeException {
        Optional<ApplicationSetting> existing = settingRepository.findBySettingKey(settingKey);
        
        ApplicationSetting setting;
        if (!existing.isPresent()) {
            // Create new setting if it doesn't exist
            setting = new ApplicationSetting();
            setting.setSettingKey(settingKey);
            setting.setSettingValue(settingValue);
            setting.setCategory("GENERAL");
            setting.setDataType("STRING");
            setting.setActive(true);
            setting.setCreatedAt(LocalDateTime.now());
        } else {
            setting = existing.get();
            setting.setSettingValue(settingValue);
        }
        
        setting.setUpdatedAt(LocalDateTime.now());
        return settingRepository.save(setting);
    }
    
    public void updateMultipleSettings(Map<String, String> settings) throws RuntimeException {
        for (Map.Entry<String, String> entry : settings.entrySet()) {
            updateSetting(entry.getKey(), entry.getValue());
        }
    }
    
    public String getSettingValue(String settingKey) {
        Optional<ApplicationSetting> setting = settingRepository.findBySettingKey(settingKey);
        return setting.map(ApplicationSetting::getSettingValue).orElse(null);
    }
    
    public List<ApplicationSetting> getSettingsByCategory(String category) {
        return settingRepository.findByCategoryAndActiveTrue(category);
    }
    
    public List<ApplicationSetting> getAllActiveSettings() {
        return settingRepository.findByActiveTrue();
    }
    
    public void deleteSetting(String settingKey) throws RuntimeException {
        Optional<ApplicationSetting> setting = settingRepository.findBySettingKey(settingKey);
        if (!setting.isPresent()) {
            throw new RuntimeException("Setting not found: " + settingKey);
        }
        settingRepository.delete(setting.get());
    }
}