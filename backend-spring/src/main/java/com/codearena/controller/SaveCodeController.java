package com.codearena.controller;
import org.springframework.http.*;import org.springframework.web.bind.annotation.*;import java.util.*;
@RestController public class SaveCodeController {
 @PostMapping("/api/save-code") public ResponseEntity<?> save(@RequestBody Map<String,Object>b){return ResponseEntity.ok(Map.of("success",true));}
 @GetMapping("/api/save-code") public ResponseEntity<?> load(@RequestParam(required=false)String problemId,@RequestParam(required=false)String language,@RequestParam(required=false)String userId){Map<String,Object>out=new LinkedHashMap<>();out.put("code",null);return ResponseEntity.ok(out);}}
