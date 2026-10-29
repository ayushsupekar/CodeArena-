package com.codearena.controller;
import org.springframework.beans.factory.annotation.Value;import org.springframework.http.*;import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController public class AdminAuthController {
 @Value("${admin.secret}") String adminSecret;
 @PostMapping("/api/admin/auth") public ResponseEntity<?> login(@RequestBody Map<String,Object>b){if(!adminSecret.equals(b.get("secret")))return ResponseEntity.status(401).body(Map.of("error","Invalid secret"));ResponseCookie cookie=ResponseCookie.from("admin_session","authenticated").httpOnly(true).secure(false).sameSite("Lax").path("/").maxAge(604800).build();return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(Map.of("success",true));}
 @DeleteMapping("/api/admin/auth") public ResponseEntity<?> logout(){ResponseCookie cookie=ResponseCookie.from("admin_session","").httpOnly(true).path("/").maxAge(0).build();return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(Map.of("success",true));}
}
