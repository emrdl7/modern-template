# macOS Photos(사진 앱)에서 최신 또는 두 번째 사진 불러오기 (AppleScript 활용)

- AppleScript를 사용하여 macOS 사진 앱에서 사진을 자동으로 추출하는 방법.
- 예시: 최신에서 두 번째 사진 가져오기

### 1. AppleScript 예제 (최신 두 번째 사진의 파일 경로 추출)

```applescript
tell application "Photos"
    set recentPhotos to (get media items of album "Recents")
    set countPhoto to count of recentPhotos
    if countPhoto ≥ 2 then
        set secondPhoto to item 2 of recentPhotos
        set imageFilename to filename of secondPhoto
        -- 파일 경로 자체는 직접 추출이 어렵지만, export 명령 활용 가능
        set targetPath to (POSIX path of (path to desktop)) & imageFilename
        export secondPhoto to targetPath with using originals
        return targetPath
    else
        return "사진이 두 장 미만입니다."
    end if
end tell
```

### 2. 동작 방식
- "최근 항목(Recents)" 앨범의 두 번째 사진을 찾음
- 사진을 바탕화면(Desktop)으로 내보내기(export)
- 내보낸 사진의 경로를 반환

> 이 스크립트를 터미널에서 `osascript`로 실행하면 gpt, sonnet 등 모든 모델에서 동일하게 활용할 수 있습니다.
> 오류 발생 시 앨범 이름이나 내보내기 권한을 확인하세요.

---
참고: 사진 앱의 파일 시스템 내 저장 경로는 외부에서 직접 접근하지 못할 수 있습니다. export 방식을 추천합니다.

(2026-02-12 잡스 요청, 자동화·gpt 활용 목적 메모)

---

## 작업 위임 규칙 (2026-02-13)

- GPT(gpt-4.1)가 실제 작업을 수행하지 않더라도, 야옹이(sonnet)가 직접 대신 처리하지 말 것
- 어떻게든 GPT를 시키는 방향으로 해결할 것 (프롬프트 재시도, 세션 재시작, 방법 변경 등)
- 잡스의 명시적 요청: "GPT 안 하면 니가 하지 말고, 어떻게든 GPT 시켜"