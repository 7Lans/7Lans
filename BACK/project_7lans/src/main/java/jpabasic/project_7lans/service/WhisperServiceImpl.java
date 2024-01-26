package jpabasic.project_7lans.service;

import jpabasic.project_7lans.dto.whisepr.WhisperRequestDto;
import jpabasic.project_7lans.dto.whisepr.WhisperResponseDto;
import jpabasic.project_7lans.entity.Member;
import jpabasic.project_7lans.entity.Relation;
import jpabasic.project_7lans.entity.Whisper;
import jpabasic.project_7lans.repository.MemberRepository;
import jpabasic.project_7lans.repository.RelationRepository;
import jpabasic.project_7lans.repository.WhisperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WhisperServiceImpl implements WhisperService{

    private final MemberRepository memberRepository;
    private final RelationRepository relationRepository;
    private final WhisperRepository whisperRepository;

    // 생성
    // 속닥속닥 하나 작성. (작성자 Id, 상대방과의 관계 Id, 작성 내용 데이터 필요)
    public void createWhisper(WhisperRequestDto.create whisperCreateDto){
        Member member = memberRepository.findById(whisperCreateDto.getWriterId())
                .orElseThrow(()-> new IllegalArgumentException("[WhisperServiceImpl.createWhisper] no such member"));

        Relation relation = relationRepository.findById(whisperCreateDto.getRelationId())
                .orElseThrow(()-> new IllegalArgumentException("[WhisperServiceImpl.createWhisper] no such Relation"));


        Whisper whisper = Whisper.createWhisper(member, whisperCreateDto.getContent());

        relation.addWhisperList(whisper);

        // addWhisperList에 대한 테스트 필요.
        // whisperRepository.save(whisper);
    };

    // 조회
    // 나와 상대방의 관계의 속닥속닥 리스트 전체 조회 (관계 Id로 조회)
    public List<WhisperResponseDto.detail> whisperList(WhisperRequestDto.listById whisperListDto){
        Relation relation = relationRepository.findById(whisperListDto.getRelationId())
                .orElseThrow(()->new IllegalArgumentException("[WhisperServiceImpl.whisperList] no such relation"));

        List<Whisper> whisperList = relation.getWhisperList();
        List<WhisperResponseDto.detail> whisperDtoList = new ArrayList<>();

        int size = whisperList.size();
        for(int i=0; i<size; i++){
            whisperDtoList.add(WhisperResponseDto.detail.toDetailDto(whisperList.get(i)));
        }

        return whisperDtoList;
    };

    // 나와 상대방의 관계에서 내가 읽지 않은 속닥속닥 리스트 전체 조회 (관계 Id 필요)
    public List<WhisperResponseDto.detail> whisperListUnread(WhisperRequestDto.listById whisperListDto){
        Relation relation = relationRepository.findById(whisperListDto.getRelationId())
                .orElseThrow(()->new IllegalArgumentException("[WhisperServiceImpl.whisperList] no such relation"));

        List<Whisper> whisperList = relation.getWhisperList();
        List<WhisperResponseDto.detail> whisperDtoList = new ArrayList<>();

        int size = whisperList.size();
        for(int i=0; i<size; i++){
            if(!whisperList.get(i).isReadStatus()) whisperDtoList.add(WhisperResponseDto.detail.toDetailDto(whisperList.get(i)));
        }

        return whisperDtoList;
    };

    // 속닥속닥 한 건 조회. (관계 Id, 해당 속닥속닥 Id 필요)
    public WhisperResponseDto.detail whisperDetail(WhisperRequestDto.detailById whisperDetailDto){
        Whisper whisper = whisperRepository.findById(whisperDetailDto.getWhisperId())
                .orElseThrow(()->new IllegalArgumentException("[WhisperServiceImpl.whisperDetail] no such whisper"));

        return WhisperResponseDto.detail.toDetailDto(whisper);
    };
}
