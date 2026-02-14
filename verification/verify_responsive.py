
from playwright.sync_api import sync_playwright
import time

def verify_responsive():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Desktop Viewport
        page_desktop = browser.new_page(viewport={"width": 1920, "height": 1080})
        page_desktop.goto("http://localhost:3000")
        time.sleep(5) # Wait for animations and loading screen
        page_desktop.screenshot(path="verification/desktop_landing.png")
        print("Captured desktop screenshot")

        # Mobile Viewport (iPhone 14 Pro)
        iphone = p.devices['iPhone 14 Pro']
        context_mobile = browser.new_context(**iphone)
        page_mobile = context_mobile.new_page()
        page_mobile.goto("http://localhost:3000")
        time.sleep(5) # Wait for animations and loading screen
        page_mobile.screenshot(path="verification/mobile_landing.png")
        print("Captured mobile screenshot")

        browser.close()

if __name__ == "__main__":
    verify_responsive()
