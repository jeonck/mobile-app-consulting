// Section configuration - matches markdown files
const sections = [
    { id: 'summary', title: '1. 검토 자료 핵심 메시지', mdFile: 'content/01-summary.md' },
    { id: 'app-types', title: '2. 모바일 앱의 이해: 유형별 특징', mdFile: 'content/00-app-types.md' },
    { id: 'checklist', title: '3. 검토 항목', mdFile: 'content/02-checklist.md' },
    { id: 'comparison', title: '4. 대안 비교표', mdFile: 'content/03-comparison.md' },
    { id: 'pwa-recommendation', title: '5. PWA 우선 검토 권고', mdFile: 'content/04-pwa-recommendation.md' },
    { id: 'criteria', title: '6. 앱 도입 필요성 판단 기준', mdFile: 'content/05-criteria.md' },
    { id: 'metrics', title: '7. 수집해야 할 정량 데이터', mdFile: 'content/06-metrics.md' },
    { id: 'security', title: '8. 보안·품질·정책 부담', mdFile: 'content/07-security.md' },
    { id: 'cost', title: '9. 비용 산정 기준', mdFile: 'content/08-cost.md' },
    { id: 'real-data', title: '10. 실증 자료: 하이브리드 앱 전환', mdFile: 'content/08-1-real-data.md' },
    { id: 'conclusion', title: '11. 보고서 결론', mdFile: 'content/09-conclusion.md' },
    { id: 'benchmark', title: '12. 벤치마킹 및 사례', mdFile: 'content/11-benchmark.md' },
    { id: 'roadmap', title: '13. 추천 추진 순서', mdFile: 'content/10-roadmap.md' }
];

// Mermaid diagrams
const mermaidDiagrams = {
    decisionFlow: `graph TD
    A["모바일 서비스 분석 시작"] --> B{"현재 모바일웹 운영 중?"}
    B -->|"Yes"| C["이용 데이터 수집 2~3개월"]
    B -->|"No"| D["모바일웹 재구축 우선"]
    D --> C
    C --> E{"재방문 빈도 높은가?"}
    E -->|"Yes"| F{"푸시/기기연동 필요한가?"}
    E -->|"No"| G["모바일웹 고도화 권장"]
    F -->|"Yes"| H{"예산/운영인력 확보 가능한가?"}
    F -->|"No"| I["PWA 전환 권장"]
    H -->|"Yes"| H1{"네이티브 수준 성능 필요한가?"}
    H -->|"No"| H2{"기존 웹 자산 활용도 높은가?"}
    H1 -->|"Yes"| J["크로스플랫폼 앱 MVP 개발"]
    H1 -->|"No"| H2
    H2 -->|"Yes"| K["하이브리드 앱 권장(WebView+브릿지)"]
    H2 -->|"No"| L1["앱 패키징 권장(WebView/TWA)"]
    G --> L["1단계 완료"]
    I --> L
    J --> M["4단계: 점진적 확대"]
    K --> L
    L1 --> L
    L --> N["정기적 재평가"]
    M --> N`,

    comparisonChart: `quadrantChart
    title "모바일 채널 대안 비교 (비용 vs 기능)"
    x-axis "낮은 비용" --> "높은 비용"
    y-axis "제한적 기능" --> "풍부한 기능"
    "모바일웹": [0.15, 0.30]
    "PWA": [0.25, 0.50]
    "앱 래핑": [0.35, 0.45]
    "하이브리드 앱": [0.45, 0.60]
    "크로스플랫폼": [0.65, 0.75]
    "네이티브": [0.90, 0.90]`,

    roadmapFlow: `graph LR
    S1["1단계: 데이터 수집"] --> S2["2단계: 5개 시나리오 비교"]
    S2 --> S3{"3단계: 의사결정"}
    S3 -->|"Go"| S4A["앱 추진"]
    S3 -->|"Hold"| S4B["유지"]
    S3 -->|"PWA"| S4C["PWA 전환"]
    S3 -->|"웹고도화"| S4D["웹 개선"]
    S4A --> S4A1{"어떤 방식으로?"}
    S4A1 -->|"저비용"| S4A2["앱 패키징/TWA"]
    S4A1 -->|"중저비용"| S4A3["하이브리드 앱"]
    S4A1 -->|"중고비용"| S4A4["크로스플랫폼 MVP"]
    S4A1 -->|"고비용"| S4A5["네이티브 앱"]
    S4A2 --> S5["출시 및 확대"]
    S4A3 --> S5
    S4A4 --> S5
    S4A5 --> S5`
};

// Configure marked once at load time
if (typeof marked !== 'undefined') {
    marked.setOptions({
        breaks: true,
        gfm: true
    });
}

// Markdown to HTML converter
function markdownToHtml(md) {
    if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
        return marked.parse(md);
    }
    // Fallback: basic conversion without library
    return md
        .replace(/^### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^## (.*$)/gim, '<h3>$1</h3>')
        .replace(/^# (.*$)/gim, '<h2>$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        .replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')
        .replace(/\n/g, '<br>');
}

// Load markdown file
async function loadMarkdown(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error('HTTP ' + response.status + ' for ' + filePath);
        }
        return await response.text();
    } catch (error) {
        console.error('Error loading markdown:', error);
        return '<div class="callout callout-danger"><div class="callout-title">오류</div><p>콘텐츠를 불러오지 못했습니다: ' + filePath + '</p><p>로컬 서버(http-server)에서 열어주세요.</p></div>';
    }
}

// Render Mermaid diagrams
async function renderMermaidDiagrams() {
    var container = document.getElementById('mermaid-diagrams');
    if (!container) return;

    container.innerHTML =
        '<h2>의사결정 흐름도</h2>' +
        '<div class="mermaid">' +
        mermaidDiagrams.decisionFlow +
        '</div>' +
        '<div class="mermaid-glossary">' +
        '<h3>용어 설명</h3>' +
        '<table>' +
        '<thead><tr><th>용어</th><th>설명</th></tr></thead>' +
        '<tbody>' +
        '<tr><td><strong>앱 패키징</strong><br>(WebView/TWA)</td><td>기존 웹사이트를 앱 형태로 감싸는 방식입니다.<br>' +
        '<strong>WebView</strong>: 웹페이지를 앱 안에 표시하는 간단한 방식<br>' +
        '<strong>TWA</strong>(Trusted Web Activity): Android 공식 기술로 PWA를 앱처럼 완전 지원</td></tr>' +
        '<tr><td><strong>하이브리드 앱</strong><br>(WebView+브릿지)</td><td>WebView로 웹 콘텐츠를 표시하면서, 성능이 중요한 기능(GPS·카메라·결제 등)은 <strong>네이티브 브릿지</strong>로 연결합니다.<br>앱 래핑보다 기능이 풍부하고, 크로스플랫폼보다 비용이 낮습니다.</td></tr>' +
        '<tr><td><strong>PWA</strong></td><td>Progressive Web App. 웹사이트를 앱처럼 설치·사용할 수 있게 하는 기술</td></tr>' +
        '<tr><td><strong>MVP</strong></td><td>Minimum Viable Product. 최소 기능으로 먼저 출시해 검증하는 방식</td></tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<h2>대안 비교 차트</h2>' +
        '<div class="mermaid">' +
        mermaidDiagrams.comparisonChart +
        '</div>' +
        '<h2>추진 로드맵 흐름</h2>' +
        '<div class="mermaid">' +
        mermaidDiagrams.roadmapFlow +
        '</div>';

    // Use the ESM mermaid instance from window
    var m = window.mermaidInstance;
    if (!m) {
        console.warn('Mermaid not initialized, retrying in 500ms...');
        setTimeout(renderMermaidDiagrams, 500);
        return;
    }

    try {
        var mermaidDivs = container.querySelectorAll('.mermaid');
        for (var i = 0; i < mermaidDivs.length; i++) {
            var el = mermaidDivs[i];
            var code = el.textContent.trim();
            // Use render() API from ESM version
            var result = await m.render('mermaid-' + i, code);
            el.innerHTML = result.svg;
        }
    } catch (e) {
        console.error('Mermaid rendering error:', e);
        var mermaidDivs = container.querySelectorAll('.mermaid');
        for (var j = 0; j < mermaidDivs.length; j++) {
            var el2 = mermaidDivs[j];
            if (!el2.querySelector('svg')) {
                el2.innerHTML = '<pre style="text-align:left;font-size:12px;overflow:auto;">' +
                    escapeHtml(el2.textContent) + '</pre>';
            }
        }
    }
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Render all sections
async function renderContent() {
    var contentEl = document.getElementById('content');
    var tocList = document.getElementById('toc-list');

    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];

        // Add to TOC
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + section.id;
        a.textContent = section.title;
        li.appendChild(a);
        tocList.appendChild(li);

        // Load markdown content
        var mdContent = await loadMarkdown(section.mdFile);

        // Create section
        var sectionEl = document.createElement('section');
        sectionEl.className = 'section';
        sectionEl.id = section.id;
        sectionEl.innerHTML = markdownToHtml(mdContent);

        contentEl.appendChild(sectionEl);
    }

    // Add Mermaid diagrams section
    var mermaidSection = document.createElement('section');
    mermaidSection.className = 'section';
    mermaidSection.id = 'diagrams';
    mermaidSection.innerHTML = '<div id="mermaid-diagrams"></div>';
    contentEl.appendChild(mermaidSection);

    // Add to TOC
    var tocLi = document.createElement('li');
    var tocA = document.createElement('a');
    tocA.href = '#diagrams';
    tocA.textContent = '의사결정 흐름도';
    tocLi.appendChild(tocA);
    tocList.appendChild(tocLi);

    // Render Mermaid diagrams (mermaid already initialized in HTML)
    await renderMermaidDiagrams();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    renderContent();

    // Smooth scroll for TOC links (event delegation)
    document.querySelector('.toc').addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            var targetId = e.target.getAttribute('href').substring(1);
            var targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});
