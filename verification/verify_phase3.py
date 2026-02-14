from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    try:
        print("Navigating to page...")
        page.goto("http://localhost:3000")
        page.wait_for_timeout(3000)

        # 1. Verify Landing Page & Orb
        print("Taking Landing Screenshot...")
        page.screenshot(path="verification/phase3_landing.png")

        # 2. Verify Transition to Info
        print("Scrolling to Info Section (Transition Check)...")
        page.locator("main").evaluate("el => el.scrollTo({top: window.innerHeight, behavior: 'smooth'})")
        page.wait_for_timeout(2000)
        page.screenshot(path="verification/phase3_transition_info.png")

        # Check if Info Section is visible
        if page.is_visible("text=Info Module"):
            print("Info Module Visible")

        # 3. Verify Game Section
        print("Scrolling to Game Section...")
        page.locator("main").evaluate("el => el.scrollTo({top: window.innerHeight * 2, behavior: 'smooth'})")
        page.wait_for_timeout(2000)
        page.screenshot(path="verification/phase3_game_section.png")

        if page.is_visible("text=Security Breach"):
            print("Game Title Visible")

        # Check if Canvas is present
        if page.locator("canvas").count() > 0:
            print("Game Canvas Found")

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        page.screenshot(path="verification/error_state.png")

    finally:
        browser.close()
        print("Verification finished.")

with sync_playwright() as playwright:
    run(playwright)
