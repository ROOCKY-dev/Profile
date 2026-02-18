from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:3000...")
            page.goto("http://localhost:3000")

            # Wait for content to load
            page.wait_for_selector("text=ROOCKY dev")
            print("Page loaded.")

            # Scroll to Technical Toolkit
            print("Scrolling to Technical Toolkit...")
            # We look for the h2 with "Technical Toolkit"
            tech_section = page.get_by_text("< Technical Toolkit />")
            tech_section.scroll_into_view_if_needed()
            time.sleep(2) # Wait for animation/scroll

            # Take a screenshot of the tech stack
            page.screenshot(path="verification/tech_stack.png", full_page=False)
            print("Screenshot tech_stack.png saved.")

            # Scroll to Execution Trace (Timeline)
            print("Scrolling to Execution Trace...")
            timeline_section = page.get_by_text("< Execution Trace />")
            timeline_section.scroll_into_view_if_needed()
            time.sleep(2)

            page.screenshot(path="verification/timeline.png", full_page=False)
            print("Screenshot timeline.png saved.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
