#!/usr/bin/env python3
"""
Собирает готовый самодостаточный HTML-отчёт из заполненного шаблона:
подставляет инлайновые шрифты (fonts-inline.css) и style.css вместо
плейсхолдеров __FONTS_CSS__ / __REPORT_STYLE_CSS__.

Плейсхолдер __HERO_IMAGE_B64__ (base64 скриншота) заполняется отдельно,
до или после этого шага — см. README.md.

Использование:
    python3 build.py content.html output.html
"""
import sys
from pathlib import Path

def main():
    if len(sys.argv) != 3:
        print("Использование: python3 build.py <content.html> <output.html>")
        sys.exit(1)

    here = Path(__file__).parent
    content_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])

    content = content_path.read_text(encoding="utf-8")
    fonts_css = (here / "fonts-inline.css").read_text(encoding="utf-8")
    style_css = (here / "style.css").read_text(encoding="utf-8")

    out = content.replace("__FONTS_CSS__", fonts_css).replace("__REPORT_STYLE_CSS__", style_css)

    if "__HERO_IMAGE_B64__" in out:
        print("Внимание: __HERO_IMAGE_B64__ не заполнен (плейсхолдер остался в файле).")

    output_path.write_text(out, encoding="utf-8")
    print(f"Готово: {output_path} ({output_path.stat().st_size // 1024} КБ)")

if __name__ == "__main__":
    main()
