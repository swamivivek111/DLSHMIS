package com.hms.master.repository;

import com.hms.master.entity.ApplicationSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationSettingRepository extends JpaRepository<ApplicationSetting, Long> {
    
    Optional<ApplicationSetting> findBySettingKey(String settingKey);
    
    List<ApplicationSetting> findByCategory(String category);
    
    List<ApplicationSetting> findByActiveTrue();
    
    List<ApplicationSetting> findByCategoryAndActiveTrue(String category);
    
    boolean existsBySettingKey(String settingKey);
}