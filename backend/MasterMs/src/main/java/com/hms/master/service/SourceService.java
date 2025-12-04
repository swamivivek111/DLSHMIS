package com.hms.master.service;

import com.hms.master.entity.Source;
import com.hms.master.repository.SourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SourceService {
    
    @Autowired
    private SourceRepository repository;
    
    public List<Source> getAllSources() {
        return repository.findAll();
    }
    
    public Optional<Source> getSourceById(Long id) {
        return repository.findById(id);
    }
    
    public Source createSource(Source source) {
        return repository.save(source);
    }
    
    public Source updateSource(Long id, Source source) {
        if (repository.existsById(id)) {
            source.setSourceId(id);
            return repository.save(source);
        }
        throw new RuntimeException("Source not found with id: " + id);
    }
    
    public void deleteSource(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Source not found with id: " + id);
        }
    }
    
    public List<Source> searchSources(String sourceName) {
        return repository.findBySourceNameContainingIgnoreCase(sourceName);
    }
}