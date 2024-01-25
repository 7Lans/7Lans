package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@DiscriminatorValue("CHILD")
@PrimaryKeyJoinColumn(name="CHILD_ID")
public class Child extends Member {
    // ==============================================================================================
    // 필드

    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull(message = "[Child] childCenter 은 Null 일 수 없습니다.")
    private ChildCenter childCenter;

    private String specialContent;

    @OneToMany(mappedBy = "child" , cascade = CascadeType.ALL)
    private List<ChildRelation> childRelations = new ArrayList<>();


    // ==============================================================================================
    // 메서드

    public void changeChildCenter(ChildCenter childCenter){
        this.childCenter = childCenter;
    }

    public void changeSpecialContent(String specialContent){
        this.specialContent = specialContent;
    }

    public void addChildRelation(ChildRelation childRelation){
        childRelations.add(childRelation);
        //childRelation.setChild(this);
    }


    // ==============================================================================================
    // 생성자

    public Child(
            String email,
            String name,
            String password,
            String phoneNumber,
            LocalDate birth,
            ChildCenter childCenter,
            DinosaurBook dinosaurBook

    ){
        super(
                email,
                name,
                password,
                phoneNumber,
                birth,
                dinosaurBook
        );
        this.childCenter = childCenter;
        this.specialContent = "";
    }
}
