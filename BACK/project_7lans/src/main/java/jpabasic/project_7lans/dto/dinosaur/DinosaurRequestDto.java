package jpabasic.project_7lans.dto.dinosaur;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class DinosaurRequestDto {
    @Getter
    @NoArgsConstructor
    public static class acquire {
        private Long memberId;
        private Long relationId;

        @Builder
        acquire(
                Long memberId,
                Long relationId
        ) {
            this.memberId = memberId;
            this.relationId = relationId;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class change {
        private Long memberId;
        private Long dinosaurId;

        @Builder
        change(
                Long memberId,
                Long dinosaurId
        ) {
            this.memberId = memberId;
            this.dinosaurId = dinosaurId;
        }
    }

}
