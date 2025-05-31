package com.hms.user.dto;

import com.hms.user.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data/*setter and getter*/
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    @NotBlank(message = "Name is mandatory.")//Validate due to @Valid For UserDTO validations
	private String name;
    @NotBlank(message = "Email is mandatory.")//Validate due to @Valid For UserDTO validations
    @Email(message = "Email should be valid.")//Validate due to  @Valid For UserDTO validations
	private String email;
    @NotBlank(message = "Password is mandatory.")//Validate due to @Valid For UserDTO validations
    //@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]){8,15}$",message = "Password should contains atleast 1 uppercase, 1 lowercase, 1 digit, 1 special character, minimum length should be 8 characters max 15")
	private String password;
	private Roles role;
    private Long profileId;

    public User toEntity(){
        return new User(this.id, this.name, this.email, this.password, this.role, this.profileId);
    }
}
