import { Text } from "@toss/tds-mobile";
import { useState } from "react";

import { useTheme } from "../contexts/ThemeContext";
import { formatShortDate, formatWeekday } from "../utils/date";
import { CalendarIcon, CloseIcon } from "./icons";

interface DateSelectorProps {
  selectedDate: string;
  availableDates: string[];
  onSelectDate: (date: string) => void;
}

export function DateSelector({
  selectedDate,
  availableDates,
  onSelectDate,
}: DateSelectorProps) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="날짜 선택"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "5px 10px",
          borderRadius: 999,
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.surface,
        }}
      >
        <CalendarIcon size={13} color={theme.accent} />
        <Text typography="st11" fontWeight="bold" color={theme.textPrimary}>
          {formatShortDate(selectedDate)} ({formatWeekday(selectedDate)})
        </Text>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 30,
            background: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              maxHeight: "70vh",
              overflowY: "auto",
              backgroundColor: theme.surface,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: "16px 20px calc(20px + env(safe-area-inset-bottom))",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text
                typography="t5"
                fontWeight="bold"
                color={theme.textPrimary}
              >
                날짜 선택
              </Text>
              <button
                onClick={() => setOpen(false)}
                aria-label="닫기"
                style={{ background: "none", border: "none", padding: 4 }}
              >
                <CloseIcon size={20} color={theme.textSecondary} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {availableDates.map((date) => {
                const active = date === selectedDate;
                return (
                  <button
                    key={date}
                    onClick={() => {
                      onSelectDate(date);
                      setOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 10px",
                      borderRadius: 12,
                      background: active ? theme.accentSoft : "none",
                      border: "none",
                      textAlign: "left",
                    }}
                  >
                    <Text
                      typography="st5"
                      fontWeight={active ? "bold" : "medium"}
                      color={active ? theme.accent : theme.textPrimary}
                    >
                      {formatShortDate(date)} ({formatWeekday(date)})
                    </Text>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
