package com.hms.user.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil{
    private static final long JWT_TOKEN_VALIDITY=5*60*60L;//5 Hours
    private static final String SECRET="79fc72a244c391a9ba7efa28137da35d0895fd4795982863d22a21af6099365669e0a2668840a86ca3a9f07ee6c6c92dbf2b0651e5b97b52491ffee356d4dcba";//CMD >> C:\Users\Vishwa>node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
    public String generateToken(UserDetails userDetails){
        Map<String, Object> claims=new HashMap<>();
        CustomUserDetails user=(CustomUserDetails) userDetails;
        claims.put("id", user.getId());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole());
        claims.put("name", user.getName());
        claims.put("profileId", user.getProfileId());
        return doGenerateToken(claims, user.getUsername());
    }
    
    public String doGenerateToken(Map<String, Object> claims, String subject){
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis()+JWT_TOKEN_VALIDITY*1000)).signWith(SignatureAlgorithm.HS512, SECRET).compact();
    }
}