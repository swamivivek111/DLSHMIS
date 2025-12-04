package com.hms.master.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hms.master.dto.DoctorsScheduleDTO;
import com.hms.master.entity.Department;
import com.hms.master.entity.DoctorsSchedule;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.DoctorsScheduleRepository;

@Service
public class DoctorsScheduleServiceImpl implements DoctorsScheduleService{
    
    @Autowired
    private DoctorsScheduleRepository doctorsScheduleRepository;
    
    @Autowired 
	private APIService apiService;


    @Override
    public DoctorsSchedule getById(Long doctorId) {
        try {
            return doctorsScheduleRepository.findById(doctorId).orElseThrow(() -> new HMSException("DOCTOR_SCHEDULE_NOT_FOUND"));
        } catch (HMSException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<DoctorsScheduleDTO> getAllDoctorsSchedule() {
        return StreamSupport.stream(doctorsScheduleRepository.findAll().spliterator(), false).map(DoctorsSchedule::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<DoctorsScheduleDTO> findByDoctorId(Long doctorId) {
        return doctorsScheduleRepository.findByDoctorId(doctorId).stream().map(DoctorsSchedule::toDTO).collect(Collectors.toList());
    }

    @Override
    public Long createDoctorsSchedule(DoctorsScheduleDTO doctorsScheduleDTO) {
        doctorsScheduleDTO.setCreatedAt(LocalDateTime.now());
        DoctorsSchedule doctorsSchedule = doctorsScheduleDTO.toEntity();
        doctorsSchedule = doctorsScheduleRepository.save(doctorsSchedule);
        return doctorsSchedule.toDTO().getId();
    }

    @Override
    public DoctorsScheduleDTO updateDoctorsSchedule(Long id, DoctorsScheduleDTO doctorsScheduleDTO) throws HMSException {
        DoctorsSchedule existingDoctorsScheduleDTO = doctorsScheduleRepository.findById(id).orElseThrow(() -> new HMSException("DOCTOR_SCHEDULE_NOT_FOUND"));
            existingDoctorsScheduleDTO.setDoctorId(doctorsScheduleDTO.getDoctorId());
            existingDoctorsScheduleDTO.setMorningSlotFrom(doctorsScheduleDTO.getMorningSlotFrom());
            existingDoctorsScheduleDTO.setMorningSlotTo(doctorsScheduleDTO.getMorningSlotTo());
            existingDoctorsScheduleDTO.setAfternoonSlotFrom(doctorsScheduleDTO.getAfternoonSlotFrom());
            existingDoctorsScheduleDTO.setAfternoonSlotTo(doctorsScheduleDTO.getAfternoonSlotTo());
            existingDoctorsScheduleDTO.setEveningSlotFrom(doctorsScheduleDTO.getEveningSlotFrom());
            existingDoctorsScheduleDTO.setEveningSlotTo(doctorsScheduleDTO.getEveningSlotTo());
            existingDoctorsScheduleDTO.setStatus(doctorsScheduleDTO.getStatus());
            existingDoctorsScheduleDTO.setUpdatedAt(LocalDateTime.now());
        DoctorsSchedule updatedDoctor = doctorsScheduleRepository.save(existingDoctorsScheduleDTO);
        return updatedDoctor.toDTO();
    }

    @Override
    public void deleteDoctorsSchedule(Long id) throws HMSException {
        if (!doctorsScheduleRepository.existsById(id)) {
            throw new HMSException("DOCTOR_SCHEDULE_NOT_FOUND");
        }
        doctorsScheduleRepository.deleteById(id);
    }

    @Override
    public Page<DoctorsSchedule> findAll(Pageable pageable) {
        //if (search == null || search.isBlank()) {
            return doctorsScheduleRepository.findAll(pageable);
        //}
        //return doctorsScheduleRepository.findByNameContainingIgnoreCase(search, pageable);
    }


}
