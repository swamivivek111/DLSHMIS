package com.hms.master.dto;

import jakarta.validation.constraints.NotBlank;

public class ApplicationSettingDTO {
    private Long id;
    
    @NotBlank(message = "Setting key is required")
    private String settingKey;
    
    private String settingValue;
    private String category;
    private String dataType;
    private String description;
    private Boolean active = true;

    // Constructors
    public ApplicationSettingDTO() {}
    
    public ApplicationSettingDTO(String settingKey, String settingValue, String category, String dataType) {
        this.settingKey = settingKey;
        this.settingValue = settingValue;
        this.category = category;
        this.dataType = dataType;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getSettingKey() { return settingKey; }
    public void setSettingKey(String settingKey) { this.settingKey = settingKey; }
    
    public String getSettingValue() { return settingValue; }
    public void setSettingValue(String settingValue) { this.settingValue = settingValue; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getDataType() { return dataType; }
    public void setDataType(String dataType) { this.dataType = dataType; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}