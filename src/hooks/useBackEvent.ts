import { graniteEvent } from "@apps-in-toss/web-framework";
import { useEffect, useRef } from "react";

/**
 * 토스 내비게이션 바의 뒤로가기(안드로이드 하드웨어 뒤로가기, iOS 스와이프 포함)를 가로채요.
 * 구독하지 않으면 뒤로가기가 미니앱 자체를 닫으므로, 미니앱 안에서 이전 화면으로
 * 돌아가야 하는 화면에서만 사용해요.
 *
 * 내비게이션 바가 이미 뒤로가기 버튼을 제공하기 때문에 화면에 별도 뒤로가기 버튼을
 * 두면 심사에서 중복으로 반려돼요.
 */
export function useBackEvent(onBack: () => void) {
  const handlerRef = useRef(onBack);
  handlerRef.current = onBack;

  useEffect(() => {
    try {
      return graniteEvent.addEventListener("backEvent", {
        onEvent: () => handlerRef.current(),
      });
    } catch {
      // 토스 앱 환경이 아닐 때(예: 로컬 vite dev)는 브릿지가 주입되지 않아 무시해요.
    }
  }, []);
}
