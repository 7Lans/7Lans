package jpabasic.project_7lans.member.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jpabasic.project_7lans.member.dto.child.ChildRequestDto;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerRequestDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.childCenter.service.ChildCenterService;
import jpabasic.project_7lans.member.service.ChildService;
import jpabasic.project_7lans.member.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="관리자 API", description = "관리자 관련 API입니다.")
@RestController
@RequestMapping(value = "/manager")
@RequiredArgsConstructor
public class ManagerController {

    private final ChildCenterService childCenterService;
    private final ChildService childService;
    private final VolunteerService volunteerService;
    
    //센터의 봉사자 리스트
    @Operation(summary = "해당 센터의 아동과 친구추가 되어 있는 봉사자 리스트")
    @GetMapping("/volunteers/{centerId}")
    public ResponseEntity<List<VolunteerResponseDto.list>> volunteerList(@PathVariable("centerId") Long centerId){
        try{
            List<VolunteerResponseDto.list> volunteers = childCenterService.volunteerList(centerId);
            return new ResponseEntity<List<VolunteerResponseDto.list>>(volunteers, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //센터 아동 리스트
    @Operation(summary = "해당 센터의 아동 리스트")
    @GetMapping("/child/{centerId}")
    public ResponseEntity<List<ChildResponseDto.noRelationList>> childList(@PathVariable("centerId") Long centerId){
        try{
            List<ChildResponseDto.noRelationList> children = childCenterService.childList(centerId);
            System.out.println(children.size());
            return new ResponseEntity<List<ChildResponseDto.noRelationList>>(children, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //특이사항 작성하기
    @Operation(summary = "해당 센터의 아동의 특이사항 작성하기")
    @PostMapping("/content")
    public ResponseEntity writeContent(@RequestBody ChildRequestDto.childWithContent childWithContent){
        try{

            childService.modifyContent(childWithContent);
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "봉사자 전체 조회")
    @GetMapping("/volunteerList")
    public ResponseEntity<VolunteerResponseDto.listByManager> getVolunteerList(){
        try{
            List<VolunteerResponseDto.listByManager> list = volunteerService.volunteerListAllByManager();
            return new ResponseEntity(list, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //이름으로 전체 봉사자 검색(관리자용)
    @Operation(summary = "관리페이지에서 봉사자 이름으로 검색 후 검색 리스트 출력")
    @PostMapping("/searchVolunteer")
    public ResponseEntity<List<VolunteerResponseDto.noRelationList>> volunteersearchByName(@RequestBody VolunteerRequestDto.detailByName reqDto){
        try{
            List<VolunteerResponseDto.noRelationList> volunteers = volunteerService.volunteerListByName(reqDto);
            return new ResponseEntity<>(volunteers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
