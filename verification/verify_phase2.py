from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Capture console logs
    page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
    page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

    try:
        print("Navigating to page...")
        page.goto("http://localhost:3000")
        page.wait_for_timeout(5000)

        # Take a screenshot
        print("Taking initial screenshot...")
        page.screenshot(path="verification/phase2_landing.png")

        # 1. Verify Landing Section
        print("Verifying Landing Section...")
        if page.is_visible("text=VS Code Active"):
             print("Status text found.")

        if page.is_visible("text=Focus Level"):
             print("Focus Level found.")

        # 2. Verify Scroll Transition
        print("Scrolling to Info Section...")
        # Scroll down 50%
        page.locator("main").evaluate("el => el.scrollTo({top: window.innerHeight, behavior: 'smooth'})")
        page.wait_for_timeout(2000)

        page.screenshot(path="verification/phase2_info_transition.png")

        # Verify Info Section is visible
        if page.is_visible("text=Info Module"):
            print("Info Module found.")

        # Verify Orb Position (Hard to verify exact position with text selector, but screenshot helps)

        # 3. Verify Scroll to Game Section
        print("Scrolling to Game Section...")
        page.locator("main").evaluate("el => el.scrollTo({top: window.innerHeight * 2, behavior: 'smooth'})")
        page.wait_for_timeout(2000)

        page.screenshot(path="verification/phase2_game_section.png")

        if page.is_visible("text=Game Module"):
            print("Game Module found.")

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
