package com.hms.user.entity;

import com.hms.user.dto.Roles;
import com.hms.user.dto.UserDTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data/*setter and getter*/
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String name;
	@Column(unique = true)
	private String email;
	private String password;
	private Roles role;
    private Long profileId;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role userRole;
    
    private Boolean active = true;
	
	public UserDTO toUserDTO(){
        UserDTO dto = new UserDTO();
        dto.setId(this.id);
        dto.setName(this.name);
        dto.setEmail(this.email);
        dto.setPassword(this.password);
        dto.setRole(this.role);
        dto.setProfileId(this.profileId);
        dto.setActive(this.active);
        return dto;
    }
}
