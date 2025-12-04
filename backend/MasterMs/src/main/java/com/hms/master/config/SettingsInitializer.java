package com.hms.master.config;

import com.hms.master.entity.ApplicationSetting;
import com.hms.master.repository.ApplicationSettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class SettingsInitializer implements CommandLineRunner {

    @Autowired
    private ApplicationSettingRepository settingRepository;

    @Override
    public void run(String... args) throws Exception {
        initializeDefaultSettings();
    }

    private void initializeDefaultSettings() {
        List<ApplicationSetting> defaultSettings = Arrays.asList(
            // General Hospital Settings
            new ApplicationSetting("hospital.name", "DLS Multispeciality Hospital", "GENERAL", "STRING"),
            new ApplicationSetting("hospital.branch", "Main Branch", "GENERAL", "STRING"),
            new ApplicationSetting("hospital.code", "DLS-H01", "GENERAL", "STRING"),
            new ApplicationSetting("hospital.email", "admin@dlshmis.com", "GENERAL", "STRING"),
            new ApplicationSetting("hospital.phone", "+91 9876543210", "GENERAL", "STRING"),
            new ApplicationSetting("hospital.timezone", "Asia/Kolkata", "GENERAL", "STRING"),
            
            // Module Settings - All enabled by default
            new ApplicationSetting("module.doctor", "true", "MODULE", "BOOLEAN"),
            new ApplicationSetting("module.pharmacy", "true", "MODULE", "BOOLEAN"),
            new ApplicationSetting("module.laboratory", "true", "MODULE", "BOOLEAN"),
            new ApplicationSetting("module.ipd", "true", "MODULE", "BOOLEAN"),
            new ApplicationSetting("module.appointments", "true", "MODULE", "BOOLEAN"),
            new ApplicationSetting("module.queue", "true", "MODULE", "BOOLEAN"),
            new ApplicationSetting("module.schedule", "true", "MODULE", "BOOLEAN"),
            new ApplicationSetting("module.billing", "true", "MODULE", "BOOLEAN"),
            new ApplicationSetting("module.insurance", "true", "MODULE", "BOOLEAN"),
            
            // Security Settings
            new ApplicationSetting("security.password_expiry", "90", "SECURITY", "STRING"),
            new ApplicationSetting("security.auto_logout", "30", "SECURITY", "STRING"),
            new ApplicationSetting("security.strong_password", "true", "SECURITY", "BOOLEAN"),
            new ApplicationSetting("security.two_factor", "false", "SECURITY", "BOOLEAN"),
            new ApplicationSetting("security.captcha", "false", "SECURITY", "BOOLEAN"),
            
            // Notification Settings
            new ApplicationSetting("notification.email", "true", "NOTIFICATION", "BOOLEAN"),
            new ApplicationSetting("notification.sms", "false", "NOTIFICATION", "BOOLEAN"),
            new ApplicationSetting("notification.whatsapp", "false", "NOTIFICATION", "BOOLEAN"),
            
            // Appointment Settings
            new ApplicationSetting("appointment.slot_duration", "15", "APPOINTMENT", "STRING"),
            new ApplicationSetting("appointment.max_per_slot", "1", "APPOINTMENT", "STRING"),
            new ApplicationSetting("appointment.allow_online", "true", "APPOINTMENT", "BOOLEAN"),
            
            // System Settings
            new ApplicationSetting("system.pagination_size", "10", "SYSTEM", "STRING"),
            new ApplicationSetting("system.theme", "light", "SYSTEM", "STRING"),
            new ApplicationSetting("system.language", "en", "SYSTEM", "STRING")
        );

        for (ApplicationSetting setting : defaultSettings) {
            if (!settingRepository.existsBySettingKey(setting.getSettingKey())) {
                settingRepository.save(setting);
            }
        }
    }
}