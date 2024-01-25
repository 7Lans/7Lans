package jpabasic.project_7lans.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChildCenter {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private String phoneNumber;

    @OneToMany(mappedBy = "childCenter", cascade = CascadeType.ALL)
    private List<CenterRelation> centerRelationList = new ArrayList<>();

    @OneToMany(mappedBy = "childCenter", cascade = CascadeType.ALL)
    private List<CenterActivityLog> centerActivityLogList = new ArrayList<>();

    public void addCenterRelation(CenterRelation centerRelation){
        centerRelation.setChildCenter(this);
        this.centerRelationList.add(centerRelation);
    }

    public void addCenterActivityLog (CenterActivityLog centerActivityLog){
        centerActivityLog.setChildCenter(this);
        this.centerActivityLogList.add(centerActivityLog);
    }

    @Builder
    public static ChildCenter createChildCenter (
            String name,
            String address,
            String phoneNumber
    ){
        return ChildCenter.builder()
                .name(name)
                .address(address)
                .phoneNumber(phoneNumber)
                .build();
    }
}
