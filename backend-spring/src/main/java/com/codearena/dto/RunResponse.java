package com.codearena.dto;

import lombok.Data;

@Data
public class RunResponse {
    private String stdout;
    private String stderr;
    private String compile_output;
    private String message;
    private String time;
    private Integer memory;
    private StatusDto status;

    @Data
    public static class StatusDto {
        private Integer id;
        private String description;
    }
}
