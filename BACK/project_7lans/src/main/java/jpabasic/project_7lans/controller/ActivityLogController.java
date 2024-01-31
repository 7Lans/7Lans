package jpabasic.project_7lans.controller;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.dto.activityLog.ActivityLogRequestDto;
import jpabasic.project_7lans.dto.activityLog.ActivityLogResponseDto;
import jpabasic.project_7lans.service.ActivityLogServiceImpl;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/activityLog")
@RequiredArgsConstructor
@Slf4j
public class ActivityLogController {

    private final ActivityLogServiceImpl activityLogServiceImpl;

    // ==================================================================================================
    // 봉사자

    // 봉사자 활동 일지 조회 리스트
    // Req: volunteerId, relationId, 날짜 정보(년, 월, 일)
    // Res: activityLog id, 날짜 정보(년, 월, 일), 활동 일지 승인 여부
    @PostMapping(value = "/volunteer/list")
    public ResponseEntity<List<ActivityLogResponseDto.detailListByVolunteer>> detailListByVolunteer(@RequestBody @Valid ActivityLogRequestDto.detailListByVolunteer listReqDto) {
        log.info("[ActivityLogController.detailListByVolunteer] data input from FRONT relationId: {} dateInfo: {}", listReqDto.getRelationId(), listReqDto.getDateInfo());
        try{
            System.out.println("ActivityController : " + listReqDto.getRelationId());
            List<ActivityLogResponseDto.detailListByVolunteer> dtoResList = activityLogServiceImpl.detailListByVolunteer(listReqDto);
            log.info("[ActivityLogController.detailListByVolunteer] data output to FRONT size: {}", dtoResList.size());
            return new ResponseEntity<>(dtoResList, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 봉사자 활동 일지 상세 조회
    // Req: volunteerId, relationId, activityLogId
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @PostMapping(value = "/volunteer")
    public ResponseEntity<ActivityLogResponseDto.detailByVolunteer> detailByVolunteer(@RequestBody ActivityLogRequestDto.detailByVolunteer detailReqDto) {
        log.info("[ActivityLogController.detailByVolunteer] data input from FRONT relationId: {} activityLogId: {}", detailReqDto.getRelationId(), detailReqDto.getActivityLogId());
        try{
            ActivityLogResponseDto.detailByVolunteer detailResDto = activityLogServiceImpl.detailByVolunteer(detailReqDto);
            log.info("[ActivityLogController.detailByVolunteer] data output to FRONT");
            return new ResponseEntity<>(detailResDto, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 봉사자 활동 일지 수정(작성 완료일 경우 수정 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음
    @PutMapping(value = "/volunteer/modify")
    public ResponseEntity modifyActivityLogByVolunteer(@RequestBody ActivityLogRequestDto.modifyByVolunteer modifyReqDto){
        log.info("[ActivityLogController.modifyActivityLogByVolunteer] data input from FRONT activityLog: {}", modifyReqDto.getActivityLogId());
        try{
            activityLogServiceImpl.modifyActivityLogByVolunteer(modifyReqDto);
            log.info("[ActivityLogController.modifyActivityLogByVolunteer] modify is done");
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 봉사자 활동 일지 작성 완료(작성 완료 후 동작 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음
    @PutMapping(value = "/volunteer/writeDone")
    public ResponseEntity writeDoneActivityLogByVolunteer(@RequestBody ActivityLogRequestDto.writeDoneByVolunteer writeDoneReqDto){
        log.info("[ActivityLogController.writeDoneActivityLogByVolunteer] activityLog: {}", writeDoneReqDto.getActivityLogId());
        try{
            activityLogServiceImpl.writeDoneActivityLogByVolunteer(writeDoneReqDto);
            log.info("[ActivityLogController.writeDoneActivityLogByVolunteer] modify is done");
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // ==================================================================================================
    // 관리자

    // 관리자 활동 일지 리스트 조회(승인 안된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @GetMapping(value = "/manager/disapprovedList/{centerId}")
    public ResponseEntity<List<ActivityLogResponseDto.listDisapprovedByManager>> listDisapprovedByManager (@PathVariable Long centerId) {
        log.info("[ActivityLogController.listDisapprovedByManager] data input centerId: {}", centerId);
        ActivityLogRequestDto.listDisapprovedByManager reqDto = ActivityLogRequestDto.listDisapprovedByManager.builder()
                .centerId(centerId)
                .build();
        try{
            List<ActivityLogResponseDto.listDisapprovedByManager> resList = activityLogServiceImpl.listDisapprovedByManager(reqDto);
            log.info("[ActivityLogController.listDisapprovedByManager] list is done size: {}", resList.size());
            return new ResponseEntity<>(resList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 관리자 활동 일지 리스트 조회(승인된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @GetMapping(value = "/manager/approvedList/{centerId}")
    public ResponseEntity<List<ActivityLogResponseDto.listApprovedByManager>> listApprovedByManager (@PathVariable Long centerId) {
        log.info("[ActivityLogController.listApprovedByManager] centerId: {}", centerId);
        ActivityLogRequestDto.listApprovedByManager reqDto = ActivityLogRequestDto.listApprovedByManager.builder()
                .centerId(centerId)
                .build();

        try {
            List<ActivityLogResponseDto.listApprovedByManager> resList = activityLogServiceImpl.listApprovedByManager(reqDto);
            log.info("[ActivityLogController.listApprovedByManager] list size: {}", resList.size());
            return new ResponseEntity<List<ActivityLogResponseDto.listApprovedByManager>>(resList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 관리자 활동 일지 상세 조회
    // Req: Relation Id, activityLog Id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @PostMapping(value = "/manager/detail")
    public ResponseEntity<ActivityLogResponseDto.detailByManager> detailByManager (@RequestBody ActivityLogRequestDto.detailByManager reqDto) {
        log.info("[ActivityLogController.detailByManager] output activityLogId: {}", reqDto.getActivityLogId());
        try {
            ActivityLogResponseDto.detailByManager resDto = activityLogServiceImpl.detailByManager(reqDto);
            log.info("[ActivityLogController.detailByManager] output activityLogId: {}", resDto.getActivityLogId());
            return new ResponseEntity<>(resDto, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //승인
    @PostMapping(value = "/manager/approve")
    public ResponseEntity approveByManager (@RequestBody ActivityLogRequestDto.approveByManager approveReqDto) {
        log.info("[ActivityLogController.approveByManager] input activityLogId: {}", approveReqDto.getActivityLogId());
        try{
            activityLogServiceImpl.approveByManager(approveReqDto);
            log.info("[ActivityLogController.approveByManager] approve is done");
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //시작 시간 입력
    @PostMapping(value = "/manager/starttime")
    public ResponseEntity setStartTime (@RequestBody ActivityLogRequestDto.startTime startTime) {
        log.info("[ActivityLogController.setStartTime] relationId: {}, time: {}", startTime.getMeetingId(), startTime.getStartTime());
        try{
            activityLogServiceImpl.setStartTime(startTime);
            log.info("[ActivityLogController.setStartTime] set start time done");
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //종료 시간 입력
    @PostMapping(value = "/manager/endtime")
    public ResponseEntity setEndTime (@RequestBody ActivityLogRequestDto.endTime endTime) {
        log.info("[ActivityLogController.setEndTime] relationId: {}, time: {}", endTime.getMeetingId(), endTime.getEndTime());
        try{
            activityLogServiceImpl.setEndTime(endTime);
            log.info("[ActivityLogController.setEndTime] set end time done");
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
