package com.codearena.security;
import jakarta.servlet.FilterChain;import jakarta.servlet.ServletException;import jakarta.servlet.http.HttpServletRequest;import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.OncePerRequestFilter;import java.io.IOException;
@Configuration public class SecurityConfig {
 @Bean BCryptPasswordEncoder passwordEncoder(){return new BCryptPasswordEncoder();}
 @Bean SecurityFilterChain filterChain(HttpSecurity http)throws Exception{
  http.csrf(c->c.disable()).authorizeHttpRequests(a->a.anyRequest().permitAll());
  http.addFilterBefore(new OncePerRequestFilter(){protected void doFilterInternal(HttpServletRequest req,HttpServletResponse res,FilterChain chain)throws ServletException,IOException{
   String path=req.getRequestURI(); if(path.startsWith("/api/admin/")&&!path.equals("/api/admin/auth")){
    String cookie=null;if(req.getCookies()!=null)for(var c:req.getCookies())if("admin_session".equals(c.getName()))cookie=c.getValue();
    if(!"authenticated".equals(cookie)){res.setStatus(401);res.setContentType("application/json");res.getWriter().write("{\"error\":\"Unauthorized\"}");return;}
   } chain.doFilter(req,res);
  }},org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);return http.build();
 }
}
