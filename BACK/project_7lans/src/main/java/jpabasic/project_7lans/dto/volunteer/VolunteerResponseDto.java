package jpabasic.project_7lans.dto.volunteer;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class VolunteerResponseDto {
    // ===============================================================================
    // 조회

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detail {
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerId 는 null 이 될 수 없습니다.")
        private Long volunteerId;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerEmail 는 null 이 될 수 없습니다.")
        private String volunteerEmail;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerName 는 null 이 될 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerPhoneNumber 는 null 이 될 수 없습니다.")
        private String volunteerPhoneNumber;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerBirth 는 null 이 될 수 없습니다.")
        private LocalDate volunteerBirth;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerProfileImagePath 는 Null 일 수 없습니다.")
        private String volunteerProfileImagePath;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerEnterDate 는 Null 일 수 없습니다.")
        private LocalDateTime volunteerEnterDate;

        @Builder
        detail(
                Long volunteerId,
                String volunteerEmail,
                String volunteerName,
                String volunteerPhoneNumber,
                LocalDate volunteerBirth,
                String volunteerProfileImagePath,
                LocalDateTime volunteerEnterDate
        ){
          this.volunteerId = volunteerId;
          this.volunteerEmail = volunteerEmail;
          this.volunteerName = volunteerName;
          this.volunteerPhoneNumber = volunteerPhoneNumber;
          this.volunteerBirth = volunteerBirth;
          this.volunteerProfileImagePath = volunteerProfileImagePath;
          this.volunteerEnterDate = volunteerEnterDate;
        }
    }

    // ===============================================================================
    // 수정??
}
