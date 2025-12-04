package com.hms.user.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

@Component
public class JwtUtil{
    private static final long JWT_TOKEN_VALIDITY = 2 * 60 * 60L; // 2 hours
    private static final long REFRESH_TOKEN_VALIDITY = 30 * 24 * 60 * 60L; // 30 days
    
    private static final String SECRET = "79fc72a244c391a9ba7efa28137da35d0895fd4795982863d22a21af6099365669e0a2668840a86ca3a9f07ee6c6c92dbf2b0651e5b97b52491ffee356d4dcba";
    private static final SecretKey SIGNING_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());
    
    public String generateToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        CustomUserDetails user = (CustomUserDetails) userDetails;
        claims.put("id", user.getId());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole());
        claims.put("name", user.getName());
        claims.put("profileId", user.getProfileId());
        claims.put("type", "access");
        return doGenerateToken(claims, user.getUsername(), JWT_TOKEN_VALIDITY);
    }
    
    public String generateRefreshToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        CustomUserDetails user = (CustomUserDetails) userDetails;
        claims.put("id", user.getId());
        claims.put("email", user.getEmail());
        claims.put("type", "refresh");
        return doGenerateToken(claims, user.getUsername(), REFRESH_TOKEN_VALIDITY);
    }
    
    private String doGenerateToken(Map<String, Object> claims, String subject, long validity){
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + validity * 1000))
            .signWith(SIGNING_KEY, SignatureAlgorithm.HS512)
            .compact();
    }
    
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }
    
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }
    
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }
    
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(SIGNING_KEY)
            .build()
            .parseClaimsJws(token)
            .getBody();
    }
    
    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    public String getTokenType(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return (String) claims.get("type");
    }
    
    public String doGenerateToken(Map<String, Object> claims, String subject){
        return doGenerateToken(claims, subject, JWT_TOKEN_VALIDITY);
    }
}