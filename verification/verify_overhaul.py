from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 800})

    try:
        print("Navigating...")
        page.goto("http://localhost:3000", timeout=60000)
        page.wait_for_timeout(5000) # Wait for initial animations

        # 1. Landing (Check DecryptText)
        page.screenshot(path="verification/1_landing_overhaul.png")
        print("Landing screenshot taken.")

        # Helper to scroll the main container
        def scroll_main(y_pixels):
            page.evaluate(f"document.querySelector('main').scrollBy(0, {y_pixels})")
            time.sleep(2)

        # 2. Scroll past Landing to Info Section Start (TerminalHero)
        print("Scrolling to Info Section Start (TerminalHero)...")
        scroll_main(800) # Landing Height
        page.screenshot(path="verification/2_terminal_hero.png")

        # 3. Scroll to Timeline (Timeline is second child of InfoSection)
        print("Scrolling to Timeline...")
        scroll_main(800) # TerminalHero Height
        page.screenshot(path="verification/3_timeline_overhaul.png")
        print("Timeline screenshot taken.")

        # 4. Scroll to Hex Core (TechStack)
        print("Scrolling to Hex Core...")
        scroll_main(800) # Timeline Height
        page.screenshot(path="verification/4_hex_core_overhaul.png")
        print("Hex Core screenshot taken.")

        # 5. Scroll to Deployed Systems (Projects)
        print("Scrolling to Deployed Systems...")
        scroll_main(800) # TechStack Height
        page.screenshot(path="verification/5_projects_overhaul.png")
        print("Projects screenshot taken.")

        # 6. Scroll to Game Section
        print("Scrolling to Game Section...")
        scroll_main(800) # Projects Height
        page.screenshot(path="verification/6_game_overhaul.png")
        print("Game Section screenshot taken.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
