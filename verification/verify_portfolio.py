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
        page.screenshot(path="verification/initial_load.png")

        # 1. Verify Landing Section
        print("Verifying Landing Section...")
        if page.is_visible("text=System Status"):
            print("System Status found.")
        else:
            print("System Status NOT found.")

        if page.is_visible("text=CODING"):
            print("CODING status found.")
        else:
            print("CODING status NOT found.")

        # 2. Verify DevTools
        print("Verifying DevTools...")
        settings_btn = page.locator("button:has(svg.lucide-settings)")

        if settings_btn.is_visible():
             print("Settings button is visible.")
             settings_btn.click(timeout=5000)
        else:
             print("Settings button is NOT visible.")

        page.wait_for_timeout(500)

        print("Clicking GAMING...")
        page.get_by_role("button", name="GAMING").click()
        page.wait_for_timeout(1000)

        page.screenshot(path="verification/gaming_status.png")

        # 3. Verify Scroll Snapping to Game Section
        print("Verifying Game Section...")
        # Scroll down the main container
        page.locator("main").evaluate("el => el.scrollTo({top: window.innerHeight, behavior: 'smooth'})")
        page.wait_for_timeout(1000)

        page.screenshot(path="verification/game_section.png")
        if page.is_visible("text=Game Module"):
            print("Game Module found.")
        else:
            print("Game Module NOT found.")

        # 4. Verify Scroll Snapping to Info Section
        print("Verifying Info Section...")
        # Scroll down again
        page.locator("main").evaluate("el => el.scrollTo({top: window.innerHeight * 2, behavior: 'smooth'})")
        page.wait_for_timeout(1000)

        page.screenshot(path="verification/info_section.png")
        if page.is_visible("text=Info Module"):
            print("Info Module found.")
        else:
            print("Info Module NOT found.")

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
