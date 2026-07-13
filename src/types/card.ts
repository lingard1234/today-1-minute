export interface CardNews {
  /** 카드 고유 id (YYYYMMDD 형식 문자열 권장) */
  id: string;
  /** 발행일 (YYYY-MM-DD) */
  date: string;
  /** 카테고리 뱃지 (예: 경제, 사회, IT) */
  category: string;
  /** 카드 이미지 위에 노출되는 굵은 헤드라인 */
  title: string;
  /** 상세 화면에 노출되는 요약 본문 (문단 구분은 \n\n) */
  summary: string;
  /** 기사와 관련된 실사 이미지 URL (Pexels 등). 없으면 카테고리 아트로 대체돼요. */
  imageUrl?: string;
  /** 출처 (선택) */
  source?: string;
}
