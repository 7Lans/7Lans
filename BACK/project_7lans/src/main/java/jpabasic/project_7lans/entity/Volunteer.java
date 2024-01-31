package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DiscriminatorValue("VOLUNTEER")
@PrimaryKeyJoinColumn(name="VOLUNTEER_ID")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Volunteer extends Member{

    // ================================================================================================
    // 필드

    private Integer volunteerTime;

    // ================================================================================================
    // 메서드

    // 봉사 시간 추가
    public void addVolunteerTime(Integer time){
        this.volunteerTime += time;
    }

    // ================================================================================================
    // 생성자
    @Builder
    public Volunteer(
            String email,
            String name,
            String password,
            String phoneNumber,
            LocalDate birth,
            DinosaurBook dinosaurBook,
            MemberType memberType
    ){
        super(
                email,
                name,
                password,
                phoneNumber,
                birth,
                dinosaurBook,
                memberType
        );

        this.volunteerTime = 0;
    }

}
